"""Use case: Send a contact form message."""

import logging

from app.application.ports.interfaces import EmailSenderPort
from app.domain.entities import ContactMessage

logger = logging.getLogger(__name__)


class SendContactMessageUseCase:
    def __init__(self, email_sender: EmailSenderPort) -> None:
        self._email = email_sender

    async def execute(self, name: str, email: str, message: str) -> dict:
        contact = ContactMessage(name=name, email=email, message=message)

        # Basic validation
        if not contact.name.strip():
            return {"success": False, "error": "Nome é obrigatório."}
        if "@" not in contact.email:
            return {"success": False, "error": "E-mail inválido."}
        if len(contact.message.strip()) < 10:
            return {"success": False, "error": "Mensagem muito curta."}

        try:
            sent = await self._email.send_contact_message(
                name=contact.name,
                email=contact.email,
                message=contact.message,
            )
            if sent:
                return {"success": True, "message": "Mensagem enviada com sucesso!"}
            else:
                return {"success": False, "error": "Falha ao enviar mensagem. Tente novamente."}
        except Exception as e:
            logger.error(f"Error sending contact message: {e}")
            return {"success": False, "error": "Erro interno. Tente novamente mais tarde."}
