"""FastAPI router for admin endpoints (auth + project overrides management)."""

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.deps import require_admin
from app.core.security import create_access_token, verify_admin_credentials
from app.domain.entities import ProjectOverride
from app.infrastructure.adapters.db.project_repository import SQLAlchemyProjectRepository
from app.infrastructure.db.session import get_db
from app.schemas import (
    LoginRequest,
    ProjectOverrideRequest,
    ProjectOverrideResponse,
    TokenResponse,
)

router = APIRouter(prefix="/api/admin", tags=["admin"])


@router.post("/login", response_model=TokenResponse)
async def admin_login(body: LoginRequest):
    """Get a JWT token for admin access."""
    if not verify_admin_credentials(body.username, body.password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Credenciais inválidas.",
        )
    token = create_access_token({"sub": body.username, "role": "admin"})
    return TokenResponse(access_token=token)


@router.get("/overrides", response_model=list[ProjectOverrideResponse])
async def list_overrides(
    _: dict = Depends(require_admin),
    session: AsyncSession = Depends(get_db),
):
    repo = SQLAlchemyProjectRepository(session)
    overrides = await repo.list_overrides()
    return [
        ProjectOverrideResponse(
            repo_name=o.repo_name,
            custom_status=o.custom_status,
            custom_url=o.custom_url,
            custom_description=o.custom_description,
            featured=o.featured,
            display_order=o.display_order,
            hidden=o.hidden,
        )
        for o in overrides
    ]


@router.put("/overrides/{repo_name}", response_model=ProjectOverrideResponse)
async def upsert_override(
    repo_name: str,
    body: ProjectOverrideRequest,
    _: dict = Depends(require_admin),
    session: AsyncSession = Depends(get_db),
):
    repo = SQLAlchemyProjectRepository(session)
    override = ProjectOverride(
        repo_name=repo_name,
        custom_status=body.custom_status,
        custom_url=body.custom_url,
        custom_description=body.custom_description,
        featured=body.featured,
        display_order=body.display_order,
        hidden=body.hidden,
    )
    saved = await repo.upsert_override(override)
    return ProjectOverrideResponse(
        repo_name=saved.repo_name,
        custom_status=saved.custom_status,
        custom_url=saved.custom_url,
        custom_description=saved.custom_description,
        featured=saved.featured,
        display_order=saved.display_order,
        hidden=saved.hidden,
    )


@router.delete("/overrides/{repo_name}")
async def delete_override(
    repo_name: str,
    _: dict = Depends(require_admin),
    session: AsyncSession = Depends(get_db),
):
    repo = SQLAlchemyProjectRepository(session)
    deleted = await repo.delete_override(repo_name)
    if not deleted:
        raise HTTPException(status_code=404, detail="Override não encontrado.")
    return {"message": f"Override para '{repo_name}' removido com sucesso."}
