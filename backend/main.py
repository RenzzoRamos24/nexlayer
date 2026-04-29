"""Nexlayer backend — FastAPI service for landing page contact + fleet demo."""
import json
import os
import random
import urllib.error
import urllib.request
from datetime import datetime
from typing import List, Literal

from dotenv import load_dotenv
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, EmailStr, Field

load_dotenv()

RESEND_API_KEY = os.getenv("RESEND_API_KEY", "")
RESEND_FROM = os.getenv("RESEND_FROM", "Nexlayer <onboarding@resend.dev>")
NOTIFY_EMAIL = os.getenv("NOTIFY_EMAIL", "renzogutierrez966111@gmail.com")
FRONTEND_ORIGINS = [o.strip() for o in os.getenv(
    "FRONTEND_ORIGINS",
    "http://localhost:5173,http://127.0.0.1:5173"
).split(",") if o.strip()]

app = FastAPI(title="Nexlayer API", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=FRONTEND_ORIGINS,
    allow_credentials=True,
    allow_methods=["GET", "POST", "OPTIONS"],
    allow_headers=["*"],
)


class ContactPayload(BaseModel):
    company: str = Field(min_length=2, max_length=120)
    email: EmailStr
    phone: str = Field(min_length=6, max_length=30)
    message: str = Field(default="", max_length=2000)


class ContactResponse(BaseModel):
    ok: bool
    delivered: bool
    received_at: datetime


TrailerStatus = Literal["moving", "idle", "loading", "alert"]


class Trailer(BaseModel):
    id: str
    driver: str
    route: str
    speed: int
    status: TrailerStatus
    battery: int
    lat: float
    lng: float


class FleetResponse(BaseModel):
    updated_at: datetime
    trailers: List[Trailer]


# Seed simulado para el panel de flotas (mutable en memoria)
_FLEET_SEED = [
    {"id": "TR-104", "driver": "A. Quispe",   "route": "Lima → Trujillo",   "speed": 88, "status": "moving",  "battery": 92, "lat": -8.11, "lng": -79.02},
    {"id": "TR-211", "driver": "M. Salas",    "route": "Callao → Arequipa", "speed": 0,  "status": "loading", "battery": 78, "lat": -16.40, "lng": -71.53},
    {"id": "TR-318", "driver": "J. Ramos",    "route": "Cusco → Puno",      "speed": 64, "status": "moving",  "battery": 84, "lat": -15.50, "lng": -70.03},
    {"id": "TR-402", "driver": "L. Cárdenas", "route": "Lima → Chiclayo",   "speed": 0,  "status": "idle",    "battery": 45, "lat": -6.77, "lng": -79.84},
    {"id": "TR-507", "driver": "D. Flores",   "route": "Piura → Sullana",   "speed": 12, "status": "alert",   "battery": 22, "lat": -4.90, "lng": -80.69},
    {"id": "TR-612", "driver": "C. Huamán",   "route": "Ica → Nazca",       "speed": 72, "status": "moving",  "battery": 67, "lat": -14.83, "lng": -74.93},
]


def _step(t: dict) -> dict:
    """Avanza un trailer un tick en la simulación."""
    nxt = dict(t)
    status = t["status"]

    if status == "moving":
        nxt["speed"] = max(30, min(110, t["speed"] + random.randint(-12, 12)))
        nxt["battery"] = max(0, t["battery"] - 1)
        nxt["lat"] += random.uniform(-0.04, 0.04)
        nxt["lng"] += random.uniform(-0.04, 0.04)
        if nxt["battery"] < 25:
            nxt["status"] = "alert"

    elif status == "idle" and random.random() > 0.7:
        nxt.update(status="moving", speed=random.randint(35, 70))

    elif status == "loading" and random.random() > 0.6:
        nxt.update(status="moving", speed=random.randint(30, 50))

    elif status == "alert":
        nxt["speed"] = max(0, min(60, t["speed"] + random.randint(-5, 3)))
        if random.random() > 0.85:
            nxt["battery"] = min(100, t["battery"] + 25)
            nxt["status"] = "moving"

    return nxt


def _send_notification_email(payload: ContactPayload) -> bool:
    """Envía el email vía Resend HTTPS API. Devuelve False si no hay API key configurada."""
    if not RESEND_API_KEY:
        print(f"[contact] RESEND_API_KEY no configurado — payload recibido: {payload.model_dump()}")
        return False

    body = (
        f"Nueva consulta recibida desde la landing de Nexlayer.\n\n"
        f"Empresa : {payload.company}\n"
        f"Email   : {payload.email}\n"
        f"Teléfono: {payload.phone}\n\n"
        f"Mensaje:\n{payload.message or '(sin mensaje)'}\n\n"
        f"Recibido: {datetime.utcnow().isoformat()} UTC\n"
    )

    data = json.dumps({
        "from": RESEND_FROM,
        "to": [NOTIFY_EMAIL],
        "reply_to": payload.email,
        "subject": f"[Nexlayer] Nueva consulta de {payload.company}",
        "text": body,
    }).encode("utf-8")

    req = urllib.request.Request(
        "https://api.resend.com/emails",
        data=data,
        method="POST",
        headers={
            "Authorization": f"Bearer {RESEND_API_KEY}",
            "Content-Type": "application/json",
            "User-Agent": "Nexlayer-Backend/1.0",
            "Accept": "application/json",
        },
    )
    try:
        with urllib.request.urlopen(req, timeout=10) as resp:
            if resp.status >= 300:
                raise RuntimeError(f"Resend respondió {resp.status}: {resp.read()!r}")
    except urllib.error.HTTPError as exc:
        body = exc.read().decode("utf-8", errors="replace")
        raise RuntimeError(f"Resend HTTP {exc.code}: {body}") from exc
    return True


@app.get("/")
def root():
    return {"service": "Nexlayer API", "status": "ok", "version": "1.0.0"}


@app.get("/api/health")
def health():
    return {"status": "ok", "time": datetime.utcnow().isoformat()}


@app.post("/api/contact", response_model=ContactResponse)
def contact(payload: ContactPayload):
    try:
        delivered = _send_notification_email(payload)
    except Exception as exc:
        print(f"[contact] SMTP falló — payload guardado en logs: {payload.model_dump()} | error: {exc}")
        delivered = False

    return ContactResponse(ok=True, delivered=delivered, received_at=datetime.utcnow())


@app.get("/api/fleet/demo", response_model=FleetResponse)
def fleet_demo():
    global _FLEET_SEED
    _FLEET_SEED = [_step(t) for t in _FLEET_SEED]
    return FleetResponse(updated_at=datetime.utcnow(), trailers=_FLEET_SEED)


if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
