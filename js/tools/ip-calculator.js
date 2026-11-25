// Modul IP Address Calculator (IPv4 & CIDR)
function renderIpCalculator(container) {
    container.innerHTML = `
        <div class="tool-card">
            <h2 data-i18n="ipCalc.title">IP Address Calculator</h2>
            <p class="tool-desc" data-i18n="ipCalc.desc">Hitung Network, Broadcast, Subnet Mask, dan Range Host dari IPv4 & CIDR.</p>
            
            <div class="form-group">
                <label for="ip-input" data-i18n="ipCalc.ipLabel">IPv4 Address:</label>
                <input type="text" id="ip-input" placeholder="Contoh: 192.168.1.10" data-i18n-placeholder="ipCalc.ipPlaceholder">
                <span id="ip-error" class="error-msg"></span>
            </div>

            <div class="form-group">
                <label for="cidr-input" data-i18n="ipCalc.cidrLabel">CIDR Prefix (0 - 32):</label>
                <input type="text" id="cidr-input" placeholder="Contoh: 24 atau /24" data-i18n-placeholder="ipCalc.cidrPlaceholder">
                <span id="cidr-error" class="error-msg"></span>
            </div>

            <button id="calc-ip-btn" class="btn-primary" data-i18n="ipCalc.calcBtn">Hitung</button>

            <div id="ip-result" class="result-box hidden">
                <h3 data-i18n="ipCalc.resTitle">Hasil Perhitungan:</h3>
                <table class="result-table">
                    <tr><td data-i18n="ipCalc.network">Network Address</td><td id="res-network">-</td></tr>
                    <tr><td data-i18n="ipCalc.broadcast">Broadcast Address</td><td id="res-broadcast">-</td></tr>
                    <tr><td data-i18n="ipCalc.subnet">Subnet Mask</td><td id="res-subnet">-</td></tr>
                    <tr><td data-i18n="ipCalc.wildcard">Wildcard Mask</td><td id="res-wildcard">-</td></tr>
                    <tr><td data-i18n="ipCalc.firstIp">First Usable IP</td><td id="res-first">-</td></tr>
                    <tr><td data-i18n="ipCalc.lastIp">Last Usable IP</td><td id="res-last">-</td></tr>
                    <tr><td data-i18n="ipCalc.totalAddr">Total Address</td><td id="res-total">-</td></tr>
                    <tr><td data-i18n="ipCalc.usableHosts">Usable Hosts</td><td id="res-hosts">-</td></tr>
                    <tr><td data-i18n="ipCalc.ipClass">IP Class</td><td id="res-class">-</td></tr>
                    <tr><td data-i18n="ipCalc.binaryRep">Binary Representation</td><td id="res-binary" style="word-break: break-all;">-</td></tr>
                </table>
            </div>
        </div>

        <div class="tool-card" style="margin-top: 1.5rem;">
            <h3 data-i18n="ipCalc.checkSectionTitle">Cek IP dalam Subnet</h3>
            <p class="tool-desc" data-i18n="ipCalc.checkSectionDesc">Periksa apakah suatu IP termasuk host, network, broadcast, atau di luar subnet.</p>
            
            <div class="form-group">
                <label for="check-ip-input" data-i18n="ipCalc.checkIpLabel">Target IPv4 Address:</label>
                <input type="text" id="check-ip-input" placeholder="Contoh: 192.168.1.50" data-i18n-placeholder="ipCalc.checkIpPlaceholder">
            </div>

            <div class="form-group">
                <label for="check-cidr-input" data-i18n="ipCalc.checkCidrLabel">Subnet CIDR:</label>
                <input type="text" id="check-cidr-input" placeholder="Contoh: 192.168.1.0/26" data-i18n-placeholder="ipCalc.checkCidrPlaceholder">
            </div>

            <button id="check-ip-btn" class="btn-primary" data-i18n="ipCalc.checkBtn">Cek</button>

            <div id="check-ip-result" class="result-box hidden" style="margin-top: 1rem;">
                <p id="check-ip-result-text" style="font-weight: 600; margin: 0;"></p>
            </div>
        </div>
    `;

    // Event listener untuk tombol hitung
    const btn = container.querySelector('#calc-ip-btn');
    if (btn) btn.addEventListener('click', calculateIP);

    const checkBtn = container.querySelector('#check-ip-btn');
    if (checkBtn) checkBtn.addEventListener('click', handleCheckIpInSubnet);
}

