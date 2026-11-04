"""FastAPI router for GitHub profile endpoint."""

import logging

from fastapi import APIRouter
from fastapi.responses import JSONResponse

from app.core.cache import PUBLIC_CACHE_CONTROL, StaleWhileRevalidateCache
from app.infrastructure.adapters.github.github_client import GitHubHttpxClient
from app.schemas import ProfileResponse

logger = logging.getLogger(__name__)

router = APIRouter(prefix="/api/profile", tags=["profile"])

_profile_cache: StaleWhileRevalidateCache[ProfileResponse] = StaleWhileRevalidateCache(
    ttl_seconds=600
)


def _static_fallback() -> ProfileResponse:
    return ProfileResponse(
        login="JONATHAN-DEV-01",
        name="Jonathan Nascimento",
        bio="IA 🤖 | Dev FullStack 👨‍💻 | Python 🐍 | React | WordPress | 💻 SQL | 📂 Conhecimento em GIT e DevOps",
        avatar_url="https://avatars.githubusercontent.com/u/180793383?v=4",
        html_url="https://github.com/JONATHAN-DEV-01",
        followers=5,
        following=12,
        public_repos=23,
        location="São Paulo, Brasil",
        blog=None,
    )


def _profile_from_dict(data: dict) -> ProfileResponse:
    return ProfileResponse(
        login=data.get("login", "JONATHAN-DEV-01"),
        name=data.get("name") or "Jonathan Nascimento",
        bio=data.get("bio"),
        avatar_url=data.get("avatar_url", ""),
        html_url=data.get("html_url", "https://github.com/JONATHAN-DEV-01"),
        followers=data.get("followers", 0),
        following=data.get("following", 0),
        public_repos=data.get("public_repos", 0),
        location=data.get("location"),
        blog=data.get("blog"),
    )


async def _load_profile() -> ProfileResponse:
    data = await GitHubHttpxClient().get_profile()
    if data:
        return _profile_from_dict(data)
    logger.warning("GitHub profile unavailable, using last known profile or the static fallback.")
    return _profile_cache.value or _static_fallback()


async def warm_profile_cache() -> None:
    await _profile_cache.refresh(_load_profile)


@router.get("", response_model=ProfileResponse)
async def get_profile():
    profile = await _profile_cache.get(_load_profile)
    return JSONResponse(
        content=profile.model_dump(),
        headers={"Cache-Control": PUBLIC_CACHE_CONTROL},
    )
