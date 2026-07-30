"""Basic tests for the portfolio backend API."""

import pytest
from httpx import AsyncClient, ASGITransport


@pytest.fixture
async def client():
    """Async test client that bypasses database (uses in-memory SQLite fallback for tests)."""
    import os
    os.environ["DATABASE_URL"] = "postgresql+asyncpg://portfolio:portfolio@localhost:5432/portfolio_db"
    os.environ["GITHUB_TOKEN"] = ""
    
    from app.main import app
    async with AsyncClient(transport=ASGITransport(app=app), base_url="http://test") as ac:
        yield ac


@pytest.mark.asyncio
async def test_health(client: AsyncClient):
    response = await client.get("/health")
    assert response.status_code == 200
    data = response.json()
    assert data["status"] == "ok"


@pytest.mark.asyncio
async def test_profile_endpoint(client: AsyncClient):
    """Profile endpoint should always return data (falls back to static if GitHub is unavailable)."""
    response = await client.get("/api/profile")
    assert response.status_code == 200
    data = response.json()
    assert "login" in data
    assert "avatar_url" in data
    assert "followers" in data


@pytest.mark.asyncio
async def test_projects_endpoint(client: AsyncClient):
    """Projects endpoint should return a list (may be empty if DB not seeded)."""
    response = await client.get("/api/projects")
    assert response.status_code == 200
    data = response.json()
    assert "projects" in data
    assert "total" in data
    assert isinstance(data["projects"], list)


@pytest.mark.asyncio
async def test_admin_login_invalid(client: AsyncClient):
    response = await client.post(
        "/api/admin/login",
        json={"username": "wrong", "password": "wrong"},
    )
    assert response.status_code == 401


@pytest.mark.asyncio
async def test_sync_without_token(client: AsyncClient):
    """Sync endpoint requires admin token."""
    response = await client.post("/api/sync")
    assert response.status_code == 401


@pytest.mark.asyncio
async def test_contact_missing_fields(client: AsyncClient):
    """Contact endpoint validates required fields."""
    response = await client.post(
        "/api/contact",
        json={"name": "", "email": "invalid", "message": "hi"},
    )
    assert response.status_code == 422
