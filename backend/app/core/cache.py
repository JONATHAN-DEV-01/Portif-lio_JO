"""In-memory stale-while-revalidate cache for expensive, rarely changing reads."""

import asyncio
import logging
import time
from collections.abc import Awaitable, Callable
from typing import Generic, TypeVar

logger = logging.getLogger(__name__)

T = TypeVar("T")

# Browsers may reuse a response for 5 min and serve it stale for a day while revalidating.
PUBLIC_CACHE_CONTROL = "public, max-age=300, stale-while-revalidate=86400"


class StaleWhileRevalidateCache(Generic[T]):
    """
    Keeps one value in memory.

    Fresh values are returned directly. Expired values are also returned directly while a
    single background task refreshes them, so only the very first read waits for the loader.
    """

    def __init__(self, ttl_seconds: float) -> None:
        self._ttl = ttl_seconds
        self._value: T | None = None
        self._expires_at = 0.0
        self._generation = 0
        self._lock = asyncio.Lock()
        self._refresh_task: asyncio.Task | None = None

    @property
    def value(self) -> T | None:
        return self._value

    async def get(self, loader: Callable[[], Awaitable[T]]) -> T:
        if self._value is not None:
            if time.monotonic() >= self._expires_at:
                self._schedule_refresh(loader)
            return self._value

        async with self._lock:
            if self._value is None:
                await self._load(loader)
            return self._value  # type: ignore[return-value]

    async def refresh(self, loader: Callable[[], Awaitable[T]]) -> None:
        """Replace the value now. On failure the current value is kept and the error raised."""
        async with self._lock:
            await self._load(loader)

    def invalidate(self) -> None:
        """Make the next read refresh the value. The old value is served until that finishes."""
        self._generation += 1
        self._expires_at = 0.0

    async def _load(self, loader: Callable[[], Awaitable[T]]) -> None:
        generation = self._generation
        value = await loader()
        self._value = value
        # An invalidation during the load means this value may already be outdated.
        self._expires_at = (
            time.monotonic() + self._ttl if generation == self._generation else 0.0
        )

    def _schedule_refresh(self, loader: Callable[[], Awaitable[T]]) -> None:
        if self._refresh_task is not None and not self._refresh_task.done():
            return

        async def run() -> None:
            try:
                await self.refresh(loader)
            except Exception as exc:
                logger.warning(f"Background cache refresh failed, keeping stale value: {exc}")
                # Wait a little before trying again instead of retrying on every request.
                self._expires_at = time.monotonic() + min(self._ttl, 60)

        self._refresh_task = asyncio.create_task(run())


# The unfiltered project list, which is the only list the frontend requests.
projects_cache: StaleWhileRevalidateCache = StaleWhileRevalidateCache(ttl_seconds=300)
