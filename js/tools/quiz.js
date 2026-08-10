// Modul Subnetting Practice & Networking Quiz
function renderQuizModule(container) {
    container.innerHTML = `
        <div class="tool-card">
            <h2>TJKT Practice & Quiz</h2>
            <p class="tool-desc">Uji kemampuan dan latihan soal seputar subnetting serta konsep jaringan komputer.</p>
            
            <div class="converter-tabs" style="display: flex; gap: 0.5rem; margin-bottom: 1.5rem; flex-wrap: wrap;">
                <button class="btn-outline quiz-tab-btn active" data-target="practice-subnet">Latihan Subnetting</button>
                <button class="btn-outline quiz-tab-btn" data-target="quiz-net">Kuis Jaringan & OSI</button>
            </div>

            <div id="practice-subnet" class="quiz-panel">
                <h3>Generator Soal Subnetting</h3>
                <p style="color: var(--text-secondary); font-size: 0.9rem; margin-bottom: 1rem;">Latih kemampuan analisis IP dan CIDR Anda secara acak.</p>
                <button id="gen-subnet-question" class="btn-primary">Generate Soal Baru</button>
                
                <div id="subnet-question-box" class="hidden" style="margin-top: 1.5rem; background: var(--bg-color); padding: 1rem; border-radius: var(--radius); border: 1px solid var(--border-color);">
                    <p id="question-text" style="font-weight: bold; margin-bottom: 1rem;"></p>
                    <div class="form-group">
                        <label for="user-answer-input">Jawaban Anda:</label>
                        <input type="text" id="user-answer-input" placeholder="Masukkan jawaban...">
                    </div>
                    <button id="check-subnet-answer" class="btn-primary">Periksa Jawaban</button>
                    <div id="subnet-feedback" style="margin-top: 1rem; font-weight: bold;"></div>
                </div>
            </div>

            <div id="quiz-net" class="quiz-panel hidden">
                <h3>Kuis Pilihan Ganda TJKT</h3>
                <div id="mcq-container">
                    <p style="color: var(--text-secondary);">Mulai kuis untuk menguji pemahaman teori jaringan (OSI Layer, TCP/IP, Protokol).</p>
                    <button id="start-mcq-btn" class="btn-primary" style="margin-top: 1rem;">Mulai Kuis</button>
                </div>
                <div id="mcq-question-area" class="hidden" style="margin-top: 1rem;"></div>
            </div>
        </div>
    `;

    // Tab Switching
    const tabBtns = container.querySelectorAll('.quiz-tab-btn');
    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            tabBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            const targetId = btn.getAttribute('data-target');
            container.querySelectorAll('.quiz-panel').forEach(panel => {
                panel.classList.add('hidden');
            });
            container.querySelector(`#${targetId}`).classList.remove('hidden');
        });
    });

    // Subnet Practice Logic
    const genBtn = container.querySelector('#gen-subnet-question');
    genBtn.addEventListener('click', generateSubnetQuestion);

    const checkBtn = container.querySelector('#check-subnet-answer');
    checkBtn.addEventListener('click', checkSubnetAnswer);

    // MCQ Quiz Logic
    const startMcqBtn = container.querySelector('#start-mcq-btn');
    startMcqBtn.addEventListener('click', startMcqQuiz);
}

let currentSubnetProblem = null;

