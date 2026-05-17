/**
 * 分析加载页逻辑 - 伪科学仪式感拉满
 */

const analysisModules = [
    { label: 'COGNITIVE_PATTERN_ANALYSIS', target: 97 },
    { label: 'EMOTIONAL_RESIDUE_DETECTION', target: 84 },
    { label: 'BEHAVIORAL_PREDICTION_MATRIX', target: 91 },
    { label: 'NEURAL_PATHWAY_MAPPING', target: 76 },
    { label: 'SUBCONSCIOUS_BIAS_EXTRACTION', target: 88 },
    { label: 'QUANTUM_PERSONALITY_COLLAPSE', target: 99 },
];

const terminalMessages = [
    { text: '> 正在建立神经接口...', type: 'processing', delay: 200 },
    { text: '> 检测到8组认知信号输入', type: 'success', delay: 600 },
    { text: '> 初始化深度学习模型 v9.2.1...', type: 'processing', delay: 1100 },
    { text: '> 加载行为数据库 [9,847,231 条记录]', type: 'success', delay: 1600 },
    { text: '> 警告: 检测到非典型思维模式', type: 'warning', delay: 2200 },
    { text: '> 正在计算人格原型坐标...', type: 'processing', delay: 2800 },
    { text: '> 交叉验证多维度人格参数', type: 'processing', delay: 3400 },
    { text: '> 执行ISO-9001伪心理学标准校验', type: 'success', delay: 4000 },
    { text: '> 发现异常人格聚类!', type: 'warning', delay: 4700 },
    { text: '> 重新校准分析算法...', type: 'processing', delay: 5200 },
    { text: '> 匹配度计算完成', type: 'success', delay: 5800 },
    { text: '> 正在生成人格报告...', type: 'processing', delay: 6400 },
    { text: '> 加密传输至第7维度服务器', type: 'success', delay: 7000 },
    { text: '> 分析完成。准备呈现结果。', type: 'success', delay: 7600 },
];

let progress = 0;
let targetProgress = 100;

function initAnalysisGrid() {
    const grid = document.getElementById('analysis-grid');
    analysisModules.forEach((mod, idx) => {
        const item = document.createElement('div');
        item.className = 'analysis-item';
        item.innerHTML = `
            <div class="item-label">${mod.label}</div>
            <div class="item-bar">
                <div class="item-bar-fill" id="bar-${idx}"></div>
            </div>
            <div class="item-value" id="val-${idx}">0%</div>
        `;
        grid.appendChild(item);
    });
}

function updateBars() {
    analysisModules.forEach((mod, idx) => {
        const fill = document.getElementById(`bar-${idx}`);
        const val = document.getElementById(`val-${idx}`);
        if (!fill || !val) return;

        const current = parseInt(val.textContent);
        if (current < mod.target) {
            const next = Math.min(current + Math.floor(Math.random() * 5) + 1, mod.target);
            fill.style.width = next + '%';
            val.textContent = next + '%';
        }
    });
}

function addTerminalMessage(msg, type) {
    const log = document.getElementById('terminal-log');
    const line = document.createElement('div');
    line.className = `log-line ${type}`;
    line.textContent = msg;
    log.appendChild(line);
    log.scrollTop = log.scrollHeight;
}

function updateProgressRing() {
    const circle = document.getElementById('progress-circle');
    const percent = document.getElementById('scan-percent');
    const circumference = 2 * Math.PI * 90;
    const offset = circumference - (progress / 100) * circumference;
    
    circle.style.strokeDashoffset = offset;
    percent.textContent = Math.floor(progress) + '%';
}

function startAnalysis() {
    initAnalysisGrid();

    // 进度条动画
    const progressInterval = setInterval(() => {
        if (progress >= targetProgress) {
            clearInterval(progressInterval);
            setTimeout(() => {
                document.body.classList.add('fade-out');
                setTimeout(() => {
                    window.location.href = 'result.html';
                }, 800);
            }, 500);
            return;
        }

        // 非线性增长，前期快后期慢
        const remaining = targetProgress - progress;
        const increment = remaining > 30 ? Math.random() * 3 + 1 : Math.random() * 1.5 + 0.3;
        progress = Math.min(progress + increment, targetProgress);
        updateProgressRing();
        updateBars();
    }, 80);

    // 终端日志
    terminalMessages.forEach(msg => {
        setTimeout(() => {
            addTerminalMessage(msg.text, msg.type);
        }, msg.delay);
    });
}

// 启动
document.addEventListener('DOMContentLoaded', startAnalysis);
