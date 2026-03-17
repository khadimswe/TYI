"""
TagYouAreIt – FastAPI backend
Webhook-based API that the React Native frontend calls.
Connected to Supabase for data persistence and OpenAI for PDF parsing.
"""
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.config import settings
from app.routes import auth, transcript, schedule

app = FastAPI(
    title="TagYouAreIt API",
    version="0.1.0",
    description="Backend webhook API for the TYI tutoring platform",
)

# ── CORS ─────────────────────────────────────────────────────
app.add_middleware(
    CORSMiddleware,
    allow_origins=[settings.FRONTEND_ORIGIN] if settings.FRONTEND_ORIGIN != "*" else ["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ── Routes ───────────────────────────────────────────────────
app.include_router(auth.router)
app.include_router(transcript.router)
app.include_router(schedule.router)


@app.get("/")
async def root():
    return {"status": "ok", "service": "TagYouAreIt API"}


@app.get("/health")
async def health():
    return {"status": "healthy"}
