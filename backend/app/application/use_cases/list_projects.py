"""Use case: List all projects with optional filtering and sorting."""

from app.application.ports.interfaces import ProjectRepositoryPort
from app.domain.entities import Project


class ListProjectsUseCase:
    def __init__(self, project_repo: ProjectRepositoryPort) -> None:
        self._repo = project_repo

    async def execute(
        self,
        language: str | None = None,
        status: str | None = None,
        search: str | None = None,
        sort_by: str = "updated",  # updated | stars | name
        featured_first: bool = True,
    ) -> list[Project]:
        projects = await self._repo.get_all(
            language=language,
            status=status,
            search=search,
            featured_first=featured_first,
        )

        # Sort
        if sort_by == "stars":
            projects.sort(key=lambda p: p.stargazers_count, reverse=True)
        elif sort_by == "name":
            projects.sort(key=lambda p: p.name.lower())
        else:  # updated
            projects.sort(
                key=lambda p: p.pushed_at or p.created_at or __import__("datetime").datetime.min,
                reverse=True,
            )

        # Featured always on top regardless of sort
        if featured_first:
            featured = [p for p in projects if p.featured]
            rest = [p for p in projects if not p.featured]
            projects = featured + rest

        return projects