function handleCheckIpInSubnet() {
    const ipInput = document.getElementById('check-ip-input');
    const cidrInput = document.getElementById('check-cidr-input');
    const resultBox = document.getElementById('check-ip-result');
    const resultText = document.getElementById('check-ip-result-text');

    if (!ipInput || !cidrInput || !resultBox || !resultText) return;

    const ip = ipInput.value.trim();
    const cidr = cidrInput.value.trim();
    const t = (path) => (typeof I18n !== 'undefined' ? I18n.t(path) : path);

    try {
        const res = checkIpInSubnet(ip, cidr);
        resultBox.classList.remove('hidden');
        if (res === 'host') {
            resultText.textContent = t('ipCalc.resHost') || 'Termasuk. IP ini adalah host yang bisa dipakai.';
            resultText.style.color = 'var(--success-color, #10b981)';
        } else if (res === 'network') {
            resultText.textContent = t('ipCalc.resNetwork') || 'Termasuk. IP ini adalah network address.';
            resultText.style.color = 'var(--primary-color, #2563eb)';
        } else if (res === 'broadcast') {
            resultText.textContent = t('ipCalc.resBroadcast') || 'Termasuk. IP ini adalah broadcast address.';
            resultText.style.color = 'var(--primary-color, #2563eb)';
        } else if (res === 'outside') {
            resultText.textContent = t('ipCalc.resOutside') || 'Tidak termasuk dalam jaringan ini.';
            resultText.style.color = 'var(--danger-color, #ef4444)';
        }
    } catch (err) {
        resultBox.classList.remove('hidden');
        resultText.textContent = t('ipCalc.resError') || 'IP atau CIDR tidak valid.';
        resultText.style.color = 'var(--danger-color, #ef4444)';
    }
}

function calculateIP() {
    const ipInput = document.getElementById('ip-input').value.trim();
    const cidrInput = document.getElementById('cidr-input').value.trim();
    
    const ipError = document.getElementById('ip-error');
    const cidrError = document.getElementById('cidr-error');
    const resultBox = document.getElementById('ip-result');

    // Reset error messages
    ipError.textContent = '';
    cidrError.textContent = '';

    const t = (path) => (typeof I18n !== 'undefined' ? I18n.t(path) : path);

    // Validasi kosong
    let hasError = false;
    if (!ipInput) {
        ipError.textContent = t('ipCalc.errEmpty') || 'Input tidak boleh kosong.';
        hasError = true;
    } else if (!isValidIPv4(ipInput)) {
        ipError.textContent = t('ipCalc.errInvalidIp') || 'IPv4 tidak valid.';
        hasError = true;
    }

    let cidr = 0;
    const cidrRes = parseCIDR(cidrInput);
    if (!cidrRes.success) {
        cidrError.textContent = cidrRes.error;
        hasError = true;
    } else {
        cidr = cidrRes.cidr;
    }

    if (hasError) {
        resultBox.classList.add('hidden');
        return;
    }

    // Proses Perhitungan Matematis Jaringan
    const ipLong = ipToInt(ipInput);
    const maskLong = cidrToMask(cidr);
    const netLong = ipLong & maskLong;
    const wildLong = ~maskLong >>> 0;
    const broadLong = netLong | wildLong;

    // Output Mapping
    document.getElementById('res-network').textContent = intToIp(netLong);
    document.getElementById('res-broadcast').textContent = intToIp(broadLong);
    document.getElementById('res-subnet').textContent = intToIp(maskLong);
    document.getElementById('res-wildcard').textContent = intToIp(wildLong);
    
    if (cidr === 32) {
        document.getElementById('res-first').textContent = intToIp(netLong);
        document.getElementById('res-last').textContent = intToIp(netLong);
        document.getElementById('res-total').textContent = '1';
        document.getElementById('res-hosts').textContent = '1 (Host Tunggal)';
    } else if (cidr === 31) {
        document.getElementById('res-first').textContent = intToIp(netLong);
        document.getElementById('res-last').textContent = intToIp(broadLong);
        document.getElementById('res-total').textContent = '2';
        document.getElementById('res-hosts').textContent = '2 (Point-to-Point)';
    } else {
        document.getElementById('res-first').textContent = intToIp(netLong + 1);
        document.getElementById('res-last').textContent = intToIp(broadLong - 1);
        document.getElementById('res-total').textContent = Math.pow(2, 32 - cidr);
        document.getElementById('res-hosts').textContent = Math.pow(2, 32 - cidr) - 2;
    }

    document.getElementById('res-class').textContent = getIpClass(ipInput);
    document.getElementById('res-binary').textContent = ipToBinary(ipInput);

    resultBox.classList.remove('hidden');
}

