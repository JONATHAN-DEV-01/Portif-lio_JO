"""FastAPI router for GitHub profile endpoint."""

from fastapi import APIRouter

from app.infrastructure.adapters.github.github_client import GitHubHttpxClient
from app.schemas import ProfileResponse

router = APIRouter(prefix="/api/profile", tags=["profile"])


@router.get("", response_model=ProfileResponse)
async def get_profile():
    client = GitHubHttpxClient()
    data = await client.get_profile()

    if not data:
        # Return static fallback if GitHub API is unavailable
        return ProfileResponse(
            login="JONATHAN-DEV-01",
            name="Jonathan Nascimento",
            bio="IA 🤖 | Dev FullStack 👨‍💻 | Python 🐍 | React | WordPress | 💻 SQL | 📂 Conhecimento em GIT e DevOps",
            avatar_url="https://avatars.githubusercontent.com/u/JONATHAN-DEV-01",
            html_url="https://github.com/JONATHAN-DEV-01",
            followers=4,
            following=11,
            public_repos=22,
            location="São Paulo, Brasil",
            blog=None,
        )

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
