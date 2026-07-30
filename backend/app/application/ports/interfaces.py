"""
Ports (interfaces) — abstract definitions that the application layer depends on.
Adapters in the infrastructure layer implement these ports.
"""

from abc import ABC, abstractmethod

from app.domain.entities import GitHubProfile, Project, ProjectOverride


class ProjectRepositoryPort(ABC):
    """Port for persisting and retrieving projects."""

    @abstractmethod
    async def get_all(
        self,
        language: str | None = None,
        status: str | None = None,
        search: str | None = None,
        featured_first: bool = True,
    ) -> list[Project]:
        ...

    @abstractmethod
    async def get_by_name(self, name: str) -> Project | None:
        ...

    @abstractmethod
    async def upsert(self, project: Project) -> Project:
        ...

    @abstractmethod
    async def upsert_many(self, projects: list[Project]) -> None:
        ...

    @abstractmethod
    async def get_override(self, repo_name: str) -> ProjectOverride | None:
        ...

    @abstractmethod
    async def upsert_override(self, override: ProjectOverride) -> ProjectOverride:
        ...

    @abstractmethod
    async def delete_override(self, repo_name: str) -> bool:
        ...

    @abstractmethod
    async def list_overrides(self) -> list[ProjectOverride]:
        ...


class GitHubClientPort(ABC):
    """Port for fetching data from the GitHub API."""

    @abstractmethod
    async def get_repos(self) -> list[dict]:
        ...

    @abstractmethod
    async def get_repo(self, repo_name: str) -> dict | None:
        ...

    @abstractmethod
    async def get_languages(self, repo_name: str) -> dict[str, int]:
        ...

    @abstractmethod
    async def get_readme(self, repo_name: str) -> str | None:
        ...

    @abstractmethod
    async def get_profile(self) -> dict | None:
        ...


class EmailSenderPort(ABC):
    """Port for sending contact form messages."""

    @abstractmethod
    async def send_contact_message(
        self,
        name: str,
        email: str,
        message: str,
    ) -> bool:
        ...
