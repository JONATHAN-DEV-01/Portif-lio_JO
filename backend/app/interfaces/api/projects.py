"""FastAPI router for projects endpoints."""

from fastapi import APIRouter, Depends, HTTPException, Query, Response
from sqlalchemy.ext.asyncio import AsyncSession

from app.application.use_cases.get_project_detail import GetProjectDetailUseCase
from app.application.use_cases.list_projects import ListProjectsUseCase
from app.core.cache import PUBLIC_CACHE_CONTROL, projects_cache
from app.infrastructure.adapters.db.project_repository import SQLAlchemyProjectRepository
from app.infrastructure.adapters.github.github_client import GitHubHttpxClient
from app.infrastructure.db.session import AsyncSessionLocal, get_db
from app.schemas import ProjectListResponse, ProjectResponse

router = APIRouter(prefix="/api/projects", tags=["projects"])


def get_repo(session: AsyncSession = Depends(get_db)) -> SQLAlchemyProjectRepository:
    return SQLAlchemyProjectRepository(session)


async def load_all_projects() -> ProjectListResponse:
    """Builds the unfiltered list. Opens its own session because it also runs in the background."""
    async with AsyncSessionLocal() as session:
        projects = await ListProjectsUseCase(
            project_repo=SQLAlchemyProjectRepository(session)
        ).execute()
    return _to_list_response(projects)


@router.get("", response_model=ProjectListResponse)
async def list_projects(
    language: str | None = Query(None, description="Filter by programming language"),
    status: str | None = Query(None, description="Filter by status: deployed | not_deployed"),
    search: str | None = Query(None, description="Search by name or description"),
    sort_by: str = Query("updated", description="Sort by: updated | stars | name"),
    response: Response = None,
):
    # Allow browser/CDN to reuse the response
    if response is not None:
        response.headers["Cache-Control"] = PUBLIC_CACHE_CONTROL

    is_default_list = not language and not status and not search and sort_by == "updated"
    if is_default_list:
        return await projects_cache.get(load_all_projects)

    async with AsyncSessionLocal() as session:
        projects = await ListProjectsUseCase(
            project_repo=SQLAlchemyProjectRepository(session)
        ).execute(language=language, status=status, search=search, sort_by=sort_by)
    return _to_list_response(projects)


@router.get("/{repo_name}", response_model=ProjectResponse)
async def get_project(
    repo_name: str,
    repo: SQLAlchemyProjectRepository = Depends(get_repo),
    response: Response = None,
):
    github_client = GitHubHttpxClient()
    use_case = GetProjectDetailUseCase(project_repo=repo, github_client=github_client)
    project = await use_case.execute(repo_name)

    if not project:
        raise HTTPException(status_code=404, detail="Projeto não encontrado.")

    if response is not None:
        response.headers["Cache-Control"] = PUBLIC_CACHE_CONTROL

    return _to_response(project)


def _to_list_response(projects: list) -> ProjectListResponse:
    return ProjectListResponse(
        projects=[_to_response(p) for p in projects],
        total=len(projects),
        # Unique languages for the filter UI
        languages=sorted(set(p.language for p in projects if p.language)),
    )


def _to_response(project) -> ProjectResponse:
    return ProjectResponse(
        name=project.name,
        full_name=project.full_name,
        description=project.description,
        html_url=project.html_url,
        homepage=project.homepage,
        language=project.language,
        languages=project.languages,
        topics=project.topics,
        stargazers_count=project.stargazers_count,
        forks_count=project.forks_count,
        fork=project.fork,
        archived=project.archived,
        pushed_at=project.pushed_at,
        created_at=project.created_at,
        is_deployed=project.is_deployed,
        deploy_url=project.effective_deploy_url,
        deploy_status=project.deploy_status,
        featured=project.featured,
        display_order=project.display_order,
        readme_content=project.readme_content,
    )
