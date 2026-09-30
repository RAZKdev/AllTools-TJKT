// Modul Bandwidth Calculator
function renderBandwidthCalculator(container) {
    container.innerHTML = `
        <div class="tool-card">
            <h2>Bandwidth & Transfer Time Calculator</h2>
            <p class="tool-desc">Hitung estimasi waktu unduh atau unggah file berdasarkan kapasitas bandwidth jaringan.</p>
            
            <div class="form-group" style="margin-top: 1rem;">
                <label for="file-size-input">Ukuran File:</label>
                <div style="display: flex; gap: 0.5rem;">
                    <input type="number" id="file-size-input" placeholder="Contoh: 700" value="700" min="0.001" step="any" style="flex: 2;">
                    <select id="file-unit-select" style="flex: 1.2; padding: 0.75rem; border-radius: var(--radius); border: 1px solid var(--border-color); background: var(--surface-color); color: var(--text-color);">
                        <option value="KB">KB (10³ Byte)</option>
                        <option value="KiB">KiB (2¹⁰ Byte)</option>
                        <option value="MB" selected>MB (10⁶ Byte)</option>
                        <option value="MiB">MiB (2²⁰ Byte)</option>
                        <option value="GB">GB (10⁹ Byte)</option>
                        <option value="GiB">GiB (2³⁰ Byte)</option>
                        <option value="TB">TB (10¹² Byte)</option>
                        <option value="TiB">TiB (2⁴⁰ Byte)</option>
                    </select>
                </div>
                <span id="file-size-error" class="error-msg"></span>
            </div>

            <div class="form-group">
                <label for="speed-input">Kecepatan Transfer Jaringan:</label>
                <div style="display: flex; gap: 0.5rem;">
                    <input type="number" id="speed-input" placeholder="Contoh: 10" value="10" min="0.001" step="any" style="flex: 2;">
                    <select id="speed-unit-select" style="flex: 1.2; padding: 0.75rem; border-radius: var(--radius); border: 1px solid var(--border-color); background: var(--surface-color); color: var(--text-color);">
                        <option value="Kbps">Kbps (Kilobit/detik)</option>
                        <option value="Mbps" selected>Mbps (Megabit/detik)</option>
                        <option value="Gbps">Gbps (Gigabit/detik)</option>
                        <option value="KBps">KB/s (Kilobyte/detik)</option>
                        <option value="MBps">MB/s (Megabyte/detik)</option>
                    </select>
                </div>
                <span id="speed-error" class="error-msg"></span>
            </div>

            <p style="font-size: 0.8rem; color: var(--text-secondary); margin-top: 0.5rem; margin-bottom: 1.25rem; line-height: 1.5;">
                💡 <strong>Catatan Standar Satuan:</strong> Satuan desimal SI (KB, MB, GB) berbasis 1.000, sedangkan biner IEC (KiB, MiB, GiB) berbasis 1.024. Kecepatan 1 MB/s = 8 Mbps (1 Byte = 8 bit).
            </p>

            <button id="calc-bandwidth-btn" class="btn-primary">Hitung Waktu Transfer</button>

            <div id="bandwidth-result" class="result-box hidden" style="margin-top: 1rem;">
                <h3>Estimasi Waktu:</h3>
                <p style="font-size: 1.35rem; font-weight: bold; color: var(--primary-color); margin-top: 0.5rem; margin-bottom: 1rem;" id="bw-time-output">-</p>
                
                <table class="result-table">
                    <tr><td>Ukuran File (Bytes)</td><td id="bw-bytes">-</td></tr>
                    <tr><td>Ukuran File (Bits)</td><td id="bw-bits">-</td></tr>
                    <tr><td>Kecepatan Efektif</td><td id="bw-speed-effective">-</td></tr>
                </table>
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
    const sizeError = document.getElementById('file-size-error');
    const speedError = document.getElementById('speed-error');

    sizeError.textContent = '';
    speedError.textContent = '';
    resultBox.classList.add('hidden');

    let hasError = false;

    if (isNaN(sizeVal) || sizeVal <= 0) {
        sizeError.textContent = 'Ukuran file harus angka lebih besar dari 0.';
        hasError = true;
    }

    if (isNaN(speedVal) || speedVal <= 0) {
        speedError.textContent = 'Kecepatan transfer harus angka lebih besar dari 0.';
        hasError = true;
    }

    if (hasError) {
        return;
    }

    // 1. Konversi Ukuran File ke Bytes & Bits secara konsisten (SI vs IEC)
    let sizeInBytes = 0;
    switch(sizeUnit) {
        case 'KB': sizeInBytes = sizeVal * 1000; break;
        case 'KiB': sizeInBytes = sizeVal * 1024; break;
        case 'MB': sizeInBytes = sizeVal * Math.pow(1000, 2); break;
        case 'MiB': sizeInBytes = sizeVal * Math.pow(1024, 2); break;
        case 'GB': sizeInBytes = sizeVal * Math.pow(1000, 3); break;
        case 'GiB': sizeInBytes = sizeVal * Math.pow(1024, 3); break;
        case 'TB': sizeInBytes = sizeVal * Math.pow(1000, 4); break;
        case 'TiB': sizeInBytes = sizeVal * Math.pow(1024, 4); break;
        default: sizeInBytes = sizeVal * Math.pow(1000, 2);
    }

    const sizeInBits = sizeInBytes * 8;

    // 2. Konversi Kecepatan Transfer ke bits per second (bps)
    // 1 Mbps = 1,000,000 bps, 1 Gbps = 1,000,000,000 bps
    // 1 KB/s = 8,000 bps, 1 MB/s = 8,000,000 bps (8 Mbps)
    let speedInBitsPerSec = 0;
    switch(speedUnit) {
        case 'Kbps': speedInBitsPerSec = speedVal * 1000; break;
        case 'Mbps': speedInBitsPerSec = speedVal * 1000000; break;
        case 'Gbps': speedInBitsPerSec = speedVal * 1000000000; break;
        case 'KBps': speedInBitsPerSec = speedVal * 1000 * 8; break;
        case 'MBps': speedInBitsPerSec = speedVal * 1000000 * 8; break;
        default: speedInBitsPerSec = speedVal * 1000000;
    }

    const totalSeconds = sizeInBits / speedInBitsPerSec;
    outputEl.textContent = formatTime(totalSeconds);

    document.getElementById('bw-bytes').textContent = `${Math.round(sizeInBytes).toLocaleString('id-ID')} Byte`;
    document.getElementById('bw-bits').textContent = `${Math.round(sizeInBits).toLocaleString('id-ID')} bit`;
    document.getElementById('bw-speed-effective').textContent = `${(speedInBitsPerSec / 1000000).toFixed(2)} Mbps (${(speedInBitsPerSec / 8000000).toFixed(2)} MB/s)`;

    resultBox.classList.remove('hidden');
}

function formatTime(sec) {
    if (sec < 60) {
        return `${sec.toFixed(2)} Detik`;
    } else if (sec < 3600) {
        const mins = Math.floor(sec / 60);
        const secs = (sec % 60).toFixed(1);
        return `${mins} Menit ${secs} Detik`;
    } else {
        const hours = Math.floor(sec / 3600);
        const mins = Math.floor((sec % 3600) / 60);
        const secs = Math.floor(sec % 60);
        return `${hours} Jam ${mins} Menit ${secs} Detik`;
    }
}
