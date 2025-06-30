document.addEventListener('DOMContentLoaded', () => {
    // Create a moving, colorful, interactive div
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

    // Click to instantly move and change color
    mover.addEventListener('click', moveAndColor);

    // Hover to pulse
    mover.addEventListener('mouseenter', () => {
        mover.style.transition = 'all 0.3s cubic-bezier(.68,-0.55,.27,1.55)';
        mover.style.transform = mover.style.transform.replace(/scale\([^)]+\)/, 'scale(1.2)');
    });
    mover.addEventListener('mouseleave', () => {
        mover.style.transition = 'all 0.7s cubic-bezier(.68,-0.55,.27,1.55)';
        mover.style.transform = mover.style.transform.replace(/scale\([^)]+\)/, 'scale(1)');
    });

    // Move on interval
    let intervalId = setInterval(moveAndColor, 1000);
    moveAndColor();

    // Pause movement on hover, resume on leave
    mover.addEventListener('mouseenter', () => {
        clearInterval(intervalId);
    });
    mover.addEventListener('mouseleave', () => {
        intervalId = setInterval(moveAndColor, 1000);
    });

    // Responsive: move if window resizes
    window.addEventListener('resize', moveAndColor);
});