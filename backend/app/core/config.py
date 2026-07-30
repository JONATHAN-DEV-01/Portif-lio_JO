from pydantic_settings import BaseSettings, SettingsConfigDict
from functools import lru_cache


class Settings(BaseSettings):
    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
        case_sensitive=False,
    )

    # GitHub
    github_token: str = ""
    github_username: str = "JONATHAN-DEV-01"
    github_api_base: str = "https://api.github.com"

    # Database
    database_url: str = "postgresql+asyncpg://portfolio:portfolio@localhost:5432/portfolio_db"

    # Security
    secret_key: str = "dev-secret-key-change-in-production-must-be-32-chars-long"
    algorithm: str = "HS256"
    access_token_expire_minutes: int = 60

    # Admin
    admin_username: str = "admin"
    admin_password: str = "admin123"

    # Email
    resend_api_key: str = ""
    from_email: str = "contato@jonathannascimento.dev"
    to_email: str = "jonathanads2006@gmail.com"

    # CORS
    cors_origins: str = "http://localhost:5173,http://localhost:3000"

    @property
    def cors_origins_list(self) -> list[str]:
        return [o.strip() for o in self.cors_origins.split(",")]

    # Sync
    sync_interval_hours: int = 6


@lru_cache
def get_settings() -> Settings:
    return Settings()
