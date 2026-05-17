/**
 * 背景粒子系统 - 科技感神经网络效果
 */

const canvas = document.getElementById('bg-canvas');
const ctx = canvas.getContext('2d');

let width, height;
let particles = [];
let mouse = { x: null, y: null };

// 配置参数
const config = {
    particleCount: 80,
    connectionDistance: 180,
    mouseDistance: 250,
    particleSpeed: 0.3,
    colors: [
        'rgba(0, 240, 255, ',    // 青色
        'rgba(255, 0, 160, ',    // 粉色
        'rgba(255, 230, 0, ',    // 黄色
    ]
};

// 调整画布大小
function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
}

// 粒子类
class Particle {
    constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.vx = (Math.random() - 0.5) * config.particleSpeed;
        this.vy = (Math.random() - 0.5) * config.particleSpeed;
        this.radius = Math.random() * 2 + 1;
        this.colorIdx = Math.floor(Math.random() * config.colors.length);
        this.alpha = Math.random() * 0.5 + 0.3;
    }

    update() {
        // 基础移动
        this.x += this.vx;
        this.y += this.vy;

        // 边界反弹
        if (this.x < 0 || this.x > width) this.vx *= -1;
        if (this.y < 0 || this.y > height) this.vy *= -1;

        // 鼠标交互
        if (mouse.x !== null && mouse.y !== null) {
            const dx = mouse.x - this.x;
            const dy = mouse.y - this.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            
            if (dist < config.mouseDistance) {
                const force = (config.mouseDistance - dist) / config.mouseDistance;
                this.vx += (dx / dist) * force * 0.02;
                this.vy += (dy / dist) * force * 0.02;
            }
        }

        // 速度衰减
        this.vx *= 0.99;
        this.vy *= 0.99;
        
        // 保持最小速度
        const speed = Math.sqrt(this.vx * this.vx + this.vy * this.vy);
        if (speed < 0.1) {
            this.vx += (Math.random() - 0.5) * 0.05;
            this.vy += (Math.random() - 0.5) * 0.05;
        }
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = config.colors[this.colorIdx] + this.alpha + ')';
        ctx.fill();
    }
}

// 绘制连线
function drawConnections() {
    for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
            const dx = particles[i].x - particles[j].x;
            const dy = particles[i].y - particles[j].y;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist < config.connectionDistance) {
                const alpha = (1 - dist / config.connectionDistance) * 0.3;
                ctx.beginPath();
                ctx.moveTo(particles[i].x, particles[i].y);
                ctx.lineTo(particles[j].x, particles[j].y);
                ctx.strokeStyle = `rgba(0, 240, 255, ${alpha})`;
                ctx.lineWidth = 0.5;
                ctx.stroke();
            }
        }
    }
}

// 初始化粒子
function init() {
    resize();
    particles = [];
    for (let i = 0; i < config.particleCount; i++) {
        particles.push(new Particle());
    }
}

// 动画循环
function animate() {
    ctx.fillStyle = 'rgba(5, 5, 8, 0.1)';
    ctx.fillRect(0, 0, width, height);

    particles.forEach(p => {
        p.update();
        p.draw();
    });

    drawConnections();
    requestAnimationFrame(animate);
}

// 事件监听
window.addEventListener('resize', () => {
    resize();
    init();
});

window.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
});

window.addEventListener('mouseleave', () => {
    mouse.x = null;
    mouse.y = null;
});

// 启动
init();
animate();
