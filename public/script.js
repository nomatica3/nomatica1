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

  // SIDEBAR TOGGLE
document.addEventListener('DOMContentLoaded', () => {
  const toggleBtn = document.getElementById('sidebarToggle');
  const sidebar = document.getElementById('sidebarMenu');

  // Initially ensure the sidebar is closed
  if (sidebar && !sidebar.classList.contains('active')) {
    sidebar.classList.remove('active');
    toggleBtn.textContent = '☰';
    document.body.style.paddingLeft = '0';
  }

  // Toggle button behavior
  if (toggleBtn && sidebar) {
    toggleBtn.addEventListener('click', () => {
      sidebar.classList.toggle('active');
      toggleBtn.textContent = sidebar.classList.contains('active') ? '✖' : '☰';
      document.body.style.paddingLeft = sidebar.classList.contains('active') ? '220px' : '0';
    });
  }
});
  // AI Chat functionality
  document.querySelector("#send-button").addEventListener("click", async () => {
  const input = document.querySelector("#message-input").value;

  const response = await fetch("/api/openai", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ message: input })
  });

  const data = await response.json();
  document.querySelector("#response").textContent = data.response;
});
});
