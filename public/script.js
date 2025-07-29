document.addEventListener('DOMContentLoaded', () => {
  // MOVING COLORFUL DIV
  //const mover = document.createElement('div');
  //mover.style.position = 'fixed';
  //mover.style.width = '100px';
  //mover.style.height = '100px';
  //mover.style.borderRadius = '50%';
  //mover.style.background = 'linear-gradient(45deg, red, yellow, green, blue)';
  //mover.style.transition = 'all 0.7s cubic-bezier(.68,-0.55,.27,1.55)';
  //mover.style.zIndex = 9999;
  //mover.style.boxShadow = '0 0 30px 10px rgba(0,0,0,0.2)';
  //document.body.appendChild(mover);
  //console.log('script.js loaded');


  //function randomGradient() {
    //const stops = Array.from({length: 3 + Math.floor(Math.random() * 3)}, () =>
      //`hsl(${Math.floor(Math.random() * 360)}, 80%, 60%)`
    //);
    //return `linear-gradient(${Math.floor(Math.random()*360)}deg, ${stops.join(', ')})`;
  //}
//mover.addEventListener('click', moveAndColor);
  //let intervalId = setInterval(moveAndColor, 1000);

  //mover.addEventListener('mouseenter', () => clearInterval(intervalId));
  //mover.addEventListener('mouseleave', () => intervalId = setInterval(moveAndColor, 1000));

  //window.addEventListener('resize', moveAndColor);

document.addEventListener('DOMContentLoaded', () => {
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

  const form = document.getElementById('chat-form');
  const userInput = document.getElementById('user-input');
  const responseContainer = document.getElementById('response-container');

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
 // === MULTI-MODEL CHAT ===
  const modelSelect = document.getElementById('model-selector');
  const sendBtn = document.getElementById('send-btn');
  const chatBox = document.getElementById('chat-box');

  if (sendBtn && modelSelect && chatBox) {
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

  // === ADMIN BROADCAST TO ALL MODELS ===
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
          console.error(err);
        }
      });
    }
    }
  });