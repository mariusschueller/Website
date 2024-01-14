const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext('2d')
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particlesArray;

//particle class
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

    //draws each individual particle
    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
        ctx.fillStyle = this.color; // What color is this?
        ctx.fill();
    }

    update() {
        if (this.x > canvas.width || this.x < 0){
            this.directionX = -this.directionX;
        }
        if (this.y > canvas.height || this.y < 0){
            this.directionY = -this.directionY;
        }

        // move particle
        this.x += this.directionX;
        this.y += this.directionY;

        // change size
        if (this.directionSize){
            this.size += 0.01;
        }
        else{
            this.size -= 0.01;
        }

        if (this.size >= 4 && this.directionSize){
            this.directionSize = false;
        }

        //respawn if particle is too small
        if (this.size <= 0.5){
            // this.x = Math.random() * (innerWidth - this.size * 2) + this.size;
            // this.y = Math.random() * (innerHeight - this.size * 2) + this.size;
            this.directionSize = true;
        }

        

        // draw particle
        this.draw();
    }
}

// create particle array
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

// draw lines between particles
function connect() {
    let opacityValue = 1;

    for (let a = 0; a < particlesArray.length; a++) {
        for (let b = a; b < particlesArray.length; b++) {
            let distance = ((particlesArray[a].x - particlesArray[b].x) * (particlesArray[a].x - particlesArray[b].x)) + ((particlesArray[a].y - particlesArray[b].y) * (particlesArray[a].y - particlesArray[b].y));
            
            
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


function animate() {
    requestAnimationFrame(animate);
    ctx.clearRect(0,0, innerWidth, innerHeight);
    
    // changes opacity for the screen
    ctx.globalAlpha = 0.3;

    for (let i = 0; i < particlesArray.length; ++i){
        particlesArray[i].update();
    }
    connect();

    ctx.globalAlpha = 1.0;
}

window.addEventListener('resize',
    function(){
        canvas.width = this.innerWidth;
        canvas.height = this.innerHeight;
        init();
    }
);

init();
animate();