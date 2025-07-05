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

  // Fetch AI response from OpenAI backend
  const aiMsg = document.createElement('div');
  aiMsg.textContent = "AI: ...";
  messagesDiv.appendChild(aiMsg);
  messagesDiv.scrollTop = messagesDiv.scrollHeight;

  fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      // Replace 'YOUR_OPENAI_API_KEY' with your actual OpenAI API key
      'Authorization': 'Bearer YOUR_OPENAI_API_KEY'
    },
    body: JSON.stringify({
      model: 'gpt-3.5-turbo',
      messages: [
        { role: 'system', content: 'You are a helpful assistant.' },
        { role: 'user', content: message }
      ]
    })
  })
    .then(res => res.json())
    .then(data => {
      const aiResponse = data.choices && data.choices[0] && data.choices[0].message && data.choices[0].message.content
        ? data.choices[0].message.content.trim()
        : (data.error && data.error.message) || "Sorry, no response.";
      aiMsg.textContent = "AI: " + aiResponse;
      messagesDiv.scrollTop = messagesDiv.scrollHeight;
    })
    .catch(() => {
      aiMsg.textContent = "AI: Sorry, there was a problem contacting the AI.";
      messagesDiv.scrollTop = messagesDiv.scrollHeight;
    });
});
// ========== END CHAT AI ASSISTANT ==========
}
});
<script>
  const toggleBtn = document.getElementById('sidebarToggle');
  const sidebar = document.getElementById('sidebarMenu');

  toggleBtn.addEventListener('click', () => {
    sidebar.classList.toggle('active');
  });
</script>
// ========== RESPONSIVE DESIGN FOR SIDEBAR ==========
async function sendToCAPS() {
  const input = document.getElementById('userMessage').value.trim();
  if (!input) return;

  document.getElementById('chatResponse').innerText = 'Processing...';

  const res = await fetch('/api/caps', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ query: input })
  });

  const data = await res.json();
  document.getElementById('chatResponse').innerText = data.response;
}


// ========== END RESPONSIVE DESIGN FOR SIDEBAR ==========
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

<script>
  document.addEventListener('DOMContentLoaded', function () {
    const toggleBtn = document.getElementById('sidebarToggle');
    const sidebar = document.getElementById('sidebarMenu');

    if (toggleBtn && sidebar) {
      toggleBtn.addEventListener('click', function () {
        sidebar.classList.toggle('active');
        if (sidebar.classList.contains('active')) {
          toggleBtn.textContent = '✖ Close Sidebar';
        } else {
          toggleBtn.textContent = '☰ Open Sidebar';
        }
      });
    }
  });
</script>
document.getElementById('sidebarToggle').addEventListener('click', function() {
  document.getElementById('sidebarMenu').classList.toggle('active');
});
