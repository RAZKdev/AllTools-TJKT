// Modul Converters (IPv4 Binary, Number Base, dan Data Unit Converter)
function renderConverters(container) {
    container.innerHTML = `
        <div class="tool-card">
            <h2>Converters & Number Base</h2>
            <p class="tool-desc">Konversi format IPv4, basis angka (Decimal, Binary, Hexadecimal, Octal), dan unit data.</p>
            
            <div class="converter-tabs" style="display: flex; gap: 0.5rem; margin-bottom: 1.5rem; flex-wrap: wrap;">
                <button class="btn-outline conv-tab-btn active" data-target="conv-ip">IPv4 Binary</button>
                <button class="btn-outline conv-tab-btn" data-target="conv-base">Number Base</button>
                <button class="btn-outline conv-tab-btn" data-target="conv-data">Data Unit</button>
            </div>

            <div id="conv-ip" class="conv-panel">
                <h3>IPv4 Decimal ↔ Binary</h3>
                <div class="form-group" style="margin-top: 1rem;">
                    <label for="ipv4-conv-input">Masukkan IP atau Binary:</label>
                    <input type="text" id="ipv4-conv-input" placeholder="192.168.1.1 atau 11000000...">
                    <span id="ipv4-conv-error" class="error-msg"></span>
                </div>
                <button id="convert-ipv4-btn" class="btn-primary">Konversi</button>
                <div id="ipv4-conv-result" class="result-box hidden" style="margin-top: 1rem;">
                    <p><strong>Hasil:</strong> <span id="ipv4-conv-output" style="word-break: break-all; font-family: monospace;">-</span></p>
                </div>
            </div>

            <div id="conv-base" class="conv-panel hidden">
                <h3>Number Base Converter (Dec, Bin, Hex, Oct)</h3>
                <div class="form-group" style="margin-top: 1rem;">
                    <label for="base-input">Nilai Angka:</label>
                    <input type="text" id="base-input" placeholder="Masukkan angka...">
                </div>
                <div class="form-group">
                    <label for="base-from">Dari Basis:</label>
                    <select id="base-from" style="width: 100%; padding: 0.75rem; border-radius: var(--radius); border: 1px solid var(--border-color); background: var(--surface-color); color: var(--text-color);">
                        <option value="10">Decimal (10)</option>
                        <option value="2">Binary (2)</option>
                        <option value="16">Hexadecimal (16)</option>
                        <option value="8">Octal (8)</option>
                    </select>
                </div>
                <button id="convert-base-btn" class="btn-primary">Konversi Basis</button>
                <div id="base-conv-result" class="result-box hidden" style="margin-top: 1rem;">
                    <table class="result-table">
                        <tr><td>Decimal (10)</td><td id="base-res-dec">-</td></tr>
                        <tr><td>Binary (2)</td><td id="base-res-bin">-</td></tr>
                        <tr><td>Hexadecimal (16)</td><td id="base-res-hex">-</td></tr>
                        <tr><td>Octal (8)</td><td id="base-res-oct">-</td></tr>
                    </table>
                </div>
            </div>

            <div id="conv-data" class="conv-panel hidden">
                <h3>Data Unit Converter (Decimal vs Binary Units)</h3>
                <p style="font-size: 0.85rem; color: var(--text-secondary); margin-bottom: 1rem;">Catatan: Satuan Desimal berbasis 1000 (KB, MB, GB), sedangkan Biner (KiB, MiB, GiB) berbasis 1024.</p>
                <div class="form-group">
                    <label for="data-value-input">Nilai:</label>
                    <input type="number" id="data-value-input" placeholder="Contoh: 1024" value="1">
                </div>
                <div class="form-group">
                    <label for="data-unit-select">Satuan Asal:</label>
                    <select id="data-unit-select" style="width: 100%; padding: 0.75rem; border-radius: var(--radius); border: 1px solid var(--border-color); background: var(--surface-color); color: var(--text-color);">
                        <option value="bit">bit</option>
                        <option value="Byte" selected>Byte</option>
                        <option value="KB">KB (Kilobyte - 10^3)</option>
                        <option value="KiB">KiB (Kibibyte - 2^10)</option>
                        <option value="MB">MB (Megabyte - 10^6)</option>
                        <option value="MiB">MiB (Mebibyte - 2^20)</option>
                        <option value="GB">GB (Gigabyte - 10^9)</option>
                        <option value="GiB">GiB (Gibibyte - 2^30)</option>
                        <option value="TB">TB (Terabyte - 10^12)</option>
                        <option value="TiB">TiB (Tebibyte - 2^40)</option>
                    </select>
                </div>
                <button id="convert-data-btn" class="btn-primary">Konversi Unit</button>
                <div id="data-conv-result" class="result-box hidden" style="margin-top: 1rem;">
                    <table class="result-table">
                        <tr><td>Bits</td><td id="d-bits">-</td></tr>
                        <tr><td>Bytes</td><td id="d-bytes">-</td></tr>
                        <tr><td>Kilobytes (KB)</td><td id="d-kb">-</td></tr>
                        <tr><td>Kibibytes (KiB)</td><td id="d-kib">-</td></tr>
                        <tr><td>Megabytes (MB)</td><td id="d-mb">-</td></tr>
                        <tr><td>Mebibytes (MiB)</td><td id="d-mib">-</td></tr>
                        <tr><td>Gigabytes (GB)</td><td id="d-gb">-</td></tr>
                        <tr><td>Gibibytes (GiB)</td><td id="d-gib">-</td></tr>
                    </table>
                </div>
            </div>
        </div>
    `;

    // Tab Switching Logic
    const tabBtns = container.querySelectorAll('.conv-tab-btn');
    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            tabBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            const targetId = btn.getAttribute('data-target');
            container.querySelectorAll('.conv-panel').forEach(panel => {
                panel.classList.add('hidden');
            });
            container.querySelector(`#${targetId}`).classList.remove('hidden');
        });
    });

    // Event Listeners for Converters
    container.querySelector('#convert-ipv4-btn').addEventListener('click', handleIPv4Convert);
    container.querySelector('#convert-base-btn').addEventListener('click', handleBaseConvert);
    container.querySelector('#convert-data-btn').addEventListener('click', handleDataConvert);
}

