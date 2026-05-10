from fastapi import FastAPI, HTTPException
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
from pydantic import BaseModel
from rag import init_rag_system, ask_question
from contextlib import asynccontextmanager
import os

# Initialize variables to hold the RAG state
vectorstore = None
llm = None

@asynccontextmanager
async def lifespan(app: FastAPI):
    global vectorstore, llm
    print("Starting up: Initializing RAG system...")
    try:
        vectorstore, llm = init_rag_system()
        print("Startup complete.")
    except Exception as e:
        print(f"Error initializing RAG system: {e}")
    yield
    print("Shutting down...")

app = FastAPI(lifespan=lifespan)

# Mount static files
os.makedirs("static", exist_ok=True)
app.mount("/static", StaticFiles(directory="static"), name="static")

class ChatRequest(BaseModel):
    message: str

class ChatResponse(BaseModel):
    response: str

@app.get("/")
async def read_index():
    return FileResponse("static/index.html")

@app.post("/chat", response_model=ChatResponse)
async def chat_endpoint(request: ChatRequest):
    if not vectorstore or not llm:
        raise HTTPException(status_code=503, detail="RAG system is not fully initialized yet.")
    
    try:
        answer = ask_question(request.message, vectorstore, llm)
        return ChatResponse(response=answer)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
