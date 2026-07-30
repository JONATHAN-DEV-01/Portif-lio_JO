"""Use case: Get detailed information about a single project including README and languages."""

from app.application.ports.interfaces import GitHubClientPort, ProjectRepositoryPort
from app.domain.entities import Project


class GetProjectDetailUseCase:
    def __init__(
        self,
        project_repo: ProjectRepositoryPort,
        github_client: GitHubClientPort,
    ) -> None:
        self._repo = project_repo
        self._github = github_client

    async def execute(self, repo_name: str) -> Project | None:
        project = await self._repo.get_by_name(repo_name)
        if not project:
            return None

        # Fetch README if not cached
        if not project.readme_content:
            readme = await self._github.get_readme(repo_name)
            if readme:
                project.readme_content = readme
                await self._repo.upsert(project)

        # Fetch languages if not cached
        if not project.languages:
            langs = await self._github.get_languages(repo_name)
            if langs:
                project.languages = langs
                await self._repo.upsert(project)

        return project
