/**
 * 结果页逻辑
 */

const funnyNames = [
    "I'm Something Beautiful",
    "I'm Surely Brilliant",
    "I'm So Blessed",
    "I'm Spectacularly Bananas",
];

function typeWriterEffect(element, text, speed = 80) {
    let i = 0;
    element.textContent = '';
    
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// 简单的纸屑效果
function createConfetti() {
    const container = document.getElementById('confetti');
    const colors = ['#00f0ff', '#ff00a0', '#ffe600', '#fff'];
    
    for (let i = 0; i < 50; i++) {
        setTimeout(() => {
            const conf = document.createElement('div');
            conf.style.cssText = `
                position: absolute;
                width: ${Math.random() * 8 + 4}px;
                height: ${Math.random() * 8 + 4}px;
                background: ${colors[Math.floor(Math.random() * colors.length)]};
                left: ${Math.random() * 100}%;
                top: -10px;
                border-radius: ${Math.random() > 0.5 ? '50%' : '2px'};
                opacity: ${Math.random() * 0.5 + 0.3};
                pointer-events: none;
            `;
            
            container.appendChild(conf);
            
            // 下落动画
            const duration = Math.random() * 3000 + 2000;
            const drift = (Math.random() - 0.5) * 200;
            
            conf.animate([
                { transform: 'translate(0, 0) rotate(0deg)', opacity: 1 },
                { transform: `translate(${drift}px, 100vh) rotate(${Math.random() * 720}deg)`, opacity: 0 }
            ], {
                duration: duration,
                easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
            }).onfinish = () => conf.remove();
        }, i * 80);
    }
}

function animateNumbers() {
    const rare = document.getElementById('stat-rare');
    const match = document.getElementById('stat-match');
    
    // 100% 数字动画
    let num = 0;
    const numInterval = setInterval(() => {
        num += Math.random() * 5;
        if (num >= 100) {
            num = 100;
            clearInterval(numInterval);
        }
        rare.textContent = Math.floor(num) + '%';
    }, 30);
}

function shareResult() {
    const text = `我在 Archetype Nexus 人格测试中获得了 IMSB 人格！\n\nI - 内向 (Introverted)\nM - 迷茫 (Muddled)\nS - 社恐 (Socialphobic)\nB - 摆烂 (Bailing)\n\n100% 的测试者都是这个类型，快来测测你是不是 IMSB → `;
    
    if (navigator.share) {
        navigator.share({
            title: '我是 IMSB 人格！',
            text: text,
            url: window.location.href
        }).catch(() => {});
    } else if (navigator.clipboard) {
        navigator.clipboard.writeText(text + window.location.href).then(() => {
            alert('结果已复制到剪贴板！快去分享给你的 IMSB 朋友们吧~');
        });
    } else {
        alert('复制以下内容分享:\n\n' + text);
    }
}

function retake() {
    document.body.classList.add('fade-out');
    setTimeout(() => {
        window.location.href = 'index.html';
    }, 800);
}

// 初始化
document.addEventListener('DOMContentLoaded', () => {
    const resultName = document.getElementById('result-name');
    const randomName = funnyNames[Math.floor(Math.random() * funnyNames.length)];
    
    setTimeout(() => {
        typeWriterEffect(resultName, randomName, 60);
    }, 500);
    
    setTimeout(() => {
        createConfetti();
    }, 1200);
    
    animateNumbers();
});
