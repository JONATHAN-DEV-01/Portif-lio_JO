"""
Email sender adapter.
Sends through Resend. Without RESEND_API_KEY the message cannot be delivered, so it reports
failure and the frontend offers the direct e-mail address instead.
"""

import html
import logging

import httpx

from app.application.ports.interfaces import EmailSenderPort
from app.core.config import get_settings

logger = logging.getLogger(__name__)
settings = get_settings()


class ResendEmailAdapter(EmailSenderPort):
    """Sends email via Resend API when API key is configured."""

    async def send_contact_message(self, name: str, email: str, message: str) -> bool:
        if not settings.resend_api_key:
            logger.error("Contact message not sent: RESEND_API_KEY is not configured.")
            return False

        try:
            async with httpx.AsyncClient() as client:
                resp = await client.post(
                    "https://api.resend.com/emails",
                    headers={
                        "Authorization": f"Bearer {settings.resend_api_key}",
                        "Content-Type": "application/json",
                    },
                    json={
                        "from": settings.from_email,
                        "to": [settings.to_email],
                        "reply_to": email,
                        "subject": f"[Portfólio] Mensagem de {name}",
                        "html": f"""
                        <h2>Nova mensagem do portfólio</h2>
                        <p><strong>Nome:</strong> {html.escape(name)}</p>
                        <p><strong>E-mail:</strong> {html.escape(email)}</p>
                        <p><strong>Mensagem:</strong></p>
                        <p>{html.escape(message).replace(chr(10), '<br>')}</p>
                        """,
                    },
                )
                if resp.status_code in (200, 201):
                    logger.info(f"Email sent successfully to {settings.to_email}")
                    return True
                else:
                    logger.error(f"Resend API error: {resp.status_code} {resp.text}")
                    return False
        except Exception as e:
            logger.error(f"Failed to send email via Resend: {e}")
            return False
