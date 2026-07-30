"""FastAPI router for sync endpoint (admin only)."""

from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession

from app.application.use_cases.sync_github import SyncGitHubUseCase
from app.core.deps import require_admin
from app.infrastructure.adapters.db.project_repository import SQLAlchemyProjectRepository
from app.infrastructure.adapters.github.github_client import GitHubHttpxClient
from app.infrastructure.db.session import get_db
from app.schemas import SyncResponse

router = APIRouter(prefix="/api/sync", tags=["sync"])


@router.post("", response_model=SyncResponse)
async def sync_github(
    _: dict = Depends(require_admin),
    session: AsyncSession = Depends(get_db),
):
    """Force a full resync with the GitHub API. Requires admin token."""
    repo = SQLAlchemyProjectRepository(session)
    github = GitHubHttpxClient()

    use_case = SyncGitHubUseCase(project_repo=repo, github_client=github)
    result = await use_case.execute()

    return SyncResponse(
        synced=result["synced"],
        errors=result["errors"],
        message=f"Sincronização concluída: {result['synced']} projetos atualizados, {result['errors']} erros.",
    )
