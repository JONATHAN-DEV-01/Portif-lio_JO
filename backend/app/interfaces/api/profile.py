"""FastAPI router for GitHub profile endpoint."""

import asyncio
import time
import logging

from fastapi import APIRouter
from fastapi.responses import JSONResponse

from app.infrastructure.adapters.github.github_client import GitHubHttpxClient
from app.schemas import ProfileResponse

logger = logging.getLogger(__name__)

router = APIRouter(prefix="/api/profile", tags=["profile"])

# ---------------------------------------------------------------------------
# In-memory cache — avoids a GitHub API round-trip on every page load.
# TTL is 10 minutes; a lock ensures only one concurrent fetch at a time.
# ---------------------------------------------------------------------------
_PROFILE_TTL = 600  # seconds

_cache_lock = asyncio.Lock()
_cached_profile: ProfileResponse | None = None
_cache_expires_at: float = 0.0


def _static_fallback() -> ProfileResponse:
    return ProfileResponse(
        login="JONATHAN-DEV-01",
        name="Jonathan Nascimento",
        bio="IA 🤖 | Dev FullStack 👨‍💻 | Python 🐍 | React | WordPress | 💻 SQL | 📂 Conhecimento em GIT e DevOps",
        avatar_url="https://avatars.githubusercontent.com/u/122258015",
        html_url="https://github.com/JONATHAN-DEV-01",
        followers=4,
        following=11,
        public_repos=22,
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


@router.get("", response_model=ProfileResponse)
async def get_profile():
    global _cached_profile, _cache_expires_at

    now = time.monotonic()

    # Fast path — cache is still valid
    if _cached_profile is not None and now < _cache_expires_at:
        return JSONResponse(
            content=_cached_profile.model_dump(),
            headers={"Cache-Control": f"public, max-age={_PROFILE_TTL}"},
        )

    # Slow path — fetch from GitHub, serialised by lock to avoid thundering herd
    async with _cache_lock:
        # Re-check inside the lock (another coroutine may have just refreshed)
        now = time.monotonic()
        if _cached_profile is not None and now < _cache_expires_at:
            return JSONResponse(
                content=_cached_profile.model_dump(),
                headers={"Cache-Control": f"public, max-age={_PROFILE_TTL}"},
            )

        try:
            client = GitHubHttpxClient()
            data = await client.get_profile()
            profile = _profile_from_dict(data) if data else _static_fallback()
        except Exception as exc:
            logger.warning(f"GitHub profile fetch failed, using cache/fallback: {exc}")
            profile = _cached_profile or _static_fallback()

        _cached_profile = profile
        _cache_expires_at = time.monotonic() + _PROFILE_TTL

    return JSONResponse(
        content=_cached_profile.model_dump(),
        headers={"Cache-Control": f"public, max-age={_PROFILE_TTL}"},
    )