// Helper Functions untuk IP Calculator & CIDR Validation
function parseCIDR(rawInput) {
    if (rawInput === null || rawInput === undefined) {
        return { success: false, error: 'Input tidak boleh kosong.' };
    }
    const trimmed = String(rawInput).trim();
    if (!trimmed) {
        return { success: false, error: 'Input tidak boleh kosong.' };
    }

    // Izinkan prefix slash opsional, misal "/24" -> "24"
    const normalized = trimmed.startsWith('/') ? trimmed.slice(1).trim() : trimmed;
    if (!normalized) {
        return { success: false, error: 'Format CIDR prefix tidak valid.' };
    }

    // Strict regex: hanya digit bulat murni, tanpa minus, desimal, huruf, dll.
    // Cegah leading zero seperti "01", "00" kecuali angka "0" tunggal.
    if (!/^(0|[1-9]\d*)$/.test(normalized)) {
        return { success: false, error: 'CIDR prefix harus berupa bilangan bulat antara 0–32 (contoh: 24 atau /24).' };
    }

    const cidr = Number(normalized);
    if (!Number.isInteger(cidr) || cidr < 0 || cidr > 32) {
        return { success: false, error: 'CIDR prefix harus berada dalam rentang 0–32.' };
    }

    return {
        success: true,
        cidr: cidr
    };
}

function isValidIPv4(ip) {
    if (!ip || typeof ip !== 'string') return false;
    const parts = ip.split('.');
    if (parts.length !== 4) return false;
    return parts.every(part => {
        if (!/^\d{1,3}$/.test(part)) return false;
        if (part.length > 1 && part.startsWith('0')) return false;
        const num = Number(part);
        return num >= 0 && num <= 255;
    });
}


function ipToInt(ip) {
    return ip.split('.').reduce((acc, octet) => ((acc << 8) + parseInt(octet, 10)) >>> 0, 0);
}

function intToIp(int) {
    return [
        (int >>> 24) & 255,
        (int >>> 16) & 255,
        (int >>> 8) & 255,
        int & 255
    ].join('.');
}

function cidrToMask(cidr) {
    return cidr === 0 ? 0 : (~0 << (32 - cidr)) >>> 0;
}

function getIpClass(ip) {
    if (!ip || typeof ip !== 'string') return 'Invalid IP';
    const trimmed = ip.trim();
    if (trimmed === '255.255.255.255') {
        return 'Special — Limited Broadcast';
    }
    const parts = trimmed.split('.');
    if (parts.length !== 4) return 'Invalid IP';
    const firstOctet = parseInt(parts[0], 10);
    if (isNaN(firstOctet) || firstOctet < 0 || firstOctet > 255) {
        return 'Invalid IP';
    }

    if (firstOctet === 0) {
        return 'Special — This Network';
    }
    if (firstOctet === 127) {
        return 'Special — Loopback';
    }
    if (firstOctet >= 1 && firstOctet <= 126) {
        return 'Class A';
    }
    if (firstOctet >= 128 && firstOctet <= 191) {
        return 'Class B';
    }
    if (firstOctet >= 192 && firstOctet <= 223) {
        return 'Class C';
    }
    if (firstOctet >= 224 && firstOctet <= 239) {
        return 'Class D (Multicast)';
    }
    if (firstOctet >= 240 && firstOctet <= 255) {
        return 'Class E (Reserved)';
    }

    return 'Invalid IP';
}

function ipToBinary(ip) {
    return ip.split('.').map(octet => {
        return parseInt(octet, 10).toString(2).padStart(8, '0');
    }).join('.');
}

function checkIpInSubnet(ip, cidr) {
    if (!isValidIPv4(ip)) {
        throw new Error('Alamat IP tidak valid.');
    }
    if (typeof cidr !== 'string') {
        throw new Error('CIDR harus berupa string.');
    }
    const slashIdx = cidr.indexOf('/');
    if (slashIdx === -1 || cidr.indexOf('/', slashIdx + 1) !== -1) {
        throw new Error('Format CIDR tidak valid.');
    }
    const netIp = cidr.substring(0, slashIdx).trim();
    const prefixStr = cidr.substring(slashIdx + 1).trim();

    if (!isValidIPv4(netIp)) {
        throw new Error('Alamat IP pada CIDR tidak valid.');
    }
    const parsed = parseCIDR(prefixStr);
    if (!parsed.success) {
        throw new Error(parsed.error);
    }
    const prefix = parsed.cidr;

    const ipIntVal = ipToInt(ip);
    const mask = cidrToMask(prefix);
    const netIntVal = (ipToInt(netIp) & mask) >>> 0;
    const wild = (~mask) >>> 0;
    const broadIntVal = (netIntVal | wild) >>> 0;

    const targetNetVal = (ipIntVal & mask) >>> 0;
    if (targetNetVal !== netIntVal) {
        return 'outside';
    }

    if (prefix === 31 || prefix === 32) {
        return 'host';
    }

    if (ipIntVal === netIntVal) {
        return 'network';
    }
    if (ipIntVal === broadIntVal) {
        return 'broadcast';
    }

    return 'host';
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        parseCIDR,
        isValidIPv4,
        ipToInt,
        intToIp,
        cidrToMask,
        getIpClass,
        ipToBinary,
        checkIpInSubnet
    };
}


