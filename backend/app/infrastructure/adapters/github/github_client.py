"""
httpx-based adapter for the GitHub REST API.
Implements GitHubClientPort.
"""

import base64
import logging

import httpx

from app.application.ports.interfaces import GitHubClientPort
from app.core.config import get_settings

logger = logging.getLogger(__name__)
settings = get_settings()


class GitHubHttpxClient(GitHubClientPort):
    def __init__(self) -> None:
        headers = {
            "Accept": "application/vnd.github+json",
            "X-GitHub-Api-Version": "2022-11-28",
        }
        if settings.github_token:
            headers["Authorization"] = f"Bearer {settings.github_token}"

        self._client = httpx.AsyncClient(
            base_url=settings.github_api_base,
            headers=headers,
            timeout=30.0,
        )
        self._username = settings.github_username

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
        await self._client.aclose()
