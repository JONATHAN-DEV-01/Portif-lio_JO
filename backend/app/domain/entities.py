"""
Domain entities — pure Python dataclasses, no framework dependencies.
These are the core business objects of the portfolio application.
"""

from dataclasses import dataclass, field
from datetime import datetime


@dataclass
class Project:
    """Represents a GitHub repository as a portfolio project."""

    id: int | None = None
    name: str = ""
    full_name: str = ""
    description: str | None = None
    html_url: str = ""
    homepage: str | None = None
    language: str | None = None
    languages: dict[str, int] = field(default_factory=dict)
    topics: list[str] = field(default_factory=list)
    stargazers_count: int = 0
    forks_count: int = 0
    fork: bool = False
    archived: bool = False
    pushed_at: datetime | None = None
    created_at: datetime | None = None
    readme_content: str | None = None

    # Computed from homepage presence or project_overrides
    is_deployed: bool = False
    deploy_url: str | None = None

    # From project_overrides table
    featured: bool = False
    display_order: int = 0
    hidden: bool = False
    custom_status: str | None = None
    custom_description: str | None = None

    @property
    def deploy_status(self) -> str:
        if self.custom_status:
            return self.custom_status
        return "deployed" if self.is_deployed else "not_deployed"

    @property
    def effective_deploy_url(self) -> str | None:
        return self.deploy_url or self.homepage


@dataclass
class GitHubProfile:
    """Represents the GitHub user profile."""

    login: str = ""
    name: str | None = None
    bio: str | None = None
    avatar_url: str = ""
    html_url: str = ""
    followers: int = 0
    following: int = 0
    public_repos: int = 0
    location: str | None = None
    blog: str | None = None
    company: str | None = None
    email: str | None = None
    twitter_username: str | None = None


@dataclass
class ProjectOverride:
    """Manual override for a project's metadata."""

    id: int | None = None
    repo_name: str = ""
    custom_status: str | None = None  # 'deployed' | 'not_deployed' | 'wip'
    custom_url: str | None = None
    custom_description: str | None = None
    featured: bool = False
    display_order: int = 0
    hidden: bool = False


@dataclass
class ContactMessage:
    """A message from the contact form."""

    name: str
    email: str
    message: str
    created_at: datetime = field(default_factory=datetime.utcnow)
