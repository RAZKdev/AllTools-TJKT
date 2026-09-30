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
                    <span id="base-error" class="error-msg"></span>
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
                    <span id="data-value-error" class="error-msg"></span>
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
                        <tr><td>Terabytes (TB)</td><td id="d-tb">-</td></tr>
                        <tr><td>Tebibytes (TiB)</td><td id="d-tib">-</td></tr>
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

// Parser & Validator Universal IPv4 Decimal & Binary
function parseIPv4OrBinary(rawInput) {
    const input = String(rawInput || '').trim();
    if (!input) {
        return { success: false, error: 'Input tidak boleh kosong.' };
    }

    // 1. Format 32-bit Binary Kontinu (tanpa titik)
    if (/^[01]{32}$/.test(input)) {
        const octets = [];
        for (let i = 0; i < 32; i += 8) {
            octets.push(input.substring(i, i + 8));
        }
        const decimal = octets.map(b => parseInt(b, 2)).join('.');
        return {
            success: true,
            format: 'binary_continuous',
            decimal: decimal,
            binary: octets.join('.'),
            outputLabel: 'Desimal (IPv4):',
            output: decimal
        };
    }

    // 2. Format bertitik (harus tepat 4 oktet)
    if (input.includes('.')) {
        const parts = input.split('.');
        if (parts.length !== 4) {
            return { success: false, error: 'IPv4 harus terdiri dari tepat 4 oktet yang dipisahkan titik.' };
        }

        // A. Format Dotted Binary: Tepat 4 oktet @ 8-bit (hanya 0 dan 1)
        if (parts.every(p => /^[01]{8}$/.test(p))) {
            const decimal = parts.map(b => parseInt(b, 2)).join('.');
            return {
                success: true,
                format: 'binary_dotted',
                decimal: decimal,
                binary: input,
                outputLabel: 'Desimal (IPv4):',
                output: decimal
            };
        }

        // B. Deteksi jika user bermaksud memasukkan Binary tetapi panjang bit tidak tepat 8
        const hasBinaryOnlyChars = parts.every(p => /^[01]+$/.test(p));
        const hasOctetOver3Digits = parts.some(p => p.length > 3);
        if (hasBinaryOnlyChars && (hasOctetOver3Digits || parts.some(p => p.length > 1 && p.length !== 8))) {
            return { success: false, error: 'Format Binary tidak valid: setiap oktet binary harus terdiri dari tepat 8-bit (contoh: 11000000.10101000.00000001.00000001).' };
        }

        // C. Format Dotted Decimal: setiap oktet adalah angka desimal 0-255
        const isDecimalFormat = parts.every(p => /^\d+$/.test(p));
        if (!isDecimalFormat) {
            return { success: false, error: 'Format tidak valid. Masukkan IPv4 Desimal (0-255) atau Binary (8 bit per oktet).' };
        }

        for (let i = 0; i < 4; i++) {
            const p = parts[i];
            if (p.length > 1 && p.startsWith('0')) {
                return { success: false, error: `Oktet ke-${i + 1} (${p}) memiliki leading zero yang tidak valid.` };
            }
            const num = Number(p);
            if (num < 0 || num > 255) {
                return { success: false, error: `Oktet ke-${i + 1} bernilai ${p}, melebihi batas IPv4 (0–255).` };
            }
        }

        const binary = parts.map(p => Number(p).toString(2).padStart(8, '0')).join('.');
        return {
            success: true,
            format: 'decimal_dotted',
            decimal: input,
            binary: binary,
            outputLabel: 'Binary (IPv4):',
            output: binary
        };
    }

    return { success: false, error: 'Format tidak dikenal. Masukkan IPv4 Desimal (contoh: 192.168.1.1) atau Binary (contoh: 11000000.10101000.00000001.00000001).' };
}

// Handler IPv4 Converter
function handleIPv4Convert() {
    const input = document.getElementById('ipv4-conv-input').value.trim();
    const errorEl = document.getElementById('ipv4-conv-error');
    const resultBox = document.getElementById('ipv4-conv-result');
    const outputEl = document.getElementById('ipv4-conv-output');
    
    errorEl.textContent = '';
    resultBox.classList.add('hidden');

    const result = parseIPv4OrBinary(input);
    if (!result.success) {
        errorEl.textContent = result.error;
        return;
    }

    outputEl.innerHTML = `<strong>${result.outputLabel}</strong> ${result.output}`;
    resultBox.classList.remove('hidden');
}

