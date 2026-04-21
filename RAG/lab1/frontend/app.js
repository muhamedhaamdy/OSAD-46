/**
 * AI Chef Antoine — Frontend Application Logic
 * Handles chat, settings, and UI interactions.
 */

const API_BASE = '';  // Same origin

// ── DOM References ──────────────────────────────────────────────────────
const chatMessages     = document.getElementById('chatMessages');
const welcomeScreen    = document.getElementById('welcomeScreen');
const messageInput     = document.getElementById('messageInput');
const sendBtn          = document.getElementById('sendBtn');
const typingIndicator  = document.getElementById('typingIndicator');
const newChatBtn       = document.getElementById('newChatBtn');
const providerToggle   = document.getElementById('providerToggle');
const detailToggle     = document.getElementById('detailToggle');
const creativitySlider = document.getElementById('creativitySlider');
const creativityValue  = document.getElementById('creativityValue');
const providerBadge    = document.getElementById('providerBadge');
const sidebar          = document.getElementById('sidebar');
const menuBtn          = document.getElementById('menuBtn');
const sidebarClose     = document.getElementById('sidebarClose');
const ollamaModelGroup = document.getElementById('ollamaModelGroup');
const ollamaModelInput = document.getElementById('ollamaModel');

// ── State ───────────────────────────────────────────────────────────────
let isLoading = false;
let hasMessages = false;

// ── Initialize ──────────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
    loadSettings();
    setupEventListeners();
    messageInput.focus();
});

function setupEventListeners() {
    // Send message
    sendBtn.addEventListener('click', sendMessage);
    messageInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    });

    // Auto-resize textarea
    messageInput.addEventListener('input', () => {
        messageInput.style.height = 'auto';
        messageInput.style.height = Math.min(messageInput.scrollHeight, 120) + 'px';
        sendBtn.disabled = !messageInput.value.trim();
    });

    // New chat
    newChatBtn.addEventListener('click', resetChat);

    // Provider toggle
    providerToggle.querySelectorAll('.provider-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            providerToggle.querySelectorAll('.provider-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const provider = btn.dataset.provider;
            providerBadge.textContent = provider === 'openai' ? 'OpenAI' : 'Ollama';
            ollamaModelGroup.style.display = provider === 'ollama' ? 'block' : 'none';
            updateSettings({ provider });
        });
    });

    // Detail toggle
    detailToggle.querySelectorAll('.detail-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            detailToggle.querySelectorAll('.detail-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            updateSettings({ detail_level: btn.dataset.detail });
        });
    });

    // Creativity slider
    creativitySlider.addEventListener('input', () => {
        const val = (creativitySlider.value / 100).toFixed(1);
        creativityValue.textContent = val;
    });
    creativitySlider.addEventListener('change', () => {
        const val = parseFloat((creativitySlider.value / 100).toFixed(1));
        updateSettings({ creativity: val });
    });

    // Ollama model
    let ollamaTimeout;
    ollamaModelInput.addEventListener('input', () => {
        clearTimeout(ollamaTimeout);
        ollamaTimeout = setTimeout(() => {
            updateSettings({ ollama_model: ollamaModelInput.value.trim() });
        }, 600);
    });

    // Quick start buttons
    document.querySelectorAll('.quick-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            messageInput.value = btn.dataset.msg;
            sendBtn.disabled = false;
            sendMessage();
        });
    });

    // Mobile sidebar
    menuBtn.addEventListener('click', () => {
        sidebar.classList.add('open');
        getOrCreateOverlay().classList.add('visible');
    });
    sidebarClose.addEventListener('click', closeSidebar);
}

// ── Overlay ─────────────────────────────────────────────────────────────
function getOrCreateOverlay() {
    let overlay = document.querySelector('.sidebar-overlay');
    if (!overlay) {
        overlay = document.createElement('div');
        overlay.className = 'sidebar-overlay';
        overlay.addEventListener('click', closeSidebar);
        document.body.appendChild(overlay);
    }
    return overlay;
}

function closeSidebar() {
    sidebar.classList.remove('open');
    getOrCreateOverlay().classList.remove('visible');
}

// ── API Calls ───────────────────────────────────────────────────────────
async function loadSettings() {
    try {
        const res = await fetch(`${API_BASE}/api/settings`);
        const data = await res.json();
        applySettingsToUI(data);
    } catch (err) {
        console.warn('Could not load settings:', err);
    }
}