function generateSubnetQuestion() {
    const randomIPs = [
        "192.168.1.15", "10.0.4.50", "172.16.10.5", "192.168.100.200", "10.10.10.10"
    ];
    const randomCidrs = [24, 26, 28, 25, 27];

    const ip = randomIPs[Math.floor(Math.random() * randomIPs.length)];
    const cidr = randomCidrs[Math.floor(Math.random() * randomCidrs.length)];

    const questions = [
        { type: 'network', text: `Tentukan Network Address untuk IP ${ip}/${cidr}` },
        { type: 'broadcast', text: `Tentukan Broadcast Address untuk IP ${ip}/${cidr}` },
        { type: 'hosts', text: `Berapa jumlah Host Usable untuk IP ${ip}/${cidr}` }
    ];

    const selectedQ = questions[Math.floor(Math.random() * questions.length)];
    
    // Hitung jawaban benar di backend JS
    const ipLong = ipToInt(ip);
    const maskLong = cidrToMask(cidr);
    const netLong = ipLong & maskLong;
    const wildLong = ~maskLong >>> 0;
    const broadLong = netLong | wildLong;

    let correctAnswer = '';
    if (selectedQ.type === 'network') correctAnswer = intToIp(netLong);
    else if (selectedQ.type === 'broadcast') correctAnswer = intToIp(broadLong);
    else if (selectedQ.type === 'hosts') correctAnswer = String(Math.pow(2, 32 - cidr) - 2);

    currentSubnetProblem = { correctAnswer };

    document.getElementById('question-text').textContent = selectedQ.text;
    document.getElementById('user-answer-input').value = '';
    document.getElementById('subnet-feedback').textContent = '';
    document.getElementById('subnet-question-box').classList.remove('hidden');
}

function checkSubnetAnswer() {
    const userAns = document.getElementById('user-answer-input').value.trim();
    const feedback = document.getElementById('subnet-feedback');

    if (!userAns) {
        feedback.textContent = 'Masukkan jawaban terlebih dahulu.';
        feedback.style.color = 'var(--error-color)';
        return;
    }

    if (userAns === currentSubnetProblem.correctAnswer) {
        feedback.textContent = '✓ Benar! Kerja bagus.';
        feedback.style.color = 'var(--success-color)';
    } else {
        feedback.textContent = `✗ Salah. Jawaban yang benar adalah: ${currentSubnetProblem.correctAnswer}`;
        feedback.style.color = 'var(--error-color)';
    }
}

let currentMcqIndex = 0;
let score = 0;
let currentMcqQuestions = [];
const MCQ_QUESTION_COUNT = 25;

function shuffleQuestions(questions) {
    const shuffled = [...questions];

    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }

    return shuffled;
}

function startMcqQuiz() {
    currentMcqIndex = 0;
    score = 0;

    currentMcqQuestions = shuffleQuestions(mcqQuestions)
        .slice(0, Math.min(MCQ_QUESTION_COUNT, mcqQuestions.length));

    renderMcqQuestion();
}

function renderMcqQuestion() {
    const area = document.getElementById('mcq-question-area');
    area.classList.remove('hidden');

    if (currentMcqIndex >= currentMcqQuestions.length) {
        area.innerHTML = `
            <h4>Kuis Selesai!</h4>
            <p>Skor Anda: ${score} dari ${currentMcqQuestions.length}</p>
            <button id="restart-quiz" class="btn-primary" style="margin-top: 1rem;">Ulangi Kuis</button>
        `;
        document.getElementById('restart-quiz').addEventListener('click', startMcqQuiz);
        return;
    }

    const qData = currentMcqQuestions[currentMcqIndex];
    let optionsHtml = '';
    qData.options.forEach((opt, idx) => {
        optionsHtml += `<button class="btn-outline mcq-opt-btn" data-index="${idx}" style="display: block; width: 100%; margin-bottom: 0.5rem; text-align: left;">${opt}</button>`;
    });

    area.innerHTML = `
        <p style="font-weight: bold; margin-bottom: 0.75rem;">Pertanyaan ${currentMcqIndex + 1} dari ${currentMcqQuestions.length}</p>
        <p style="font-size: 0.8rem; opacity: 0.75; margin-bottom: 0.5rem;">
            ${qData.category} • ${qData.difficulty.toUpperCase()}
        </p>
        <p style="margin-bottom: 1rem;">${qData.q}</p>
        <div style="display: flex; flex-direction: column; gap: 0.5rem;">
            ${optionsHtml}
        </div>
    `;

    area.querySelectorAll('.mcq-opt-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const selectedIdx = parseInt(e.target.getAttribute('data-index'), 10);
            if (selectedIdx === qData.answer) {
                score++;
            }
            currentMcqIndex++;
            renderMcqQuestion();
        });
    });
}