// Handler IPv4 Converter
function handleIPv4Convert() {
    const input = document.getElementById('ipv4-conv-input').value.trim();
    const errorEl = document.getElementById('ipv4-conv-error');
    const resultBox = document.getElementById('ipv4-conv-result');
    const outputEl = document.getElementById('ipv4-conv-output');
    
    errorEl.textContent = '';
    if (!input) {
        errorEl.textContent = 'Input tidak boleh kosong.';
        resultBox.classList.add('hidden');
        return;
    }

    if (input.includes('.')) {
        // Decimal ke Binary
        if (!isValidIPv4(input)) {
            errorEl.textContent = 'Format IPv4 Decimal tidak valid.';
            resultBox.classList.add('hidden');
            return;
        }
        outputEl.textContent = ipToBinary(input);
    } else {
        // Binary ke Decimal
        const octets = input.split('.');
        if (octets.length !== 4 || !octets.every(o => o.length === 8 && /^[01]+$/.test(o))) {
            errorEl.textContent = 'Format Binary tidak valid (harus 4 blok oktet @ 8-bit angka 0 dan 1).';
            resultBox.classList.add('hidden');
            return;
        }
        outputEl.textContent = octets.map(o => parseInt(o, 2)).join('.');
    }
    resultBox.classList.remove('hidden');
}

// Handler Number Base Converter
function handleBaseConvert() {
    const val = document.getElementById('base-input').value.trim();
    const fromBase = parseInt(document.getElementById('base-from').value, 10);
    
    if (!val) return;

    let decimalVal = parseInt(val, fromBase);
    if (isNaN(decimalVal)) {
        alert('Nilai angka tidak sesuai dengan basis yang dipilih.');
        return;
    }

    document.getElementById('base-res-dec').textContent = decimalVal.toString(10);
    document.getElementById('base-res-bin').textContent = decimalVal.toString(2);
    document.getElementById('base-res-hex').textContent = decimalVal.toString(16).toUpperCase();
    document.getElementById('base-res-oct').textContent = decimalVal.toString(8);
    
    document.getElementById('base-conv-result').classList.remove('hidden');
}

// Handler Data Unit Converter
function handleDataConvert() {
    const val = parseFloat(document.getElementById('data-value-input').value);
    const unit = document.getElementById('data-unit-select').value;

    if (isNaN(val)) return;

    // Konversi semua ke basis terendah yaitu Bytes
    let bytes = 0;
    switch(unit) {
        case 'bit': bytes = val / 8; break;
        case 'Byte': bytes = val; break;
        case 'KB': bytes = val * 1000; break;
        case 'KiB': bytes = val * 1024; break;
        case 'MB': bytes = val * Math.pow(10, 6); break;
        case 'MiB': bytes = val * Math.pow(2, 20); break;
        case 'GB': bytes = val * Math.pow(10, 9); break;
        case 'GiB': bytes = val * Math.pow(2, 30); break;
        case 'TB': bytes = val * Math.pow(10, 12); break;
        case 'TiB': bytes = val * Math.pow(2, 40); break;
    }

    const bits = bytes * 8;
    document.getElementById('d-bits').textContent = bits.toLocaleString();
    document.getElementById('d-bytes').textContent = bytes.toLocaleString();
    document.getElementById('d-kb').textContent = (bytes / 1000).toFixed(2);
    document.getElementById('d-kib').textContent = (bytes / 1024).toFixed(2);
    document.getElementById('d-mb').textContent = (bytes / Math.pow(10, 6)).toFixed(4);
    document.getElementById('d-mib').textContent = (bytes / Math.pow(2, 20)).toFixed(4);
    document.getElementById('d-gb').textContent = (bytes / Math.pow(10, 9)).toFixed(6);
    document.getElementById('d-gib').textContent = (bytes / Math.pow(2, 30)).toFixed(6);

    document.getElementById('data-conv-result').classList.remove('hidden');
}

