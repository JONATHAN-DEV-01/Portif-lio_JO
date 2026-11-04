"""The contact flow must never report success for a message that was not delivered."""

import json

import httpx

from app.application.use_cases.send_contact import SendContactMessageUseCase
from app.infrastructure.adapters.email import email_sender
from app.infrastructure.adapters.email.email_sender import ResendEmailAdapter


def use_fake_resend(monkeypatch, status_code, requests):
    def handler(request):
        requests.append(request)
        return httpx.Response(status_code, json={})

    real_client = httpx.AsyncClient
    monkeypatch.setattr(email_sender.settings, "resend_api_key", "test-key")
    monkeypatch.setattr(
        email_sender.httpx,
        "AsyncClient",
        lambda: real_client(transport=httpx.MockTransport(handler)),
    )


async def send(adapter):
    return await SendContactMessageUseCase(email_sender=adapter).execute(
        name="Ana", email="ana@example.com", message="Uma mensagem longa o bastante"
    )


async def test_without_api_key_the_message_is_reported_as_not_sent(monkeypatch):
    monkeypatch.setattr(email_sender.settings, "resend_api_key", "")

    result = await send(ResendEmailAdapter())

    assert result["success"] is False
    assert result["error"]


async def test_rejection_by_resend_is_reported_as_not_sent(monkeypatch):
    use_fake_resend(monkeypatch, 403, [])

    result = await send(ResendEmailAdapter())

    assert result["success"] is False


async def test_accepted_message_is_reported_as_sent(monkeypatch):
    requests = []
    use_fake_resend(monkeypatch, 200, requests)

    result = await send(ResendEmailAdapter())

    assert result["success"] is True
    assert len(requests) == 1


async def test_visitor_text_is_escaped_in_the_email(monkeypatch):
    requests = []
    use_fake_resend(monkeypatch, 200, requests)

    await ResendEmailAdapter().send_contact_message(
        name="<b>Ana</b>",
        email="ana@example.com",
        message='<a href="https://example.com">clique</a>\nsegunda linha',
    )

    body = json.loads(requests[0].content)["html"]
    assert "<b>Ana</b>" not in body
    assert "&lt;b&gt;Ana&lt;/b&gt;" in body
    assert "<a href" not in body
    assert "segunda linha" in body
    assert "<br>" in body
