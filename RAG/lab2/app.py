"""
app.py — Streamlit frontend for the Multi-modal Medical AI Assistant Agent.

Features:
- Text input for patient symptoms (required).
- Image uploader for MRI / scan images (optional).
- Chat history display with user and assistant messages.
- Multimodal message construction (text + base64 image) sent to the LangGraph agent.

Run with:
    streamlit run app.py
"""

import base64
import uuid
import streamlit as st
from langchain.messages import HumanMessage

from agent import get_agent

st.set_page_config(
    page_title="🏥 Medical AI Assistant",
    page_icon="🏥",
    layout="centered",
)

st.title("🏥 Multi-modal Medical AI Assistant")
st.caption("Analyse symptoms & medical images • Find nearby hospitals • Save patient records")

if "chat_history" not in st.session_state:
    st.session_state.chat_history = []

if "thread_id" not in st.session_state:
    st.session_state.thread_id = str(uuid.uuid4())

if "agent" not in st.session_state:
    st.session_state.agent = get_agent()

for message in st.session_state.chat_history:
    with st.chat_message(message["role"]):
        if message.get("image"):
            st.image(message["image"], caption="Uploaded Medical Image", width=300)
        st.markdown(message["content"])

with st.sidebar:
    st.header("📎 Upload Medical Image")
    uploaded_file = st.file_uploader(
        "Upload an MRI, X-Ray, or Scan (optional)",
        type=["png", "jpg", "jpeg", "webp"],
        help="The agent will analyse this image alongside your text symptoms.",
    )

    st.divider()
    st.markdown(
        "**⚠️ Disclaimer:** This tool does not provide medical diagnoses. "
        "Always consult a qualified healthcare professional."
    )

# ──────────────────────────────────────────────────────────────────────────────
# Chat Input
# ──────────────────────────────────────────────────────────────────────────────
user_input = st.chat_input("Describe your symptoms or ask a question…")

if user_input:
    # ── 1. Build the multimodal content list for HumanMessage ──
    content_blocks = [{"type": "text", "text": user_input}]

    # Read uploaded image bytes (if any) for display + base64 encoding
    image_bytes = None
    if uploaded_file is not None:
        image_bytes = uploaded_file.getvalue()

        # Determine MIME type from the file extension
        mime_map = {
            "png": "image/png",
            "jpg": "image/jpeg",
            "jpeg": "image/jpeg",
            "webp": "image/webp",
        }
        file_ext = uploaded_file.name.rsplit(".", 1)[-1].lower()
        mime_type = mime_map.get(file_ext, "image/png")

        # Encode the image as base64 and append to content blocks
        image_base64 = base64.b64encode(image_bytes).decode("utf-8")
        content_blocks.append({
            "type": "image",
            "base64": image_base64,
            "mime_type": mime_type,
        })

    # ── 2. Display the user message in the chat UI ──
    with st.chat_message("user"):
        if image_bytes:
            st.image(image_bytes, caption="Uploaded Medical Image", width=300)
        st.markdown(user_input)

    # Store user message in chat history
    st.session_state.chat_history.append({
        "role": "user",
        "content": user_input,
        "image": image_bytes,
    })

    # ── 3. Invoke the LangGraph agent ──
    with st.chat_message("assistant"):
        with st.spinner("🔬 Analysing your input…"):
            try:
                # Construct the HumanMessage with text (and optional image)
                human_msg = HumanMessage(content=content_blocks)

                # Invoke the agent with the current thread for memory continuity
                response = st.session_state.agent.invoke(
                    {"messages": [human_msg]},
                    config={"configurable": {"thread_id": st.session_state.thread_id}},
                )

                # Extract the assistant's reply (last message in the response)
                assistant_reply = response["messages"][-1].content

            except Exception as e:
                assistant_reply = (
                    f"⚠️ An error occurred while processing your request:\n\n`{str(e)}`\n\n"
                    "This is not a medical diagnosis. Consult a doctor!"
                )

        # Display the assistant's response
        st.markdown(assistant_reply)

    # Store assistant message in chat history
    st.session_state.chat_history.append({
        "role": "assistant",
        "content": assistant_reply,
        "image": None,
    })
