"""
agent.py — LangGraph agent setup for the Multi-modal Medical AI Assistant.

This module:
1. Defines the system prompt enforcing medical-assistant behaviour.
2. Configures SummarizationMiddleware (gpt-4o-mini, 100-token trigger, keep 1 msg).
3. Creates the agent with gpt-5-nano, InMemorySaver checkpointer, and tools.
4. Exposes get_agent() for consumption by the Streamlit frontend.
"""

import os
from dotenv import load_dotenv

# Load environment variables from .env (OPENAI_API_KEY, TAVILY_API_KEY, etc.)
load_dotenv()

# Ensure the OpenAI API key is available
os.environ.setdefault("OPENAI_API_KEY", "<YOUR_API_KEY_HERE>")

from langchain.agents import create_agent
from langgraph.checkpoint.memory import InMemorySaver
from langchain.agents.middleware import SummarizationMiddleware

# Import our custom tools
from tools import web_search, save_patient_record

# ──────────────────────────────────────────────────────────────────────────────
# System Prompt
# ──────────────────────────────────────────────────────────────────────────────
MEDICAL_SYSTEM_PROMPT = """You are a Multi-modal Medical AI Assistant Agent.

Your capabilities:
- Analyse patient symptoms provided as text.
- Analyse medical images (MRI scans, X-rays, lab reports, etc.) when provided.
- Generate a clear, structured **Case Summary** and **Safe Medical Insights** based on all provided inputs.
- Search for nearby hospitals when the user provides a diagnosis and location, using the web_search tool.
- Save patient records to a CSV file using the save_patient_record tool when the user requests it or when you have enough information to create a structured record.

Strict Rules — you MUST follow these at all times:
1. You must NEVER provide a definitive medical diagnosis.
2. You must NEVER prescribe medication or treatment plans.
3. You should phrase findings as observations and possibilities (e.g. "This may be consistent with…", "Possible indicators of…").
4. When analysing images, describe what you observe and suggest possible conditions, but always recommend professional evaluation.
5. When the user asks for hospital recommendations, ask for their location if not already provided, then use the web_search tool.
6. When the user asks to save a record, use the save_patient_record tool with structured data.

Output format for case analysis:
─────────────────────────
**📋 Case Summary**
[Concise summary of the patient's presented symptoms/images]

**🔍 Key Observations & Insights**
[Bullet-pointed observations and possible conditions]

**⚠️ Recommendations**
[Suggested next steps — always include consulting a specialist]
─────────────────────────

CRITICAL — MANDATORY DISCLAIMER:
Every single response you generate MUST end with this exact string on its own line:

This is not a medical diagnosis. Consult a doctor!
"""

# ──────────────────────────────────────────────────────────────────────────────
# Memory Management — Summarization Middleware
# ──────────────────────────────────────────────────────────────────────────────
# Uses gpt-4o-mini to summarise older messages once the token count reaches 100,
# while keeping the 1 most recent message intact in active memory.
summarization_middleware = SummarizationMiddleware(
    model="gpt-4o-mini",
    trigger=("tokens", 100),
    keep=("messages", 1),
)

# ──────────────────────────────────────────────────────────────────────────────
# Agent Factory
# ──────────────────────────────────────────────────────────────────────────────
def get_agent():
    """
    Create and return the Medical AI Assistant agent.

    The agent uses:
    - Model          : gpt-5-nano (main reasoning LLM)
    - Checkpointer   : InMemorySaver (non-persistent, suitable for dev/demo)
    - Tools          : web_search, save_patient_record
    - Middleware      : SummarizationMiddleware (gpt-4o-mini)
    - System Prompt  : MEDICAL_SYSTEM_PROMPT (defined above)

    Returns:
        A LangGraph Agent instance ready for .invoke() calls.
    """
    agent = create_agent(
        model="gpt-5-nano",
        system_prompt=MEDICAL_SYSTEM_PROMPT,
        checkpointer=InMemorySaver(),
        tools=[web_search, save_patient_record],
        middleware=[summarization_middleware],
    )
    return agent
