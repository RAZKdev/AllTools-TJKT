// Modul IP Address Calculator (IPv4 & CIDR)
function renderIpCalculator(container) {
    container.innerHTML = `
        <div class="tool-card">
            <h2>IP Address Calculator</h2>
            <p class="tool-desc">Hitung Network, Broadcast, Subnet Mask, dan Range Host dari IPv4 & CIDR.</p>
            
            <div class="form-group">
                <label for="ip-input">IPv4 Address:</label>
                <input type="text" id="ip-input" placeholder="Contoh: 192.168.1.10">
                <span id="ip-error" class="error-msg"></span>
            </div>

            <div class="form-group">
                <label for="cidr-input">CIDR Prefix (0 - 32):</label>
                <input type="number" id="cidr-input" min="0" max="32" placeholder="Contoh: 24">
                <span id="cidr-error" class="error-msg"></span>
            </div>

            <button id="calc-ip-btn" class="btn-primary">Hitung</button>

            <div id="ip-result" class="result-box hidden">
                <h3>Hasil Perhitungan:</h3>
                <table class="result-table">
                    <tr><td>Network Address</td><td id="res-network">-</td></tr>
                    <tr><td>Broadcast Address</td><td id="res-broadcast">-</td></tr>
                    <tr><td>Subnet Mask</td><td id="res-subnet">-</td></tr>
                    <tr><td>Wildcard Mask</td><td id="res-wildcard">-</td></tr>
                    <tr><td>First Usable IP</td><td id="res-first">-</td></tr>
                    <tr><td>Last Usable IP</td><td id="res-last">-</td></tr>
                    <tr><td>Total Address</td><td id="res-total">-</td></tr>
                    <tr><td>Usable Hosts</td><td id="res-hosts">-</td></tr>
                    <tr><td>IP Class</td><td id="res-class">-</td></tr>
                    <tr><td>Binary Representation</td><td id="res-binary" style="word-break: break-all;">-</td></tr>
                </table>
            </div>
        </div>
    `;

    // Event listener untuk tombol hitung
    const btn = container.querySelector('#calc-ip-btn');
    btn.addEventListener('click', calculateIP);
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

    // Validasi kosong
    let hasError = false;
    if (!ipInput) {
        ipError.textContent = 'Input tidak boleh kosong.';
        hasError = true;
    } else if (!isValidIPv4(ipInput)) {
        ipError.textContent = 'IPv4 tidak valid.';
        hasError = true;
    }

    if (cidrInput === '') {
        cidrError.textContent = 'Input tidak boleh kosong.';
        hasError = true;
    } else {
        const cidr = parseInt(cidrInput, 10);
        if (isNaN(cidr) || cidr < 0 || cidr > 32) {
            cidrError.textContent = 'Cidr harus berada antara 0–32.';
            hasError = true;
        }
    }

    if (hasError) {
        resultBox.classList.add('hidden');
        return;
    }

    // Proses Perhitungan Matematis Jaringan
    const cidr = parseInt(cidrInput, 10);
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

// Helper Functions untuk IP Calculator
function isValidIPv4(ip) {
    const parts = ip.split('.');
    if (parts.length !== 4) return false;
    return parts.every(part => {
        if (part === '' || (part.length > 1 && part.startsWith('0'))) return false;
        const num = Number(part);
        return Number.isInteger(num) && num >= 0 && num <= 255;
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
    const firstOctet = parseInt(ip.split('.')[0], 10);
    if (firstOctet >= 1 && firstOctet <= 126) return 'Class A';
    if (firstOctet >= 128 && firstOctet <= 191) return 'Class B';
    if (firstOctet >= 192 && firstOctet <= 223) return 'Class C';
    if (firstOctet >= 224 && firstOctet <= 239) return 'Class D (Multicast)';
    return 'Class E (Experimental)';
}

function ipToBinary(ip) {
    return ip.split('.').map(octet => {
        return parseInt(octet, 10).toString(2).padStart(8, '0');
    }).join('.');
}