// Konverter & Validator Basis Bilangan (Desimal, Biner, Heksadesimal, Oktal)
function convertNumberBase(rawVal, fromBase) {
    const val = String(rawVal || '').trim();
    if (!val) {
        return { success: false, error: 'Nilai angka tidak boleh kosong.' };
    }

    const base = parseInt(fromBase, 10);
    const patterns = {
        2: /^[01]+$/,
        8: /^[0-7]+$/,
        10: /^\d+$/,
        16: /^[0-9A-Fa-f]+$/
    };

    const baseNames = {
        2: 'Biner (hanya digit 0 dan 1)',
        8: 'Oktal (hanya digit 0 sampai 7)',
        10: 'Desimal (hanya digit 0 sampai 9)',
        16: 'Heksadesimal (hanya digit 0-9 dan A-F)'
    };

    if (!patterns[base]) {
        return { success: false, error: 'Basis asal tidak didukung.' };
    }

    // Deteksi tanda minus atau pecahan/desimal
    if (val.includes('.') || val.includes(',')) {
        return { success: false, error: 'Bilangan pecahan/desimal tidak didukung. Masukkan bilangan bulat positif.' };
    }
    if (val.startsWith('-')) {
        return { success: false, error: 'Bilangan negatif tidak didukung. Masukkan bilangan bulat positif.' };
    }

    // Validasi pola karakter secara menyeluruh (full match)
    if (!patterns[base].test(val)) {
        return { 
            success: false, 
            error: `Input mengandung karakter tidak valid untuk ${baseNames[base]}. Masukan tidak boleh mengandung karakter di luar basis yang dipilih.` 
        };
    }

    try {
        // Gunakan BigInt untuk menghindari bug precision overflow pada bilangan besar
        let decBigInt;
        if (base === 10) {
            decBigInt = BigInt(val);
        } else if (base === 2) {
            decBigInt = BigInt('0b' + val);
        } else if (base === 8) {
            decBigInt = BigInt('0o' + val);
        } else if (base === 16) {
            decBigInt = BigInt('0x' + val);
        }

        const isSafe = decBigInt <= BigInt(Number.MAX_SAFE_INTEGER);

        return {
            success: true,
            isSafeInteger: isSafe,
            dec: decBigInt.toString(10),
            bin: decBigInt.toString(2),
            hex: decBigInt.toString(16).toUpperCase(),
            oct: decBigInt.toString(8)
        };
    } catch {
        return { success: false, error: 'Nilai angka terlalu besar untuk diproses.' };
    }
}

// Handler Number Base Converter
function handleBaseConvert() {
    const val = document.getElementById('base-input').value.trim();
    const fromBase = document.getElementById('base-from').value;
    const errorEl = document.getElementById('base-error');
    const resultBox = document.getElementById('base-conv-result');

    errorEl.textContent = '';
    resultBox.classList.add('hidden');

    const result = convertNumberBase(val, fromBase);
    if (!result.success) {
        errorEl.textContent = result.error;
        return;
    }

    document.getElementById('base-res-dec').textContent = result.dec;
    document.getElementById('base-res-bin').textContent = result.bin;
    document.getElementById('base-res-hex').textContent = result.hex;
    document.getElementById('base-res-oct').textContent = result.oct;

    resultBox.classList.remove('hidden');
}

// Handler Data Unit Converter
function handleDataConvert() {
    const rawVal = document.getElementById('data-value-input').value.trim();
    const val = rawVal === '' ? NaN : Number(rawVal);
    const unit = document.getElementById('data-unit-select').value;
    const errorEl = document.getElementById('data-value-error');
    const resultBox = document.getElementById('data-conv-result');

    errorEl.textContent = '';
    resultBox.classList.add('hidden');

    if (!Number.isFinite(val) || val <= 0) {
        errorEl.textContent = 'Nilai harus berupa angka lebih besar dari 0.';
        return;
    }

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
    document.getElementById('d-tb').textContent = (bytes / Math.pow(10, 12)).toFixed(8);
    document.getElementById('d-tib').textContent = (bytes / Math.pow(2, 40)).toFixed(8);

    resultBox.classList.remove('hidden');
}

