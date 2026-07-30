"""
FastAPI application entrypoint.
Configures CORS, includes all routers, and sets up the APScheduler for GitHub sync.
"""

import logging
from contextlib import asynccontextmanager

from apscheduler.schedulers.asyncio import AsyncIOScheduler
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.core.config import get_settings
from app.infrastructure.db.session import init_db

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


@asynccontextmanager
async def lifespan(app: FastAPI):
    # Startup
    logger.info("Starting portfolio backend...")

    # Create tables (dev mode — use Alembic in production)
    await init_db()

    # Run initial sync
    try:
        await _run_scheduled_sync()
    except Exception as e:
        logger.warning(f"Initial sync failed (this is OK on first run): {e}")

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
    if scheduler.running:
        scheduler.shutdown()
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
