"""
SQLAlchemy implementation of ProjectRepositoryPort.
This adapter translates between ORM models and domain entities.
"""

import json

from sqlalchemy import select, update, delete
from sqlalchemy.ext.asyncio import AsyncSession

from app.application.ports.interfaces import ProjectRepositoryPort
from app.domain.entities import Project, ProjectOverride
from app.infrastructure.db.models import ProjectModel, ProjectOverrideModel


class SQLAlchemyProjectRepository(ProjectRepositoryPort):
    def __init__(self, session: AsyncSession) -> None:
        self._session = session

    async def get_all(
        self,
        language: str | None = None,
        status: str | None = None,
        search: str | None = None,
        featured_first: bool = True,
    ) -> list[Project]:
        stmt = select(ProjectModel, ProjectOverrideModel).outerjoin(
            ProjectOverrideModel,
            ProjectModel.name == ProjectOverrideModel.repo_name,
        )

        result = await self._session.execute(stmt)
        rows = result.all()

        projects = []
        for proj_model, override_model in rows:
            project = self._to_entity(proj_model, override_model)

            # Apply override-based hidden filter
            if project.hidden:
                continue

            # Filter by language
            if language and project.language and project.language.lower() != language.lower():
                continue

            # Filter by status
            if status:
                if status == "deployed" and not project.is_deployed:
                    continue
                if status == "not_deployed" and project.is_deployed:
                    continue

            # Search filter
            if search:
                search_lower = search.lower()
                name_match = search_lower in project.name.lower()
                desc_match = project.description and search_lower in project.description.lower()
                if not name_match and not desc_match:
                    continue

            projects.append(project)

        return projects

    async def get_by_name(self, name: str) -> Project | None:
        stmt = (
            select(ProjectModel, ProjectOverrideModel)
            .outerjoin(
                ProjectOverrideModel,
                ProjectModel.name == ProjectOverrideModel.repo_name,
            )
            .where(ProjectModel.name == name)
        )
        result = await self._session.execute(stmt)
        row = result.first()
        if not row:
            return None
        return self._to_entity(row[0], row[1])

    async def upsert(self, project: Project) -> Project:
        stmt = select(ProjectModel).where(ProjectModel.name == project.name)
        result = await self._session.execute(stmt)
        existing = result.scalar_one_or_none()

        if existing:
            self._update_model(existing, project)
        else:
            model = self._to_model(project)
            self._session.add(model)

        await self._session.commit()
        return project

    async def upsert_many(self, projects: list[Project]) -> None:
        for project in projects:
            await self.upsert(project)

    async def get_override(self, repo_name: str) -> ProjectOverride | None:
        stmt = select(ProjectOverrideModel).where(ProjectOverrideModel.repo_name == repo_name)
        result = await self._session.execute(stmt)
        model = result.scalar_one_or_none()
        if not model:
            return None
        return self._override_to_entity(model)

    async def upsert_override(self, override: ProjectOverride) -> ProjectOverride:
        stmt = select(ProjectOverrideModel).where(
            ProjectOverrideModel.repo_name == override.repo_name
        )
        result = await self._session.execute(stmt)
        existing = result.scalar_one_or_none()

        if existing:
            existing.custom_status = override.custom_status
            existing.custom_url = override.custom_url
            existing.custom_description = override.custom_description
            existing.featured = override.featured
            existing.display_order = override.display_order
            existing.hidden = override.hidden
        else:
            model = ProjectOverrideModel(
                repo_name=override.repo_name,
                custom_status=override.custom_status,
                custom_url=override.custom_url,
                custom_description=override.custom_description,
                featured=override.featured,
                display_order=override.display_order,
                hidden=override.hidden,
            )
            self._session.add(model)

        await self._session.commit()
        return override

    async def delete_override(self, repo_name: str) -> bool:
        stmt = delete(ProjectOverrideModel).where(ProjectOverrideModel.repo_name == repo_name)
        result = await self._session.execute(stmt)
        await self._session.commit()
        return result.rowcount > 0

    async def list_overrides(self) -> list[ProjectOverride]:
        stmt = select(ProjectOverrideModel)
        result = await self._session.execute(stmt)
        return [self._override_to_entity(m) for m in result.scalars().all()]

    # ---- mapping helpers ----

    def _to_entity(self, model: ProjectModel, override: ProjectOverrideModel | None) -> Project:
        is_deployed = bool(model.homepage)
        deploy_url = model.homepage

        featured = False
        display_order = 0
        hidden = False
        custom_status = None
        custom_description = None

        if override:
            if override.custom_url:
                deploy_url = override.custom_url
                is_deployed = True
            if override.custom_status:
                custom_status = override.custom_status
                is_deployed = override.custom_status == "deployed"
            featured = override.featured
            display_order = override.display_order
            hidden = override.hidden
            if override.custom_description:
                custom_description = override.custom_description

        return Project(
            id=model.id,
            name=model.name,
            full_name=model.full_name,
            description=custom_description or model.description,
            html_url=model.html_url,
            homepage=model.homepage,
            language=model.language,
            languages=model.languages,
            topics=model.topics,
            stargazers_count=model.stargazers_count,
            forks_count=model.forks_count,
            fork=model.fork,
            archived=model.archived,
            pushed_at=model.pushed_at,
            created_at=model.created_at,
            readme_content=model.readme_content,
            is_deployed=is_deployed,
            deploy_url=deploy_url,
            featured=featured,
            display_order=display_order,
            hidden=hidden,
            custom_status=custom_status,
        )

    def _to_model(self, project: Project) -> ProjectModel:
        return ProjectModel(
            name=project.name,
            full_name=project.full_name,
            description=project.description,
            html_url=project.html_url,
            homepage=project.homepage,
            language=project.language,
            languages_json=json.dumps(project.languages) if project.languages else None,
            topics_json=json.dumps(project.topics) if project.topics else None,
            stargazers_count=project.stargazers_count,
            forks_count=project.forks_count,
            fork=project.fork,
            archived=project.archived,
            pushed_at=project.pushed_at,
            created_at=project.created_at,
            readme_content=project.readme_content,
        )

    def _update_model(self, model: ProjectModel, project: Project) -> None:
        model.description = project.description
        model.html_url = project.html_url
        model.homepage = project.homepage
        model.language = project.language
        model.languages_json = json.dumps(project.languages) if project.languages else None
        model.topics_json = json.dumps(project.topics) if project.topics else None
        model.stargazers_count = project.stargazers_count
        model.forks_count = project.forks_count
        model.fork = project.fork
        model.archived = project.archived
        model.pushed_at = project.pushed_at
        if project.readme_content:
            model.readme_content = project.readme_content

    def _override_to_entity(self, model: ProjectOverrideModel) -> ProjectOverride:
        return ProjectOverride(
            id=model.id,
            repo_name=model.repo_name,
            custom_status=model.custom_status,
            custom_url=model.custom_url,
            custom_description=model.custom_description,
            featured=model.featured,
            display_order=model.display_order,
            hidden=model.hidden,
        )
