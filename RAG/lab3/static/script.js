document.addEventListener('DOMContentLoaded', () => {
    const chatForm = document.getElementById('chat-form');
    const userInput = document.getElementById('user-input');
    const chatContainer = document.getElementById('chat-container');
    const sendButton = document.getElementById('send-button');

    function createMessageElement(content, isUser = false) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${isUser ? 'user-message' : 'bot-message'}`;

        const avatarDiv = document.createElement('div');
        avatarDiv.className = 'avatar';
        
        if (isUser) {
            avatarDiv.innerHTML = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>';
        } else {
            avatarDiv.innerHTML = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="10" rx="2"/><circle cx="12" cy="5" r="2"/><path d="M12 7v4"/><line x1="8" y1="16" x2="8" y2="16"/><line x1="16" y1="16" x2="16" y2="16"/></svg>';
        }

        const contentDiv = document.createElement('div');
        contentDiv.className = 'message-content';
        
        // Handle markdown-like line breaks for better formatting
        const formattedContent = content.replace(/\n/g, '<br>');
        contentDiv.innerHTML = `<p>${formattedContent}</p>`;

        messageDiv.appendChild(avatarDiv);
        messageDiv.appendChild(contentDiv);

        return messageDiv;
    }

    function createTypingIndicator() {
        const messageDiv = document.createElement('div');
        messageDiv.className = 'message bot-message typing-indicator-wrapper';
        messageDiv.id = 'typing-indicator';

        const avatarDiv = document.createElement('div');
        avatarDiv.className = 'avatar';
        avatarDiv.innerHTML = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="10" rx="2"/><circle cx="12" cy="5" r="2"/><path d="M12 7v4"/><line x1="8" y1="16" x2="8" y2="16"/><line x1="16" y1="16" x2="16" y2="16"/></svg>';

        const contentDiv = document.createElement('div');
        contentDiv.className = 'message-content';
        contentDiv.innerHTML = `
            <div class="typing-indicator">
                <div class="typing-dot"></div>
                <div class="typing-dot"></div>
                <div class="typing-dot"></div>
            </div>
        `;

        messageDiv.appendChild(avatarDiv);
        messageDiv.appendChild(contentDiv);

        return messageDiv;
    }

    function scrollToBottom() {
        chatContainer.scrollTop = chatContainer.scrollHeight;
    }

    async function sendMessage(message) {
        // Add user message to UI
        chatContainer.appendChild(createMessageElement(message, true));
        userInput.value = '';
        scrollToBottom();

        // Disable input while waiting
        userInput.disabled = true;
        sendButton.disabled = true;

        // Add typing indicator
        const typingIndicator = createTypingIndicator();
        chatContainer.appendChild(typingIndicator);
        scrollToBottom();

        try {
            const response = await fetch('/chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ message: message })
            });

            const data = await response.json();

            // Remove typing indicator
            typingIndicator.remove();

            if (!response.ok) {
                throw new Error(data.detail || 'An error occurred while fetching the response.');
            }

            // Add bot response to UI
            chatContainer.appendChild(createMessageElement(data.response, false));
        } catch (error) {
            // Remove typing indicator if it's still there
            if (document.getElementById('typing-indicator')) {
                typingIndicator.remove();
            }
            
            // Show error message
            const errorMsg = "Sorry, I encountered an error: " + error.message;
            const errorEl = createMessageElement(errorMsg, false);
            errorEl.querySelector('.message-content').style.color = '#ef4444'; // Red error text
            chatContainer.appendChild(errorEl);
        } finally {
            // Re-enable input
            userInput.disabled = false;
            sendButton.disabled = false;
            userInput.focus();
            scrollToBottom();
        }
    }

    chatForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const message = userInput.value.trim();
        if (message) {
            sendMessage(message);
        }
    });

    // Auto-focus input on load
    userInput.focus();
});
