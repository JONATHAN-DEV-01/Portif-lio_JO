"""Tests for the caching and sync paths, using fakes so they need no database or network."""

import asyncio

from app.application.use_cases.sync_github import SyncGitHubUseCase
from app.core.cache import StaleWhileRevalidateCache


async def test_cache_loads_once_for_concurrent_first_reads():
    calls = 0

    async def loader():
        nonlocal calls
        calls += 1
        await asyncio.sleep(0.01)
        return "value"

    cache = StaleWhileRevalidateCache(ttl_seconds=60)
    results = await asyncio.gather(*(cache.get(loader) for _ in range(5)))

    assert results == ["value"] * 5
    assert calls == 1


async def test_expired_value_is_returned_at_once_and_refreshed_in_background():
    release = asyncio.Event()

    async def slow_loader():
        await release.wait()
        return "new"

    async def first_loader():
        return "old"

    cache = StaleWhileRevalidateCache(ttl_seconds=60)
    await cache.get(first_loader)
    cache.invalidate()

    assert await asyncio.wait_for(cache.get(slow_loader), timeout=0.5) == "old"

    release.set()
    await cache._refresh_task
    assert await cache.get(first_loader) == "new"


async def test_failed_refresh_keeps_serving_the_stale_value():
    async def first_loader():
        return "old"

    async def broken_loader():
        raise RuntimeError("database is down")

    cache = StaleWhileRevalidateCache(ttl_seconds=60)
    await cache.get(first_loader)
    cache.invalidate()

    assert await cache.get(broken_loader) == "old"
    await cache._refresh_task
    assert await cache.get(broken_loader) == "old"


async def test_invalidation_during_a_load_forces_another_refresh():
    started, release = asyncio.Event(), asyncio.Event()

    async def slow_loader():
        started.set()
        await release.wait()
        return "before-invalidate"

    cache = StaleWhileRevalidateCache(ttl_seconds=60)
    load = asyncio.create_task(cache.get(slow_loader))
    await started.wait()
    cache.invalidate()
    release.set()
    await load

    async def next_loader():
        return "after-invalidate"

    assert await cache.get(next_loader) == "before-invalidate"
    await cache._refresh_task
    assert cache.value == "after-invalidate"


class FakeGitHub:
    def __init__(self):
        self.running = 0
        self.max_running = 0

    async def get_repos(self):
        return [{"name": f"repo-{i}", "homepage": ""} for i in range(20)]

    async def get_languages(self, name):
        self.running += 1
        self.max_running = max(self.max_running, self.running)
        await asyncio.sleep(0.01)
        self.running -= 1
        if name == "repo-3":
            raise RuntimeError("rate limited")
        return {"Python": 100}


class FakeRepo:
    def __init__(self):
        self.upsert_many_calls = []

    async def upsert_many(self, projects):
        self.upsert_many_calls.append(projects)


async def test_sync_fetches_languages_concurrently_and_saves_in_one_batch():
    github, repo = FakeGitHub(), FakeRepo()

    result = await SyncGitHubUseCase(project_repo=repo, github_client=github).execute()

    assert result == {"synced": 20, "errors": 0}
    assert 1 < github.max_running <= 5
    assert len(repo.upsert_many_calls) == 1
    saved = {p.name: p for p in repo.upsert_many_calls[0]}
    assert saved["repo-3"].languages == {}
    assert saved["repo-4"].languages == {"Python": 100}
