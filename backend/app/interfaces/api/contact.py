"""FastAPI router for contact form endpoint."""

from fastapi import APIRouter

from app.application.use_cases.send_contact import SendContactMessageUseCase
from app.infrastructure.adapters.email.email_sender import ResendEmailAdapter
from app.schemas import ContactRequest, ContactResponse

router = APIRouter(prefix="/api/contact", tags=["contact"])


@router.post("", response_model=ContactResponse)
async def send_contact(body: ContactRequest):
    email_adapter = ResendEmailAdapter()
    use_case = SendContactMessageUseCase(email_sender=email_adapter)
    result = await use_case.execute(
        name=body.name,
        email=body.email,
        message=body.message,
    )
    return ContactResponse(**result)
