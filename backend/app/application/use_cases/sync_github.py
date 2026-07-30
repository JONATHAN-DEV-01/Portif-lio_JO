"""
Use case: Sync projects from GitHub API into the local database.
This is called by the scheduler or the /api/sync admin endpoint.
"""

import logging
from datetime import datetime

from app.application.ports.interfaces import GitHubClientPort, ProjectRepositoryPort
from app.domain.entities import GitHubProfile, Project

logger = logging.getLogger(__name__)


class SyncGitHubUseCase:
    def __init__(
        self,
        project_repo: ProjectRepositoryPort,
        github_client: GitHubClientPort,
    ) -> None:
        self._repo = project_repo
        self._github = github_client

    async def execute(self) -> dict:
        """
        Performs a full sync of repositories from GitHub.
        Returns a summary dict with counts.
        """
        logger.info("Starting GitHub sync for JONATHAN-DEV-01...")
        synced = 0
        errors = 0

        try:
            raw_repos = await self._github.get_repos()
        except Exception as e:
            logger.error(f"Failed to fetch repos from GitHub: {e}")
            return {"synced": 0, "errors": 1, "error": str(e)}

        projects: list[Project] = []
        for raw in raw_repos:
            try:
                project = self._map_raw_to_project(raw)

                # Fetch languages for each repo (with error tolerance)
                try:
                    langs = await self._github.get_languages(raw["name"])
                    project.languages = langs
                except Exception as e:
                    logger.warning(f"Could not fetch languages for {raw['name']}: {e}")

                projects.append(project)
                synced += 1
            except Exception as e:
                logger.error(f"Error processing repo {raw.get('name', '?')}: {e}")
                errors += 1

        await self._repo.upsert_many(projects)
        logger.info(f"GitHub sync complete. synced={synced}, errors={errors}")
        return {"synced": synced, "errors": errors}

    def _map_raw_to_project(self, raw: dict) -> Project:
        homepage = raw.get("homepage") or None
        # Validate homepage is a real URL
        if homepage and not homepage.startswith("http"):
            homepage = None

        pushed_at = None
        if raw.get("pushed_at"):
            try:
                pushed_at = datetime.fromisoformat(raw["pushed_at"].replace("Z", "+00:00"))
            except ValueError:
                pass

        created_at = None
        if raw.get("created_at"):
            try:
                created_at = datetime.fromisoformat(raw["created_at"].replace("Z", "+00:00"))
            except ValueError:
                pass

        return Project(
            name=raw["name"],
            full_name=raw.get("full_name", ""),
            description=raw.get("description"),
            html_url=raw.get("html_url", ""),
            homepage=homepage,
            language=raw.get("language"),
            topics=raw.get("topics", []),
            stargazers_count=raw.get("stargazers_count", 0),
            forks_count=raw.get("forks_count", 0),
            fork=raw.get("fork", False),
            archived=raw.get("archived", False),
            pushed_at=pushed_at,
            created_at=created_at,
            is_deployed=bool(homepage),
            deploy_url=homepage,
        )
