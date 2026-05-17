/**
 * 测试题逻辑
 */

// 题目数据库
const questions = [
    {
        text: "当你收到一条消息写着'在吗'而没有下文时，你的第一反应是？",
        options: [
            { text: "立即回复'在'，然后焦虑地等待对方继续", code: "I" },
            { text: "假装没看到，等对方说明来意再决定", code: "S" },
            { text: "直接回复'不在'，结束这场社交博弈", code: "M" },
            { text: "截图发朋友圈吐槽这种沟通方式", code: "B" }
        ]
    },
    {
        text: "周五晚上23:00，你发现自己还在刷手机，你会？",
        options: [
            { text: "再看5分钟... 再看5分钟...", code: "I" },
            { text: "突然焦虑，开始搜索'熬夜的危害'", code: "S" },
            { text: "心安理得，反正明天也不用早起", code: "M" },
            { text: "设了7个闹钟然后继续刷", code: "B" }
        ]
    },
    {
        text: "面对一个复杂的问题，你的解决路径通常是？",
        options: [
            { text: "先做一份精美的思维导图，然后放弃", code: "I" },
            { text: "问AI，复制答案，假装自己懂了", code: "S" },
            { text: "把问题拆成 smaller problems，然后更焦虑了", code: "M" },
            { text: "睡一觉，希望问题自己消失", code: "B" }
        ]
    },
    {
        text: "在群体聚餐时，你通常扮演的角色是？",
        options: [
            { text: "埋头干饭，偶尔附和两句", code: "I" },
            { text: "负责点菜但永远说'随便'", code: "S" },
            { text: "活跃气氛，回家后悔说了太多", code: "M" },
            { text: "找理由不去，在家点外卖", code: "B" }
        ]
    },
    {
        text: "你的手机相册里最多的一类照片是？",
        options: [
            { text: "各种截图（优惠券/段子/聊天记录）", code: "I" },
            { text: "拍了但从没二次查看的风景照", code: "S" },
            { text: "奇奇怪怪的meme和表情包", code: "M" },
            { text: "身份证/证件/各种密码的备忘照片", code: "B" }
        ]
    },
    {
        text: "当计划突然被打乱时，你的内心OS是？",
        options: [
            { text: "表面：没事~ 内心：整个世界崩塌了", code: "I" },
            { text: "迅速制定B计划C计划D计划", code: "S" },
            { text: "太好了，反正我也不想执行原计划", code: "M" },
            { text: "先躺平，等问题自己解决", code: "B" }
        ]
    },
    {
        text: "你更相信自己的？",
        options: [
            { text: "直觉（虽然它经常出错）", code: "I" },
            { text: "逻辑（虽然经常想太多）", code: "S" },
            { text: "运气（虽然从未中奖）", code: "M" },
            { text: "小红书/知乎/抖音的专家", code: "B" }
        ]
    },
    {
        text: "如果人生是一款游戏，你的状态面板最可能是？",
        options: [
            { text: "体力值很低，但熬夜属性点满", code: "I" },
            { text: "技能很多，但蓝条永远不够", code: "S" },
            { text: "幸运值？？？，其他平均", code: "M" },
            { text: "加载中... 请稍后再试", code: "B" }
        ]
    }
];

// 状态
let currentQ = 0;
let answers = [];

// 生成随机ID
function generateSubjectId() {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let id = 'ANX-';
    for (let i = 0; i < 4; i++) id += chars[Math.floor(Math.random() * chars.length)];
    id += '-';
    for (let i = 0; i < 2; i++) id += chars[Math.floor(Math.random() * chars.length)];
    return id;
}

// 更新进度
function updateProgress() {
    const fill = document.getElementById('progress-fill');
    const text = document.getElementById('progress-text');
    const current = document.getElementById('q-current');
    const pct = ((currentQ + 1) / questions.length) * 100;
    
    fill.style.width = pct + '%';
    text.textContent = `${currentQ + 1} / ${questions.length}`;
    current.textContent = String(currentQ + 1).padStart(2, '0');
}

// 渲染题目
function renderQuestion() {
    const q = questions[currentQ];
    const qText = document.getElementById('question-text');
    const optsDiv = document.getElementById('options');
    const card = document.getElementById('question-card');
    
    // 退出动画
    card.style.opacity = '0';
    card.style.transform = 'translateX(-30px)';
    
    setTimeout(() => {
        qText.textContent = q.text;
        optsDiv.innerHTML = '';
        
        q.options.forEach((opt, idx) => {
            const btn = document.createElement('button');
            btn.className = 'option-btn';
            btn.style.animationDelay = `${idx * 0.1}s`;
            btn.innerHTML = `
                <span class="opt-label">${String.fromCharCode(65 + idx)}</span>
                <span class="opt-text">${opt.text}</span>
            `;
            btn.onclick = () => selectOption(opt.code);
            optsDiv.appendChild(btn);
        });
        
        updateProgress();
        
        // 入场动画
        card.style.transition = 'all 0.5s ease';
        card.style.opacity = '1';
        card.style.transform = 'translateX(0)';
    }, 300);
}

// 选择选项
function selectOption(code) {
    answers.push(code);
    
    // 添加日志
    addLog(`> 接收到神经信号... 模式识别: [${code}]`);
    
    if (currentQ < questions.length - 1) {
        currentQ++;
        renderQuestion();
    } else {
        finishQuiz();
    }
}

// 完成测试
function finishQuiz() {
    document.body.classList.add('fade-out');
    setTimeout(() => {
        window.location.href = 'analyzing.html';
    }, 800);
}

// 系统日志
function addLog(msg) {
    const log = document.getElementById('system-log');
    log.textContent = msg;
    log.style.animation = 'none';
    setTimeout(() => log.style.animation = '', 10);
}

// 脑波监测动画
function initBrainwaveMonitor() {
    const waveCanvas = document.getElementById('wave-canvas');
    if (!waveCanvas) return;
    
    const wctx = waveCanvas.getContext('2d');
    let waveOffset = 0;
    
    function drawWave() {
        wctx.clearRect(0, 0, 300, 60);
        wctx.strokeStyle = 'rgba(0, 240, 255, 0.6)';
        wctx.lineWidth = 1.5;
        
        wctx.beginPath();
        for (let x = 0; x < 300; x++) {
            const y = 30 + 
                Math.sin((x + waveOffset) * 0.05) * 10 +
                Math.sin((x + waveOffset * 1.5) * 0.03) * 8 +
                Math.sin((x + waveOffset * 0.7) * 0.08) * 5;
            if (x === 0) wctx.moveTo(x, y);
            else wctx.lineTo(x, y);
        }
        wctx.stroke();
        
        waveOffset += 2;
        requestAnimationFrame(drawWave);
    }
    
    drawWave();
    
    // 更新脑波数值
    setInterval(() => {
        const alpha = document.getElementById('alpha-wave');
        const beta = document.getElementById('beta-wave');
        const gamma = document.getElementById('gamma-wave');
        
        if (alpha) alpha.textContent = (8 + Math.random() * 4).toFixed(1) + ' Hz';
        if (beta) beta.textContent = (15 + Math.random() * 15).toFixed(1) + ' Hz';
        if (gamma) gamma.textContent = (30 + Math.random() * 20).toFixed(1) + ' Hz';
    }, 800);
}

// 初始化
document.addEventListener('DOMContentLoaded', () => {
    const subId = document.getElementById('subject-id');
    if (subId) subId.textContent = generateSubjectId();
    
    renderQuestion();
    initBrainwaveMonitor();
});
