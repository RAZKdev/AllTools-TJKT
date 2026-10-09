// Modul MAC Address Tools

function renderMacAddressTools(container) {
    container.innerHTML = `
        <div class="tool-card">
            <h2>MAC Address Tools</h2>
            <p class="tool-desc">
                Validasi, normalisasi, dan analisis informasi dasar MAC Address.
            </p>

            <div class="form-group">
                <label for="mac-input">MAC Address:</label>
                <input
                    type="text"
                    id="mac-input"
                    placeholder="Contoh: AA:BB:CC:DD:EE:FF"
                    autocomplete="off"
                >
                <span id="mac-error" class="error-msg"></span>
            </div>

            <button id="analyze-mac-btn" class="btn-primary">
                Analisis MAC
            </button>

            <div id="mac-result" class="result-box hidden">
                <h3>Hasil Analisis:</h3>

                <table class="result-table">
                    <tr>
                        <td>MAC Address</td>
                        <td id="mac-res-standard">-</td>
                    </tr>
                    <tr>
                        <td>Tanpa Separator</td>
                        <td id="mac-res-raw">-</td>
                    </tr>
                    <tr>
                        <td>OUI / Prefix 24-bit</td>
                        <td id="mac-res-oui">-</td>
                    </tr>
                    <tr>
                        <td>Binary</td>
                        <td id="mac-res-binary"
                            style="word-break: break-all;">
                            -
                        </td>
                    </tr>
                    <tr>
                        <td>Jenis Alamat</td>
                        <td id="mac-res-type">-</td>
                    </tr>
                    <tr>
                        <td>Administrasi</td>
                        <td id="mac-res-admin">-</td>
                    </tr>
                    <tr>
                        <td>Broadcast</td>
                        <td id="mac-res-broadcast">-</td>
                    </tr>
                </table>
            </div>
        </div>
    `;

    const button = container.querySelector('#analyze-mac-btn');

    button.addEventListener('click', analyzeMacAddress);

    container.querySelector('#mac-input').addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            analyzeMacAddress();
        }
    });
}

function analyzeMacAddress() {
    const input = document.getElementById('mac-input').value.trim();
    const errorEl = document.getElementById('mac-error');
    const resultBox = document.getElementById('mac-result');

    errorEl.textContent = '';

    const res = parseMacInfo(input);
    if (!res.success) {
        errorEl.textContent = res.error;
        resultBox.classList.add('hidden');
        return;
    }

    document.getElementById('mac-res-standard').textContent = res.standard;
    document.getElementById('mac-res-raw').textContent = res.raw;
    document.getElementById('mac-res-oui').textContent = res.oui;
    document.getElementById('mac-res-binary').textContent = res.binary;
    document.getElementById('mac-res-type').textContent = res.type;
    document.getElementById('mac-res-admin').textContent = res.admin;
    document.getElementById('mac-res-broadcast').textContent = res.broadcast;

    resultBox.classList.remove('hidden');
}

function parseMacInfo(rawInput) {
    const input = String(rawInput || '').trim();
    if (!input) {
        return { success: false, error: 'MAC Address tidak boleh kosong.' };
    }

    const normalized = normalizeMacAddress(input);
    if (!normalized) {
        return {
            success: false,
            error: 'Format MAC tidak valid. Gunakan format AA:BB:CC:DD:EE:FF, AA-BB-CC-DD-EE-FF, AAAA.BBBB.CCCC, atau AABBCCDDEEFF.'
        };
    }

    const raw = normalized.replace(/:/g, '');
    const firstOctet = parseInt(raw.substring(0, 2), 16);

    const isBroadcast = raw === 'FFFFFFFFFFFF';
    const isMulticast = !isBroadcast && (firstOctet & 1) === 1;
    const isLocal = (firstOctet & 2) === 2;

    const binary = raw
        .match(/.{2}/g)
        .map(byte => parseInt(byte, 16).toString(2).padStart(8, '0'))
        .join(' ');

    const oui = isBroadcast ? 'N/A (Broadcast)' : normalized.split(':').slice(0, 3).join(':');
    const type = isBroadcast ? 'Broadcast' : (isMulticast ? 'Multicast' : 'Unicast');
    const admin = isBroadcast
        ? 'N/A (Broadcast)'
        : (isLocal ? 'Locally Administered (LAA)' : 'Universally Administered (UAA)');

    return {
        success: true,
        standard: normalized,
        raw: raw,
        oui: oui,
        binary: binary,
        type: type,
        admin: admin,
        broadcast: isBroadcast ? 'Ya' : 'Tidak',
        isBroadcast: isBroadcast,
        isMulticast: isMulticast,
        isLocal: isLocal
    };
}

function normalizeMacAddress(mac) {
    const input = String(mac || '').trim().toUpperCase();

    const validFormats = [
        /^[0-9A-F]{12}$/,
        /^([0-9A-F]{2}:){5}[0-9A-F]{2}$/,
        /^([0-9A-F]{2}-){5}[0-9A-F]{2}$/,
        /^([0-9A-F]{4}\.){2}[0-9A-F]{4}$/
    ];

    if (!validFormats.some(pattern => pattern.test(input))) {
        return null;
    }

    const raw = input.replace(/[:\-.]/g, '');

    return raw.match(/.{2}/g).join(':');
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        normalizeMacAddress,
        parseMacInfo
    };
}
