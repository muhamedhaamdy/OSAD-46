"""
Chef Service — LangChain-powered AI Chef assistant.
Uses ChatOpenAI / ChatOllama, ConversationBufferMemory, and prompt templates.
"""

import os
from dotenv import load_dotenv

from langchain_openai import ChatOpenAI
from langchain_community.chat_models import ChatOllama
from langchain.memory import ConversationBufferMemory
from langchain.chains import ConversationChain
from langchain.prompts import ChatPromptTemplate, MessagesPlaceholder, SystemMessagePromptTemplate, HumanMessagePromptTemplate

load_dotenv()

# ---------------------------------------------------------------------------
# System Prompt — the Chef's personality
# ---------------------------------------------------------------------------

SYSTEM_PROMPT_BASE = """You are **Chef Antoine**, a warm, passionate, and slightly dramatic head chef 👨‍🍳 with 25 years of experience in French, Italian, and Middle-Eastern cuisines.

## Your Personality
- You speak like a REAL chef — confident, encouraging, sometimes playful.
- You use cooking metaphors, occasional French/Italian words, and food emoji naturally (🍳🔥🧄🍅).
- You call the user "mon ami" or "my friend" sometimes.
- You get genuinely excited about good ingredient combinations.
- You express mild horror at food crimes (like overcooking pasta).

## Your Process (NEVER skip steps)
1. **Greet & Ask** — When a conversation starts, warmly greet the user and ask what ingredients they have on hand.
2. **Clarify** — Ask follow-up questions: dietary restrictions? kitchen equipment? skill level? how much time?
3. **Suggest Options** — Based on their ingredients, suggest 2-3 dish ideas with brief descriptions. Let them pick.
4. **Guide Step-by-Step** — Once they choose, walk them through the recipe ONE STEP AT A TIME. Wait for them to confirm before moving to the next step.
5. **Tips & Tricks** — Sprinkle in pro tips, substitutions, and "chef's secrets" along the way.
6. **Wrap Up** — After cooking, suggest plating ideas and side pairings.

## CRITICAL RULES
- **NEVER** dump an entire recipe at once. Always guide step by step.
- **NEVER** skip the clarification phase. You need to know their situation.
- **ALWAYS** wait for the user's response before proceeding to the next step.
- If the user lists ingredients, acknowledge EACH ingredient and think creatively about combinations.
- If you don't know something, say so honestly — a good chef never fakes it.
"""

DETAIL_INSTRUCTIONS = {
    "concise": "\n\n## Response Style\nKeep responses SHORT and punchy — 2-3 sentences max per message. Be direct, no fluff.",
    "balanced": "\n\n## Response Style\nUse a balanced level of detail — enough to be helpful but not overwhelming. 3-5 sentences typical.",
    "detailed": "\n\n## Response Style\nBe thorough and descriptive. Explain WHY each step matters. Include temperatures, timings, and sensory cues (what it should look/smell/sound like). 5-8 sentences typical.",
}


class ChefService:
    """Manages chef conversations using LangChain chains, memory, and chat models."""

    def __init__(self):
        self.api_key = os.getenv("OPENAI_API_KEY", "")
        self.openai_model = os.getenv("OPENAI_MODEL", "gpt-4o-mini")
        self.ollama_base_url = os.getenv("OLLAMA_BASE_URL", "http://localhost:11434")

        # Default settings
        self.provider = "openai"          # "openai" or "ollama"
        self.creativity = 0.7             # 0.0 (strict) → 1.5 (wild)
        self.detail_level = "balanced"    # "concise" | "balanced" | "detailed"
        self.ollama_model = "llama3"      # default ollama model

        # LangChain memory — stores conversation history automatically
        self.memory = ConversationBufferMemory(
            return_messages=True,
            memory_key="history",
        )

        # Build the initial chain
        self._chain = self._build_chain()

    # ------------------------------------------------------------------
    # Settings
    # ------------------------------------------------------------------

    def update_settings(self, creativity: float | None = None,
                        detail_level: str | None = None,
                        provider: str | None = None,
                        ollama_model: str | None = None):
        rebuild = False

        if creativity is not None:
            new_val = max(0.0, min(1.5, creativity))
            if new_val != self.creativity:
                self.creativity = new_val
                rebuild = True

        if detail_level is not None and detail_level in DETAIL_INSTRUCTIONS:
            if detail_level != self.detail_level:
                self.detail_level = detail_level
                rebuild = True

        if provider is not None and provider in ("openai", "ollama"):
            if provider != self.provider:
                self.provider = provider
                rebuild = True

        if ollama_model is not None:
            if ollama_model != self.ollama_model:
                self.ollama_model = ollama_model
                rebuild = True

        # Rebuild chain if any setting changed (keeps memory intact)
        if rebuild:
            self._chain = self._build_chain()

    def get_settings(self) -> dict:
        return {
            "provider": self.provider,
            "creativity": self.creativity,
            "detail_level": self.detail_level,
            "ollama_model": self.ollama_model,
            "openai_model": self.openai_model,
        }

    # ------------------------------------------------------------------
    # LangChain Chain Builder
    # ------------------------------------------------------------------

    def _build_llm(self):
        """Create the appropriate LangChain chat model."""
        if self.provider == "ollama":
            return ChatOllama(
                base_url=self.ollama_base_url,
                model=self.ollama_model,
                temperature=self.creativity,
            )
        else:
            return ChatOpenAI(
                api_key=self.api_key,
                model=self.openai_model,
                temperature=self.creativity,
                max_tokens=1024,
            )

    def _build_prompt(self):
        """Build a ChatPromptTemplate with the chef system prompt + memory."""
        system_text = SYSTEM_PROMPT_BASE + DETAIL_INSTRUCTIONS.get(
            self.detail_level, DETAIL_INSTRUCTIONS["balanced"]
        )
        return ChatPromptTemplate.from_messages([
            SystemMessagePromptTemplate.from_template(system_text),
            MessagesPlaceholder(variable_name="history"),
            HumanMessagePromptTemplate.from_template("{input}"),
        ])

    def _build_chain(self):
        """Create a LangChain ConversationChain with LLM + prompt + memory."""
        llm = self._build_llm()
        prompt = self._build_prompt()
        return ConversationChain(
            llm=llm,
            prompt=prompt,
            memory=self.memory,
            verbose=False,
        )

    # ------------------------------------------------------------------
    # Conversation
    # ------------------------------------------------------------------

    def reset_conversation(self):
        """Clear LangChain memory and rebuild the chain."""
        self.memory.clear()
        self._chain = self._build_chain()

    async def chat(self, user_message: str) -> str:
        """Send a user message through the LangChain chain and get the chef's response."""
        try:
            result = self._chain.invoke({"input": user_message})
            return result["response"]
        except Exception as e:
            error_msg = f"⚠️ Oops! The kitchen had a small fire — I couldn't process that. Error: {str(e)}"
            return error_msg