function applySettingsToUI(settings) {
    // Provider
    providerToggle.querySelectorAll('.provider-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.provider === settings.provider);
    });
    providerBadge.textContent = settings.provider === 'openai' ? 'OpenAI' : 'Ollama';
    ollamaModelGroup.style.display = settings.provider === 'ollama' ? 'block' : 'none';

    // Creativity
    creativitySlider.value = Math.round(settings.creativity * 100);
    creativityValue.textContent = settings.creativity.toFixed(1);

    // Detail
    detailToggle.querySelectorAll('.detail-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.detail === settings.detail_level);
    });

    // Ollama model
    if (settings.ollama_model) {
        ollamaModelInput.value = settings.ollama_model;
    }
}

async function updateSettings(partial) {
    try {
        await fetch(`${API_BASE}/api/settings`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(partial),
        });
    } catch (err) {
        console.warn('Could not update settings:', err);
    }
}

async function sendMessage() {
    const text = messageInput.value.trim();
    if (!text || isLoading) return;

    // Hide welcome screen
    if (!hasMessages) {
        welcomeScreen.style.display = 'none';
        hasMessages = true;
    }

    // Add user message
    appendMessage('user', text);
    messageInput.value = '';
    messageInput.style.height = 'auto';
    sendBtn.disabled = true;

    // Show typing
    isLoading = true;
    showTyping(true);

    try {
        const res = await fetch(`${API_BASE}/api/chat`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ message: text }),
        });
        const data = await res.json();
        showTyping(false);
        appendMessage('chef', data.reply);
    } catch (err) {
        showTyping(false);
        appendMessage('chef', '⚠️ Mon ami, something went wrong in the kitchen! Please check the connection and try again.');
    } finally {
        isLoading = false;
        messageInput.focus();
    }
}

async function resetChat() {
    try {
        await fetch(`${API_BASE}/api/chat/reset`, { method: 'POST' });
    } catch (err) {
        console.warn('Could not reset chat:', err);
    }

    // Clear messages UI
    const messages = chatMessages.querySelectorAll('.message');
    messages.forEach(m => m.remove());

    // Show welcome
    hasMessages = false;
    welcomeScreen.style.display = '';
    welcomeScreen.style.animation = 'none';
    requestAnimationFrame(() => {
        welcomeScreen.style.animation = '';
    });

    closeSidebar();
    messageInput.focus();
}

// ── UI Helpers ──────────────────────────────────────────────────────────
function appendMessage(role, content) {
    const div = document.createElement('div');
    div.className = `message ${role}`;

    const avatar = document.createElement('div');
    avatar.className = 'message-avatar';
    avatar.textContent = role === 'chef' ? '👨‍🍳' : '🧑';

    const bubble = document.createElement('div');
    bubble.className = 'message-content';
    bubble.innerHTML = renderMarkdown(content);

    div.appendChild(avatar);
    div.appendChild(bubble);
    chatMessages.appendChild(div);

    // Scroll to bottom
    requestAnimationFrame(() => {
        chatMessages.scrollTo({
            top: chatMessages.scrollHeight,
            behavior: 'smooth',
        });
    });
}

function showTyping(show) {
    typingIndicator.classList.toggle('visible', show);
    if (show) {
        chatMessages.scrollTo({
            top: chatMessages.scrollHeight,
            behavior: 'smooth',
        });
    }
}

/**
 * Minimal Markdown renderer — handles bold, italic, lists, line breaks.
 * Keeps it lightweight (no external deps).
 */
function renderMarkdown(text) {
    if (!text) return '';

    // Escape HTML
    let html = text
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;');

    // Bold: **text**
    html = html.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');

    // Italic: *text* or _text_
    html = html.replace(/(?<!\*)\*(?!\*)(.+?)(?<!\*)\*(?!\*)/g, '<em>$1</em>');
    html = html.replace(/_(.+?)_/g, '<em>$1</em>');

    // Inline code: `code`
    html = html.replace(/`(.+?)`/g, '<code>$1</code>');

    // Unordered lists: lines starting with - or *
    html = html.replace(/^[\-\*]\s+(.+)/gm, '<li>$1</li>');
    html = html.replace(/(<li>.*<\/li>)/gs, '<ul>$1</ul>');
    // Clean up nested <ul> tags
    html = html.replace(/<\/ul>\s*<ul>/g, '');

    // Ordered lists: lines starting with number.
    html = html.replace(/^\d+\.\s+(.+)/gm, '<li>$1</li>');

    // Headings: ### text
    html = html.replace(/^###\s+(.+)/gm, '<strong>$1</strong>');
    html = html.replace(/^##\s+(.+)/gm, '<strong>$1</strong>');
    html = html.replace(/^#\s+(.+)/gm, '<strong>$1</strong>');

    // Paragraphs: double newlines
    html = html.replace(/\n\n+/g, '</p><p>');
    html = '<p>' + html + '</p>';

    // Single newlines → <br>
    html = html.replace(/\n/g, '<br>');

    // Clean empty paragraphs
    html = html.replace(/<p>\s*<\/p>/g, '');

    return html;
}
