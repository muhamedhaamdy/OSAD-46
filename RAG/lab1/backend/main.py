"""
AI Chef Assistant — FastAPI Backend
Serves the chat API and the static frontend.
"""

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
from pydantic import BaseModel
from pathlib import Path

from chef_service import ChefService

# ---------------------------------------------------------------------------
# App & Chef instance
# ---------------------------------------------------------------------------

app = FastAPI(title="AI Chef Assistant", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

chef = ChefService()

# ---------------------------------------------------------------------------
# Request / Response models
# ---------------------------------------------------------------------------

class ChatRequest(BaseModel):
    message: str

class ChatResponse(BaseModel):
    reply: str

class SettingsRequest(BaseModel):
    creativity: float | None = None
    detail_level: str | None = None
    provider: str | None = None
    ollama_model: str | None = None

# ---------------------------------------------------------------------------
# API Endpoints
# ---------------------------------------------------------------------------

@app.post("/api/chat", response_model=ChatResponse)
async def chat(req: ChatRequest):
    """Send a message to Chef Antoine and get a response."""
    reply = await chef.chat(req.message)
    return ChatResponse(reply=reply)


@app.post("/api/chat/reset")
async def reset_chat():
    """Clear conversation history and start fresh."""
    chef.reset_conversation()
    return {"status": "ok", "message": "Conversation reset. Chef Antoine is ready for a new adventure! 👨‍🍳"}


@app.get("/api/settings")
async def get_settings():
    """Get current chef settings."""
    return chef.get_settings()


@app.post("/api/settings")
async def update_settings(req: SettingsRequest):
    """Update chef settings (creativity, detail, provider)."""
    chef.update_settings(
        creativity=req.creativity,
        detail_level=req.detail_level,
        provider=req.provider,
        ollama_model=req.ollama_model,
    )
    return chef.get_settings()


# ---------------------------------------------------------------------------
# Serve Frontend (static files)
# ---------------------------------------------------------------------------

FRONTEND_DIR = Path(__file__).parent.parent / "frontend"

# Mount static assets
app.mount("/static", StaticFiles(directory=str(FRONTEND_DIR)), name="static")


@app.get("/")
async def serve_index():
    """Serve the frontend index.html."""
    return FileResponse(str(FRONTEND_DIR / "index.html"))
