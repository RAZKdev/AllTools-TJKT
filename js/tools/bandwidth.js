// Modul Bandwidth Calculator
function renderBandwidthCalculator(container) {
    container.innerHTML = `
        <div class="tool-card">
            <h2>Bandwidth & Transfer Time Calculator</h2>
            <p class="tool-desc">Hitung estimasi waktu download atau upload file berdasarkan kecepatan jaringan.</p>
            
            <div class="form-group" style="margin-top: 1rem;">
                <label for="file-size-input">Ukuran File:</label>
                <div style="display: flex; gap: 0.5rem;">
                    <input type="number" id="file-size-input" placeholder="Contoh: 700" value="700" style="flex: 2;">
                    <select id="file-unit-select" style="flex: 1; padding: 0.75rem; border-radius: var(--radius); border: 1px solid var(--border-color); background: var(--surface-color); color: var(--text-color);">
                        <option value="KB">KB</option>
                        <option value="MB" selected>MB</option>
                        <option value="GB">GB</option>
                        <option value="TB">TB</option>
                    </select>
                </div>
            </div>

            <div class="form-group">
                <label for="speed-input">Kecepatan Transfer:</label>
                <div style="display: flex; gap: 0.5rem;">
                    <input type="number" id="speed-input" placeholder="Contoh: 10" value="10" style="flex: 2;">
                    <select id="speed-unit-select" style="flex: 1; padding: 0.75rem; border-radius: var(--radius); border: 1px solid var(--border-color); background: var(--surface-color); color: var(--text-color);">
                        <option value="Mbps" selected>Mbps</option>
                        <option value="Gbps">Gbps</option>
                        <option value="KBps">KB/s</option>
                        <option value="MBps">MB/s</option>
                    </select>
                </div>
            </div>

            <button id="calc-bandwidth-btn" class="btn-primary">Hitung Waktu Transfer</button>

            <div id="bandwidth-result" class="result-box hidden" style="margin-top: 1rem;">
                <h3>Estimasi Waktu:</h3>
                <p style="font-size: 1.25rem; font-weight: bold; color: var(--primary-color); margin-top: 0.5rem;" id="bw-time-output">-</p>
            </div>
        </div>
    `;

    const btn = container.querySelector('#calc-bandwidth-btn');
    btn.addEventListener('click', calculateBandwidth);
}

function calculateBandwidth() {
    const sizeVal = parseFloat(document.getElementById('file-size-input').value);
    const sizeUnit = document.getElementById('file-unit-select').value;
    const speedVal = parseFloat(document.getElementById('speed-input').value);
    const speedUnit = document.getElementById('speed-unit-select').value;

    const resultBox = document.getElementById('bandwidth-result');
    const outputEl = document.getElementById('bw-time-output');

    if (isNaN(sizeVal) || isNaN(speedVal) || sizeVal <= 0 || speedVal <= 0) {
        alert('Masukkan nilai ukuran file dan kecepatan dengan benar (lebih besar dari 0).');
        return;
    }

    // Konversi ukuran file ke Megabits (Mb) karena kecepatan jaringan umumnya dalam Megabits per second (Mbps)
    // 1 Byte = 8 bits
    let sizeInBits = 0;
    switch(sizeUnit) {
        case 'KB': sizeInBits = (sizeVal * 1024 * 8); break;
        case 'MB': sizeInBits = (sizeVal * 1024 * 1024 * 8); break;
        case 'GB': sizeInBits = (sizeVal * 1024 * 1024 * 1024 * 8); break;
        case 'TB': sizeInBits = (sizeVal * 1024 * 1024 * 1024 * 1024 * 8); break;
    }

    let speedInBitsPerSec = 0;
    switch(speedUnit) {
        case 'Mbps': speedInBitsPerSec = speedVal * 1000000; break;
        case 'Gbps': speedInBitsPerSec = speedVal * 1000000000; break;
        case 'KBps': speedInBitsPerSec = speedVal * 1024 * 8; break;
        case 'MBps': speedInBitsPerSec = speedVal * 1024 * 1024 * 8; break;
    }

    const totalSeconds = sizeInBits / speedInBitsPerSec;
    outputEl.textContent = formatTime(totalSeconds);
    resultBox.classList.remove('hidden');
}

function formatTime(sec) {
    if (sec < 60) {
        return `${sec.toFixed(2)} Detik`;
    } else if (sec < 3600) {
        const mins = Math.floor(sec / 60);
        const secs = (sec % 60).toFixed(0);
        return `${mins} Menit ${secs} Detik`;
    } else {
        const hours = Math.floor(sec / 3600);
        const mins = Math.floor((sec % 3600) / 60);
        return `${hours} Jam ${mins} Menit`;
    }
}

