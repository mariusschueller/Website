const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particlesArray;

// Create a global mouse object
const mouse = {
    x: undefined,
    y: undefined,
    radius: 200 // particles within 200px will be attracted
};

window.addEventListener('mousemove', function(event) {
    mouse.x = event.x;
    mouse.y = event.y;
});

// Particle class
class Particle {
    constructor(x, y, directionX, directionY, size, color, directionSize) {
        this.x = x;
        this.y = y;
        this.directionX = directionX;
        this.directionY = directionY;
        this.size = size;
        this.color = color;
        this.directionSize = directionSize;
    }

    // Draw the particle
    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
        ctx.fillStyle = this.color;
        ctx.fill();
    }

    // Update particle position and add mouse attraction
    update() {
        // Bounce off canvas edges
        if (this.x > canvas.width || this.x < 0) {
            this.directionX = -this.directionX;
        }
        if (this.y > canvas.height || this.y < 0) {
            this.directionY = -this.directionY;
        }

        // Calculate the vector from the particle to the mouse
        let dx = mouse.x - this.x;
        let dy = mouse.y - this.y;
        let distance = Math.sqrt(dx * dx + dy * dy);

        // If the particle is within the mouse's influence radius, add a small acceleration toward the mouse
        if (distance < mouse.radius && distance > 0) {
            let acceleration = 0.05; // Adjust this value for stronger/weaker attraction
            // Normalize the vector (dx/distance, dy/distance) and apply the acceleration
            this.directionX += (dx / distance) * acceleration;
            this.directionY += (dy / distance) * acceleration;
        }

        else if (this.directionX > 4 || this.directionY > 4) {
            
            this.directionX *= .5;
            this.directionY *= .5;
        }

        // Move particle by adding velocity
        this.x += this.directionX;
        this.y += this.directionY;

        // Change particle size (growing and shrinking)
        if (this.directionSize) {
            this.size += 0.01;
        } else {
            this.size -= 0.01;
        }
        if (this.size >= 4 && this.directionSize) {
            this.directionSize = false;
        }
        if (this.size <= 0.5) {
            this.directionSize = true;
        }

        this.draw();
    }
}

// Create particles and store them in an array
function init() {
    particlesArray = [];
    let numberOfParticles = (canvas.height * canvas.width) / 10000;

    for (let i = 0; i < numberOfParticles; i++){
        let size = (Math.random() * 4) + 1;
        let x = (Math.random() * ((innerWidth - size * 2) - (size * 2)) + size * 2);
        let y = (Math.random() * ((innerHeight - size * 2) - (size * 2)) + size * 2);
        let directionX = (Math.random() * 2) - 1;
        let directionY = (Math.random() * 2) - 1;
        let color = '#FFFFFF';
        let directionSize = Math.random() < 0.5;

        particlesArray.push(new Particle(x, y, directionX, directionY, size, color, directionSize));
    }
}

// Draw lines between particles
function connect() {
    let opacityValue = 1;
    for (let a = 0; a < particlesArray.length; a++) {
        for (let b = a; b < particlesArray.length; b++) {
            let distance = ((particlesArray[a].x - particlesArray[b].x) ** 2) +
                           ((particlesArray[a].y - particlesArray[b].y) ** 2);
            
            if (distance < (canvas.width / 7) * (canvas.height / 7)) {
                opacityValue = 1 - (distance / 20000);
                ctx.strokeStyle = 'rgba(255,255,255,' + opacityValue + ')';
                ctx.lineWidth = 1;
                ctx.beginPath();
                ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
                ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
                ctx.stroke();
            }
        }
    }
}

// Animation loop
function animate() {
    requestAnimationFrame(animate);
    ctx.clearRect(0, 0, innerWidth, innerHeight);
    
    // Set global opacity for a trailing effect
    ctx.globalAlpha = 0.4;
    for (let i = 0; i < particlesArray.length; ++i){
        particlesArray[i].update();
    }
    connect();
    ctx.globalAlpha = 1.0;
}

window.addEventListener('resize', function(){
    canvas.width = innerWidth;
    canvas.height = innerHeight;
    init();
});

init();
animate();
