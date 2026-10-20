// Modul Subnet Calculator
function renderSubnetCalculator(container) {
    container.innerHTML = `
        <div class="tool-card">
            <h2 data-i18n="subnetCalc.title">Subnet Calculator</h2>
            <p class="tool-desc" data-i18n="subnetCalc.desc">Analisis detail subnet jaringan berdasarkan Network IP dan Subnet Mask atau CIDR.</p>
            
            <div class="form-group">
                <label for="subnet-ip-input" data-i18n="subnetCalc.ipLabel">Network IP / IP Address:</label>
                <input type="text" id="subnet-ip-input" placeholder="Contoh: 192.168.1.0" data-i18n-placeholder="subnetCalc.ipPlaceholder">
                <span id="subnet-ip-error" class="error-msg"></span>
            </div>

            <div class="form-group">
                <label for="subnet-mask-input" data-i18n="subnetCalc.maskLabel">Subnet Mask / CIDR:</label>
                <input type="text" id="subnet-mask-input" placeholder="Contoh: 255.255.255.0 atau 24" data-i18n-placeholder="subnetCalc.maskPlaceholder">
                <span id="subnet-mask-error" class="error-msg"></span>
            </div>

            <button id="calc-subnet-btn" class="btn-primary" data-i18n="subnetCalc.calcBtn">Hitung Subnet</button>

            <div id="subnet-result" class="result-box hidden">
                <h3 data-i18n="subnetCalc.resTitle">Hasil Subnetting:</h3>
                <table class="result-table">
                    <tr><td data-i18n="subnetCalc.network">Network Address</td><td id="sub-res-network">-</td></tr>
                    <tr><td data-i18n="subnetCalc.broadcast">Broadcast Address</td><td id="sub-res-broadcast">-</td></tr>
                    <tr><td data-i18n="subnetCalc.hostRange">Host Range</td><td id="sub-res-range">-</td></tr>
                    <tr><td data-i18n="subnetCalc.numHosts">Number of Hosts</td><td id="sub-res-hosts">-</td></tr>
                    <tr><td data-i18n="subnetCalc.subnetMask">Subnet Mask</td><td id="sub-res-mask">-</td></tr>
                    <tr><td data-i18n="subnetCalc.wildcardMask">Wildcard Mask</td><td id="sub-res-wildcard">-</td></tr>
                </table>
            </div>
        </div>
    `;

    const btn = container.querySelector('#calc-subnet-btn');
    btn.addEventListener('click', calculateSubnet);
}

function calculateSubnet() {
    const ipInput = document.getElementById('subnet-ip-input').value.trim();
    const maskInput = document.getElementById('subnet-mask-input').value.trim();
    
    const ipError = document.getElementById('subnet-ip-error');
    const maskError = document.getElementById('subnet-mask-error');
    const resultBox = document.getElementById('subnet-result');

    ipError.textContent = '';
    maskError.textContent = '';

    const t = (path) => (typeof I18n !== 'undefined' ? I18n.t(path) : path);

    let hasError = false;
    if (!ipInput) {
        ipError.textContent = t('subnetCalc.errEmptyIp') || 'Input tidak boleh kosong.';
        hasError = true;
    } else if (!isValidIPv4(ipInput)) {
        ipError.textContent = t('subnetCalc.errInvalidIp') || 'IP Address tidak valid.';
        hasError = true;
    }

    let maskLong = 0;
    let cidr = 0;

    if (!maskInput) {
        maskError.textContent = 'Input tidak boleh kosong.';
        hasError = true;
    } else {
        if (maskInput.includes('.')) {
            // Format Subnet Mask (contoh: 255.255.255.0)
            if (!isValidIPv4(maskInput)) {
                maskError.textContent = 'Subnet Mask tidak valid.';
                hasError = true;
            } else {
                maskLong = ipToInt(maskInput);
                cidr = maskToCidr(maskLong);
                if (cidr === -1) {
                    maskError.textContent = 'Format Subnet Mask tidak berurutan dengan benar.';
                    hasError = true;
                }
            }
        } else {
            // Format CIDR (contoh: 24 atau /24)
            const cidrRes = parseCIDR(maskInput);
            if (!cidrRes.success) {
                maskError.textContent = cidrRes.error;
                hasError = true;
            } else {
                cidr = cidrRes.cidr;
                maskLong = cidrToMask(cidr);
            }
        }
    }

    if (hasError) {
        resultBox.classList.add('hidden');
        return;
    }

    const ipLong = ipToInt(ipInput);
    const netLong = ipLong & maskLong;
    const wildLong = ~maskLong >>> 0;
    const broadLong = netLong | wildLong;

    document.getElementById('sub-res-network').textContent = intToIp(netLong);
    document.getElementById('sub-res-broadcast').textContent = intToIp(broadLong);
    
    let hostRange = '-';
    let totalHosts = 0;

    if (cidr === 32) {
        hostRange = intToIp(netLong) + ' (Host Tunggal)';
        totalHosts = 1;
    } else if (cidr === 31) {
        hostRange = `${intToIp(netLong)} s/d ${intToIp(broadLong)} (Point-to-Point)`;
        totalHosts = 2;
    } else {
        hostRange = `${intToIp(netLong + 1)} s/d ${intToIp(broadLong - 1)}`;
        totalHosts = Math.pow(2, 32 - cidr) - 2;
    }

    document.getElementById('sub-res-range').textContent = hostRange;
    document.getElementById('sub-res-hosts').textContent = totalHosts > 0 ? totalHosts : 0;
    document.getElementById('sub-res-mask').textContent = intToIp(maskLong);
    document.getElementById('sub-res-wildcard').textContent = intToIp(wildLong);

    resultBox.classList.remove('hidden');
}

// Helper Tambahan untuk Subnet Mask
function maskToCidr(maskInt) {
    let cidr = 0;
    for (let i = 31; i >= 0; i--) {
        if ((maskInt & (1 << i)) !== 0) {
            cidr++;
        } else {
            break;
        }
    }
    // Validasi apakah bit setelahnya ada yang bernilai 1 (tidak valid mask)
    const reconstructed = cidr === 0 ? 0 : (~0 << (32 - cidr)) >>> 0;
    return reconstructed === maskInt ? cidr : -1;
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        maskToCidr,
        calculateSubnet,
        renderSubnetCalculator
    };
}
