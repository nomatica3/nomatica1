document.addEventListener('DOMContentLoaded', () => {
    // ========== MOVING COLORFUL DIV ==========
    const mover = document.createElement('div');
    mover.style.position = 'fixed';
    mover.style.width = '100px';
    mover.style.height = '100px';
    mover.style.borderRadius = '50%';
    mover.style.background = 'linear-gradient(45deg, red, yellow, green, blue)';
    mover.style.transition = 'all 0.7s cubic-bezier(.68,-0.55,.27,1.55)';
    mover.style.zIndex = 9999;
    mover.style.boxShadow = '0 0 30px 10px rgba(0,0,0,0.2)';
    document.body.appendChild(mover);

    function randomGradient() {
        const stops = Array.from({length: 3 + Math.floor(Math.random() * 3)}, () =>
            `hsl(${Math.floor(Math.random() * 360)}, 80%, 60%)`
        );
        return `linear-gradient(${Math.floor(Math.random()*360)}deg, ${stops.join(', ')})`;
    }

    function randomSize() {
        return 60 + Math.random() * 120;
    }

    function moveAndColor() {
        const size = randomSize();
        mover.style.width = `${size}px`;
        mover.style.height = `${size}px`;
        const x = Math.random() * (window.innerWidth - size);
        const y = Math.random() * (window.innerHeight - size);
        mover.style.left = `${x}px`;
        mover.style.top = `${y}px`;
        mover.style.background = randomGradient();
        mover.style.boxShadow = `0 0 ${20 + Math.random()*40}px ${5 + Math.random()*15}px rgba(0,0,0,0.2)`;
        mover.style.transform = `rotate(${Math.floor(Math.random()*360)}deg) scale(${0.8 + Math.random()*0.8})`;
    }

    mover.addEventListener('click', moveAndColor);

    mover.addEventListener('mouseenter', () => {
        mover.style.transition = 'all 0.3s cubic-bezier(.68,-0.55,.27,1.55)';
        mover.style.transform = mover.style.transform.replace(/scale\([^)]+\)/, 'scale(1.2)');
    });
    mover.addEventListener('mouseleave', () => {
        mover.style.transition = 'all 0.7s cubic-bezier(.68,-0.55,.27,1.55)';
        mover.style.transform = mover.style.transform.replace(/scale\([^)]+\)/, 'scale(1)');
    });

    let intervalId = setInterval(moveAndColor, 1000);
    moveAndColor();

    mover.addEventListener('mouseenter', () => {
        clearInterval(intervalId);
    });
    mover.addEventListener('mouseleave', () => {
        intervalId = setInterval(moveAndColor, 1000);
    });

    window.addEventListener('resize', moveAndColor);
// ========== CHAT AI ASSISTANT ==========
const chatToggle = document.getElementById('chat-toggle');
const chatAssistant = document.getElementById('chat-assistant');
const chatForm = document.getElementById('chat-form');
const chatInput = document.getElementById('chat-input');
const chatMessages = document.getElementById('chat-messages');
const chatSpinner = document.getElementById('chat-spinner');

if (chatToggle && chatAssistant && chatForm && chatInput && chatMessages && chatSpinner) {
    // Toggle visibility
    chatToggle.addEventListener('click', () => {
        chatAssistant.style.display = chatAssistant.style.display === 'none' || chatAssistant.style.display === '' ? 'block' : 'none';
    });
document.getElementById('chat-toggle').addEventListener('click', () => {
  document.getElementById('chat-widget').style.display = 'block';
});

document.getElementById('chat-close').addEventListener('click', () => {
  document.getElementById('chat-widget').style.display = 'none';
});

    // Submit chat
    chatForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const userMsg = chatInput.value.trim();
        if (!userMsg) return;
        const userDiv = document.createElement('div');
        userDiv.className = 'chat-message user';
        userDiv.textContent = `You: ${userMsg}`;
        chatMessages.appendChild(userDiv);
        chatInput.value = '';
        chatMessages.scrollTop = chatMessages.scrollHeight;
        chatSpinner.classList.remove('hidden');

        // Fetch AI response from backend
        try {
            const response = await fetch('/api/ai-chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ prompt: userMsg })
            });
            const data = await response.json();
            const aiDiv = document.createElement('div');
            aiDiv.className = 'chat-message ai';
            aiDiv.textContent = `AI: ${data.response || data.error || 'Sorry, no response.'}`;
            chatMessages.appendChild(aiDiv);
            chatMessages.scrollTop = chatMessages.scrollHeight;
        } catch (err) {
            const aiDiv = document.createElement('div');
            aiDiv.className = 'chat-message ai';
            aiDiv.textContent = 'AI: Sorry, there was a problem contacting the AI.';
            chatMessages.appendChild(aiDiv);
        }
        chatSpinner.classList.add('hidden');
    });

    // Hide on click outside
    document.addEventListener('mousedown', (e) => {
        if (
            chatAssistant.style.display === 'block' &&
            !chatAssistant.contains(e.target) &&
            !chatToggle.contains(e.target)
        ) {
            chatAssistant.style.display = 'none';
        }
    });
}
document.getElementById('chat-toggle').addEventListener('click', () => {
  document.getElementById('chat-widget').style.display = 'flex';
});

document.getElementById('chat-close').addEventListener('click', () => {
  document.getElementById('chat-widget').style.display = 'none';
});

document.getElementById('chat-form').addEventListener('submit', (e) => {
  e.preventDefault();
  const input = document.getElementById('chat-input');
  const message = input.value.trim();
  if (!message) return;

  const messagesDiv = document.getElementById('chat-messages');
  const userMsg = document.createElement('div');
  userMsg.textContent = "You: " + message;
  messagesDiv.appendChild(userMsg);
  messagesDiv.scrollTop = messagesDiv.scrollHeight;

  input.value = "";

  // Here you can add logic to send to server/OpenAI and append AI reply
  const aiMsg = document.createElement('div');
  aiMsg.textContent = "AI: I'm here to help!";
  messagesDiv.appendChild(aiMsg);
  messagesDiv.scrollTop = messagesDiv.scrollHeight;
});
// ========== END CHAT AI ASSISTANT ==========
}
});