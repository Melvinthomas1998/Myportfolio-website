// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Interactive Flow Cytometry Scatter Plot Background
const canvas = document.getElementById('flow-canvas');
const ctx = canvas.getContext('2d');

let width, height;
let particles = [];
const mouse = { x: null, y: null, radius: 100 };

// Colors representing different fluorescent dyes
const colors = [
    'rgba(57, 255, 20, 0.7)',   // FITC Green
    'rgba(255, 115, 0, 0.7)',   // PE Orange
    'rgba(255, 0, 60, 0.7)',    // APC Red
    'rgba(0, 243, 255, 0.7)'    // Cy5 Cyan
];

function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
}
window.addEventListener('resize', resize);
resize();

window.addEventListener('mousemove', (e) => {
    mouse.x = e.x;
    mouse.y = e.y;
});

class Particle {
    constructor() {
        // Create clusters by heavily weighting coordinates towards certain points
        let cluster = Math.floor(Math.random() * 4);
        let centerX, centerY;
        
        switch(cluster) {
            case 0: centerX = width * 0.2; centerY = height * 0.3; break;
            case 1: centerX = width * 0.8; centerY = height * 0.4; break;
            case 2: centerX = width * 0.4; centerY = height * 0.8; break;
            case 3: centerX = width * 0.7; centerY = height * 0.7; break;
        }

        // Add some random spread around the cluster center
        let spreadX = (Math.random() - 0.5) * (width * 0.4);
        let spreadY = (Math.random() - 0.5) * (height * 0.4);

        this.x = centerX + spreadX;
        this.y = centerY + spreadY;
        
        // Keep particles within bounds
        if (this.x < 0) this.x = Math.random() * width;
        if (this.x > width) this.x = Math.random() * width;
        if (this.y < 0) this.y = Math.random() * height;
        if (this.y > height) this.y = Math.random() * height;

        this.size = Math.random() * 2 + 0.5;
        this.baseX = this.x;
        this.baseY = this.y;
        this.density = (Math.random() * 30) + 1;
        this.color = colors[cluster];
        
        // Very slow movement, like particles in a steady flow
        this.vx = (Math.random() - 0.5) * 0.2;
        this.vy = (Math.random() - 0.5) * 0.2;
    }

    update() {
        this.x += this.vx;
        this.y += this.vy;

        // Bounce off edges
        if (this.x < 0 || this.x > width) {
            this.vx *= -1;
            this.baseX = this.x;
        }
        if (this.y < 0 || this.y > height) {
            this.vy *= -1;
            this.baseY = this.y;
        }

        // Mouse interaction (repel)
        let dx = mouse.x - this.x;
        let dy = mouse.y - this.y;
        let distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < mouse.radius) {
            let forceDirectionX = dx / distance;
            let forceDirectionY = dy / distance;
            let force = (mouse.radius - distance) / mouse.radius;
            let directionX = forceDirectionX * force * this.density;
            let directionY = forceDirectionY * force * this.density;
            
            this.x -= directionX;
            this.y -= directionY;
        } else {
            // Slowly return to base position if moved by mouse
            if (this.x !== this.baseX) {
                let dx = this.x - this.baseX;
                this.x -= dx / 100;
            }
            if (this.y !== this.baseY) {
                let dy = this.y - this.baseY;
                this.y -= dy / 100;
            }
        }
    }

    draw() {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.closePath();
        ctx.fill();
    }
}

function init() {
    particles = [];
    // Many particles to simulate flow cytometry events (e.g. 500-1000)
    let numberOfParticles = Math.min((width * height) / 3000, 1000);
    for (let i = 0; i < numberOfParticles; i++) {
        particles.push(new Particle());
    }
}

function animate() {
    ctx.clearRect(0, 0, width, height);
    for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw();
    }
    requestAnimationFrame(animate);
}

init();
animate();
