"""
FastAPI application entrypoint.
Configures CORS, includes all routers, and sets up the APScheduler for GitHub sync.
"""

import asyncio
import logging
from contextlib import asynccontextmanager

from apscheduler.schedulers.asyncio import AsyncIOScheduler
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.core.cache import projects_cache
from app.core.config import get_settings
from app.infrastructure.adapters.github.github_client import close_shared_client
from app.infrastructure.db.session import init_db

logging.basicConfig(level=logging.INFO, format="%(levelname)s %(name)s: %(message)s")

settings = get_settings()
logger = logging.getLogger(__name__)

scheduler = AsyncIOScheduler()


async def _run_scheduled_sync():
    """Background task: sync with GitHub on a schedule."""
    from app.application.use_cases.sync_github import SyncGitHubUseCase
    from app.infrastructure.adapters.db.project_repository import SQLAlchemyProjectRepository
    from app.infrastructure.adapters.github.github_client import GitHubHttpxClient
    from app.infrastructure.db.session import AsyncSessionLocal

    logger.info("Scheduled GitHub sync starting...")
    async with AsyncSessionLocal() as session:
        repo = SQLAlchemyProjectRepository(session)
        github = GitHubHttpxClient()
        use_case = SyncGitHubUseCase(project_repo=repo, github_client=github)
        result = await use_case.execute()
        logger.info(f"Scheduled sync result: {result}")
    projects_cache.invalidate()


async def _startup_tasks():
    """
    Prepares the app without holding up the port: Render only routes traffic after uvicorn
    finishes its startup, so waiting here would make every cold start even longer.
    """
    from app.interfaces.api.profile import warm_profile_cache
    from app.interfaces.api.projects import load_all_projects

    try:
        await init_db()
    except Exception as e:
        logger.error(f"Database initialisation failed: {e}")
        return

    results = await asyncio.gather(
        projects_cache.refresh(load_all_projects),
        warm_profile_cache(),
        return_exceptions=True,
    )
    for result in results:
        if isinstance(result, Exception):
            logger.warning(f"Could not warm cache on startup: {result}")

    try:
        await _run_scheduled_sync()
        await projects_cache.refresh(load_all_projects)
    except Exception as e:
        logger.warning(f"Initial sync failed (this is OK on first run): {e}")


@asynccontextmanager
async def lifespan(app: FastAPI):
    # Startup
    logger.info("Starting portfolio backend...")

    # Create tables, warm caches and sync in the background
    startup_task = asyncio.create_task(_startup_tasks())

    # Schedule recurring sync
    if settings.sync_interval_hours > 0:
        scheduler.add_job(
            _run_scheduled_sync,
            "interval",
            hours=settings.sync_interval_hours,
            id="github_sync",
        )
        scheduler.start()
        logger.info(f"GitHub sync scheduled every {settings.sync_interval_hours}h")

    yield

    # Shutdown
    startup_task.cancel()
    if scheduler.running:
        scheduler.shutdown()
    await close_shared_client()
    logger.info("Portfolio backend stopped.")


app = FastAPI(
    title="Portfolio API — Jonathan Nascimento",
    description="API do portfólio pessoal de Jonathan Nascimento, desenvolvedor fullstack.",
    version="1.0.0",
    lifespan=lifespan,
)

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_origins_list,
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allow_headers=["*"],
)

# Routers
from app.interfaces.api import admin, contact, profile, projects, sync

app.include_router(projects.router)
app.include_router(profile.router)
app.include_router(sync.router)
app.include_router(contact.router)
app.include_router(admin.router)


@app.get("/health")
async def health():
    return {"status": "ok", "service": "portfolio-backend"}
