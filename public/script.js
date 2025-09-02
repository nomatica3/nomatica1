document.addEventListener('DOMContentLoaded', () => {
  // Sidebar toggle
  const sidebar = document.getElementById('sidebarMenu');
  const toggleBtn = document.getElementById('sidebarToggle');
  const mainContent = document.querySelector('.main-content');

  if (toggleBtn && sidebar) {
    sidebar.classList.add('hidden');
    toggleBtn.textContent = '☰';
    document.body.style.paddingLeft = '0';

    toggleBtn.addEventListener('click', () => {
      sidebar.classList.toggle('hidden');
      const isHidden = sidebar.classList.contains('hidden');
      document.body.style.paddingLeft = isHidden ? '0' : '220px';
      mainContent.classList.toggle('shifted', !isHidden);
    });
  }

  // Main chat form (/api/openai)
  const form = document.getElementById('chat-form');
  const userInput = document.getElementById('user-input');
  const responseContainer = document.getElementById('response-container');

  if (form && userInput && responseContainer) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const message = userInput.value.trim();
      if (!message) return;

      responseContainer.innerHTML = `<p><strong>You:</strong> ${message}</p><p><em>Thinking...</em></p>`;

      try {
        const res = await fetch('/api/openai', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ message })
        });

        const data = await res.json();
        responseContainer.innerHTML = `
          <p><strong>You:</strong> ${message}</p>
          <p><strong>Assistant:</strong> ${data.response}</p>
        `;
        userInput.value = '';
      } catch (error) {
        console.error(error);
        responseContainer.innerHTML = `<p class="text-danger">Error: Something went wrong.</p>`;
      }
    });
  }

  // Multi-model chat
  const modelSelect = document.getElementById('model-selector');
  const sendBtn = document.getElementById('send-btn');
  const chatBox = document.getElementById('chat-box');

  if (sendBtn && modelSelect && chatBox && userInput) {
    sendBtn.addEventListener('click', async () => {
      const prompt = userInput.value.trim();
      const model = modelSelect.value;
      if (!prompt) return;

      chatBox.innerHTML += `<p><strong>You:</strong> ${prompt}</p><p><em>${model} thinking...</em></p>`;

      try {
        const res = await fetch(`/chat/${model}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ prompt })
        });

        const data = await res.json();
        chatBox.innerHTML += `<p><strong>${model}:</strong> ${data.reply}</p>`;
        userInput.value = '';
      } catch (err) {
        console.error(err);
        chatBox.innerHTML += `<p class="text-danger">${model} failed to respond.</p>`;
      }
    });
  }

  // Admin broadcast
  const updateBtn = document.getElementById('update-btn');
  if (updateBtn) {
    updateBtn.addEventListener('click', async () => {
      const update = prompt("Broadcast message to all models:");
      if (!update) return;

      try {
        const res = await fetch('/admin/update', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ update })
        });
        const result = await res.json();
        alert("Update complete:\n" + JSON.stringify(result, null, 2));
      } catch (err) {
        alert("Update failed.");
        console.error(err);
      }
    });
  }

  // Model card clicks
  const buttons = document.querySelectorAll(".model-card .btn");

  buttons.forEach(button => {
    button.addEventListener("click", async (e) => {
      e.preventDefault();
      const modelName = button.href.split("/").pop();  // gemma, llama, etc.

      const userMessage = prompt(`Ask something to ${modelName.toUpperCase()} AI:`);

      if (userMessage) {
        try {
          const response = await fetch(`/api/chat/${modelName}`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({ message: userMessage })
          });

          const data = await response.json();
          alert(`${modelName.toUpperCase()} says: ${data.reply}`);
        } catch (err) {
          console.error(err);
          alert(`${modelName.toUpperCase()} failed to respond.`);
        }
      }
    });
  });
});