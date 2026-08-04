"""
httpx-based adapter for the GitHub REST API.
Implements GitHubClientPort.

The underlying httpx.AsyncClient is a module-level singleton so that TCP/TLS
connections are pooled and reused across requests instead of being created
and torn down on every call.
"""

import base64
import logging

import httpx

from app.application.ports.interfaces import GitHubClientPort
from app.core.config import get_settings

logger = logging.getLogger(__name__)
settings = get_settings()

# ---------------------------------------------------------------------------
# Module-level singleton — initialised once in startup, closed in shutdown.
# ---------------------------------------------------------------------------
_shared_client: httpx.AsyncClient | None = None


def _build_headers() -> dict:
    headers = {
        "Accept": "application/vnd.github+json",
        "X-GitHub-Api-Version": "2022-11-28",
    }
    if settings.github_token:
        headers["Authorization"] = f"Bearer {settings.github_token}"
    return headers


def get_shared_client() -> httpx.AsyncClient:
    """Return the shared AsyncClient, creating it lazily if needed."""
    global _shared_client
    if _shared_client is None or _shared_client.is_closed:
        _shared_client = httpx.AsyncClient(
            base_url=settings.github_api_base,
            headers=_build_headers(),
            timeout=30.0,
            # Keep connections alive between requests
            limits=httpx.Limits(
                max_connections=10,
                max_keepalive_connections=5,
                keepalive_expiry=30,
            ),
        )
    return _shared_client


async def close_shared_client() -> None:
    """Close the shared client gracefully (call from app shutdown)."""
    global _shared_client
    if _shared_client and not _shared_client.is_closed:
        await _shared_client.aclose()
        _shared_client = None


class GitHubHttpxClient(GitHubClientPort):
    """Thin wrapper that delegates to the shared httpx.AsyncClient."""

    def __init__(self) -> None:
        self._username = settings.github_username

    @property
    def _client(self) -> httpx.AsyncClient:
        return get_shared_client()

    async def get_repos(self) -> list[dict]:
        all_repos = []
        page = 1
        while True:
            resp = await self._client.get(
                f"/users/{self._username}/repos",
                params={"per_page": 100, "sort": "updated", "page": page},
            )
            resp.raise_for_status()
            data = resp.json()
            if not data:
                break
            all_repos.extend(data)
            if len(data) < 100:
                break
            page += 1
        return all_repos

    async def get_repo(self, repo_name: str) -> dict | None:
        try:
            resp = await self._client.get(f"/repos/{self._username}/{repo_name}")
            if resp.status_code == 404:
                return None
            resp.raise_for_status()
            return resp.json()
        except httpx.HTTPStatusError as e:
            logger.error(f"GitHub API error for repo {repo_name}: {e}")
            return None

    async def get_languages(self, repo_name: str) -> dict[str, int]:
        try:
            resp = await self._client.get(f"/repos/{self._username}/{repo_name}/languages")
            if resp.status_code == 404:
                return {}
            resp.raise_for_status()
            return resp.json()
        except Exception as e:
            logger.warning(f"Could not fetch languages for {repo_name}: {e}")
            return {}

    async def get_readme(self, repo_name: str) -> str | None:
        try:
            resp = await self._client.get(f"/repos/{self._username}/{repo_name}/readme")
            if resp.status_code == 404:
                return None
            resp.raise_for_status()
            data = resp.json()
            content = data.get("content", "")
            if content:
                return base64.b64decode(content).decode("utf-8", errors="replace")
            return None
        except Exception as e:
            logger.warning(f"Could not fetch README for {repo_name}: {e}")
            return None

    async def get_profile(self) -> dict | None:
        try:
            resp = await self._client.get(f"/users/{self._username}")
            resp.raise_for_status()
            return resp.json()
        except Exception as e:
            logger.error(f"Could not fetch GitHub profile: {e}")
            return None

    async def __aenter__(self):
        return self

    async def __aexit__(self, *args):
        # The shared client is closed at application shutdown — not here.
        pass
