/**
 * 主逻辑脚本
 */

// 时钟更新
function updateClock() {
    const now = new Date();
    const timeStr = now.toTimeString().slice(0, 8);
    const clockEl = document.getElementById('clock');
    if (clockEl) clockEl.textContent = timeStr;
}

setInterval(updateClock, 1000);
updateClock();

// 进入测试页面
function enterQuiz() {
    document.body.classList.add('fade-out');
    setTimeout(() => {
        window.location.href = 'quiz.html';
    }, 800);
}

// 打字机效果
function typeWriter(element, text, speed = 50) {
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

// 页面加载时的入场动画
document.addEventListener('DOMContentLoaded', () => {
    const hero = document.querySelector('.hero');
    if (hero) {
        hero.style.opacity = '0';
        hero.style.transform = 'translateY(30px)';
        
        setTimeout(() => {
            hero.style.transition = 'all 1s ease';
            hero.style.opacity = '1';
            hero.style.transform = 'translateY(0)';
        }, 300);
    }
});
