"""Pydantic v2 schemas (DTOs) for the API layer."""

from datetime import datetime
from typing import Optional

from pydantic import BaseModel, HttpUrl, field_validator


class LanguageBreakdown(BaseModel):
    name: str
    bytes: int
    percentage: float


class ProjectResponse(BaseModel):
    name: str
    full_name: str
    description: Optional[str] = None
    html_url: str
    homepage: Optional[str] = None
    language: Optional[str] = None
    languages: dict[str, int] = {}
    topics: list[str] = []
    stargazers_count: int = 0
    forks_count: int = 0
    fork: bool = False
    archived: bool = False
    pushed_at: Optional[datetime] = None
    created_at: Optional[datetime] = None
    is_deployed: bool = False
    deploy_url: Optional[str] = None
    deploy_status: str  # 'deployed' | 'not_deployed' | 'wip'
    featured: bool = False
    display_order: int = 0
    readme_content: Optional[str] = None

    model_config = {"from_attributes": True}


class ProjectListResponse(BaseModel):
    projects: list[ProjectResponse]
    total: int
    languages: list[str]  # unique languages for filter UI


class ProfileResponse(BaseModel):
    login: str
    name: Optional[str]
    bio: Optional[str]
    avatar_url: str
    html_url: str
    followers: int
    following: int
    public_repos: int
    location: Optional[str]
    blog: Optional[str]

    # Static enriched data
    headline: str = "IA 🤖 | Dev FullStack 👨‍💻 | Python 🐍 | React | WordPress | 💻 SQL | 📂 GIT & DevOps"
    email_contact: str = "jonathanads2006@gmail.com"
    linkedin_url: str = "https://linkedin.com/in/jonathan-nascimento-8bb679227"


class SyncResponse(BaseModel):
    synced: int
    errors: int
    message: str


class ContactRequest(BaseModel):
    name: str
    email: str
    message: str

    @field_validator("name")
    @classmethod
    def name_not_empty(cls, v: str) -> str:
        if not v.strip():
            raise ValueError("Nome não pode ser vazio.")
        return v.strip()

    @field_validator("email")
    @classmethod
    def email_valid(cls, v: str) -> str:
        if "@" not in v:
            raise ValueError("E-mail inválido.")
        return v.strip()

    @field_validator("message")
    @classmethod
    def message_not_too_short(cls, v: str) -> str:
        if len(v.strip()) < 10:
            raise ValueError("Mensagem muito curta (mínimo 10 caracteres).")
        return v.strip()


class ContactResponse(BaseModel):
    success: bool
    message: Optional[str] = None
    error: Optional[str] = None


class TokenResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"


class LoginRequest(BaseModel):
    username: str
    password: str


class ProjectOverrideRequest(BaseModel):
    custom_status: Optional[str] = None  # 'deployed' | 'not_deployed' | 'wip'
    custom_url: Optional[str] = None
    custom_description: Optional[str] = None
    featured: bool = False
    display_order: int = 0
    hidden: bool = False


class ProjectOverrideResponse(BaseModel):
    repo_name: str
    custom_status: Optional[str]
    custom_url: Optional[str]
    custom_description: Optional[str]
    featured: bool
    display_order: int
    hidden: bool

    model_config = {"from_attributes": True}
