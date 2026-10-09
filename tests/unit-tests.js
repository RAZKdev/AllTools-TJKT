/**
 * AllTools TJKT - Automated Unit Test Suite
 * Menjalankan pengujian deterministik untuk:
 * 1. IPv4 Decimal & Binary Parser / Validator (P0.1)
 * 2. Number Base Converter Validator (P1)
 * 3. Unit Consistency & Conversions (P2)
 * 4. Defensive LocalStorage Helpers (P1)
 * 5. MAC Address & Subnet Helpers
 */

const assert = require('assert');

// --- Modul Uji ---
let totalTests = 0;
let passedTests = 0;
let failedTests = 0;

function test(name, fn) {
    totalTests++;
    try {
        fn();
        passedTests++;
        console.log(`  ✓ PASS: ${name}`);
    } catch (err) {
        failedTests++;
        console.error(`  ✗ FAIL: ${name}`);
        console.error(`    ${err.message}`);
    }
}

console.log('\n========================================');
console.log('ALLTOOLS-TJKT: AUTOMATED UNIT TESTS');
console.log('========================================\n');

// ----------------------------------------------------
// 1. IPv4 DECIMAL & BINARY PARSER VALIDATION
// ----------------------------------------------------
console.log('[1/9] Menguji IPv4 Decimal & Binary Parser...');

// Definisi spesifikasi parser IPv4 yang benar
function parseIPv4Input(rawInput) {
    const input = String(rawInput || '').trim();
    if (!input) {
        return { success: false, error: 'Input tidak boleh kosong.' };
    }

    // Cek apakah 32-bit binary tanpa pemisah
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
            output: decimal
        };
    }

    // Format dengan titik (harus tepat 4 oktet)
    if (input.includes('.')) {
        const parts = input.split('.');
        if (parts.length !== 4) {
            return { success: false, error: 'IPv4 harus terdiri dari tepat 4 oktet yang dipisahkan titik.' };
        }

        // 1. Format Dotted Binary: Tepat 4 oktet @ 8-bit (hanya 0 dan 1)
        if (parts.every(p => /^[01]{8}$/.test(p))) {
            const decimal = parts.map(b => parseInt(b, 2)).join('.');
            return {
                success: true,
                format: 'binary_dotted',
                decimal: decimal,
                binary: input,
                output: decimal
            };
        }

        // 2. Deteksi jika user bermaksud memasukkan Binary tetapi panjang bit tidak tepat 8
        const hasBinaryOnlyChars = parts.every(p => /^[01]+$/.test(p));
        const hasOctetOver3Digits = parts.some(p => p.length > 3);
        if (hasBinaryOnlyChars && (hasOctetOver3Digits || input.length > 15)) {
            return { success: false, error: 'Format Binary tidak valid: setiap oktet binary harus terdiri dari tepat 8-bit (contoh: 11000000.10101000.00000001.00000001).' };
        }

        // 3. Format Dotted Decimal: setiap oktet adalah angka desimal 0-255
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
            output: binary
        };
    }

    return { success: false, error: 'Format tidak dikenal. Gunakan format desimal (192.168.1.1) atau binary (11000000.10101000.00000001.00000001).' };
}

test('Valid Dotted Decimal IPv4 (192.168.1.1)', () => {
    const res = parseIPv4Input('192.168.1.1');
    assert.strictEqual(res.success, true);
    assert.strictEqual(res.format, 'decimal_dotted');
    assert.strictEqual(res.output, '11000000.10101000.00000001.00000001');
});

test('Valid Dotted Decimal with 0 and 1 only digits (10.0.0.1, 10.10.10.10, 1.0.0.1)', () => {
    const res1 = parseIPv4Input('10.0.0.1');
    assert.strictEqual(res1.success, true);
    assert.strictEqual(res1.format, 'decimal_dotted');
    assert.strictEqual(res1.output, '00001010.00000000.00000000.00000001');

    const res2 = parseIPv4Input('10.10.10.10');
    assert.strictEqual(res2.success, true);
    assert.strictEqual(res2.format, 'decimal_dotted');

    const res3 = parseIPv4Input('1.0.0.1');
    assert.strictEqual(res3.success, true);
    assert.strictEqual(res3.format, 'decimal_dotted');
});

test('Valid Dotted Binary IPv4 (11000000.10101000.00000001.00000001)', () => {
    const res = parseIPv4Input('11000000.10101000.00000001.00000001');
    assert.strictEqual(res.success, true);
    assert.strictEqual(res.format, 'binary_dotted');
    assert.strictEqual(res.output, '192.168.1.1');
});

test('Valid 32-bit Undotted Binary IPv4', () => {
    const res = parseIPv4Input('11000000101010000000000100000001');
    assert.strictEqual(res.success, true);
    assert.strictEqual(res.format, 'binary_continuous');
    assert.strictEqual(res.output, '192.168.1.1');
});

test('Boundary Values: 0.0.0.0 and 255.255.255.255', () => {
    const min = parseIPv4Input('0.0.0.0');
    assert.strictEqual(min.success, true);
    assert.strictEqual(min.output, '00000000.00000000.00000000.00000000');

    const max = parseIPv4Input('255.255.255.255');
    assert.strictEqual(max.success, true);
    assert.strictEqual(max.output, '11111111.11111111.11111111.11111111');
});

test('Reject Octet > 255 (256.1.1.1)', () => {
    const res = parseIPv4Input('256.1.1.1');
    assert.strictEqual(res.success, false);
    assert.match(res.error, /melebihi batas/);
});

test('Reject Insufficient Octets (192.168.1)', () => {
    const res = parseIPv4Input('192.168.1');
    assert.strictEqual(res.success, false);
});

test('Reject Extra Octets (192.168.1.1.1)', () => {
    const res = parseIPv4Input('192.168.1.1.1');
    assert.strictEqual(res.success, false);
});

test('Reject Leading Zero in Decimal (192.168.01.1)', () => {
    const res = parseIPv4Input('192.168.01.1');
    assert.strictEqual(res.success, false);
    assert.match(res.error, /leading zero/);
});

test('Reject Dotted Binary with incorrect bit length (1100000.10101000.00000001.00000001)', () => {
    const res = parseIPv4Input('1100000.10101000.00000001.00000001'); // 7 bits in first octet
    assert.strictEqual(res.success, false);
    assert.match(res.error, /tepat 8-?bit/);
});

test('Reject Illegal Characters (192.168.1.a)', () => {
    const res = parseIPv4Input('192.168.1.a');
    assert.strictEqual(res.success, false);
});

test('Reject Empty or Whitespace', () => {
    const res = parseIPv4Input('   ');
    assert.strictEqual(res.success, false);
});


// ----------------------------------------------------
// 2. NUMBER BASE CONVERTER VALIDATION
// ----------------------------------------------------
console.log('\n[2/9] Menguji Number Base Converter Validator...');

function parseNumberBase(rawVal, base) {
    const val = String(rawVal || '').trim();
    if (!val) {
        return { success: false, error: 'Nilai angka tidak boleh kosong.' };
    }

    const baseInt = parseInt(base, 10);
    const patterns = {
        2: /^[01]+$/,
        8: /^[0-7]+$/,
        10: /^\d+$/,
        16: /^[0-9A-Fa-f]+$/
    };

    const names = { 2: 'Biner', 8: 'Oktal', 10: 'Desimal', 16: 'Heksadesimal' };

    if (!patterns[baseInt]) {
        return { success: false, error: 'Basis asal tidak didukung.' };
    }

    if (!patterns[baseInt].test(val)) {
        return { success: false, error: `Karakter tidak valid untuk bilangan ${names[baseInt]}.` };
    }

    // Periksa batas aman JavaScript (Safe Integer)
    // Gunakan BigInt untuk parsing akurat tanpa bug precision
    try {
        let decBigInt;
        if (baseInt === 10) {
            decBigInt = BigInt(val);
        } else if (baseInt === 2) {
            decBigInt = BigInt('0b' + val);
        } else if (baseInt === 8) {
            decBigInt = BigInt('0o' + val);
        } else if (baseInt === 16) {
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
        return { success: false, error: 'Gagal mengonversi angka (nilai terlalu besar).' };
    }
}

test('Valid Decimal to All Bases (255)', () => {
    const res = parseNumberBase('255', 10);
    assert.strictEqual(res.success, true);
    assert.strictEqual(res.dec, '255');
    assert.strictEqual(res.bin, '11111111');
    assert.strictEqual(res.hex, 'FF');
    assert.strictEqual(res.oct, '377');
});

test('Valid Binary to All Bases (1010)', () => {
    const res = parseNumberBase('1010', 2);
    assert.strictEqual(res.success, true);
    assert.strictEqual(res.dec, '10');
    assert.strictEqual(res.bin, '1010');
    assert.strictEqual(res.hex, 'A');
    assert.strictEqual(res.oct, '12');
});

test('Valid Hexadecimal to All Bases (1A)', () => {
    const res = parseNumberBase('1A', 16);
    assert.strictEqual(res.success, true);
    assert.strictEqual(res.dec, '26');
    assert.strictEqual(res.hex, '1A');
});

test('REJECT Partial Invalid Input (123XYZ in base 10)', () => {
    const res = parseNumberBase('123XYZ', 10);
    assert.strictEqual(res.success, false);
    assert.match(res.error, /tidak valid/);
});

test('REJECT Binary with non-binary digits (1012 in base 2)', () => {
    const res = parseNumberBase('1012', 2);
    assert.strictEqual(res.success, false);
});

test('REJECT Octal with 8 or 9 (189 in base 8)', () => {
    const res = parseNumberBase('189', 8);
    assert.strictEqual(res.success, false);
});

test('REJECT Hexadecimal with invalid characters (1G in base 16)', () => {
    const res = parseNumberBase('1G', 16);
    assert.strictEqual(res.success, false);
});

test('REJECT Floating Point / Decimal Fractions (12.34)', () => {
    const res = parseNumberBase('12.34', 10);
    assert.strictEqual(res.success, false);
});

test('REJECT Negative Numbers (-5)', () => {
    const res = parseNumberBase('-5', 10);
    assert.strictEqual(res.success, false);
});


// ----------------------------------------------------
// 3. DEFENSIVE LOCALSTORAGE & DATA MODEL
// ----------------------------------------------------
console.log('\n[3/9] Menguji Defensive Storage Helpers...');

function safeParseArray(raw, fallback = []) {
    if (typeof raw !== 'string' || !raw.trim()) {
        return fallback;
    }
    try {
        const parsed = JSON.parse(raw);
        return Array.isArray(parsed) ? parsed : fallback;
    } catch {
        return fallback;
    }
}

function sanitizeFeedbackItem(item) {
    if (!item || typeof item !== 'object') return null;
    return {
        id: typeof item.id === 'number' ? item.id : Date.now(),
        type: ['bug', 'suggestion', 'feedback'].includes(item.type) ? item.type : 'feedback',
        icon: typeof item.icon === 'string' ? item.icon.slice(0, 4) : '💬',
        label: typeof item.label === 'string' ? item.label.slice(0, 20) : 'Feedback',
        status: item.status === 'READ' ? 'READ' : 'NEW',
        sender: typeof item.sender === 'string' ? item.sender.trim().slice(0, 80) : 'Pengunjung',
        title: typeof item.title === 'string' ? item.title.trim().slice(0, 500) : '',
        page: typeof item.page === 'string' ? item.page.slice(0, 30) : 'About',
        date: typeof item.date === 'string' ? item.date.slice(0, 30) : '-'
    };
}

test('safeParseArray: handles null or undefined', () => {
    assert.deepStrictEqual(safeParseArray(null), []);
    assert.deepStrictEqual(safeParseArray(undefined), []);
});

test('safeParseArray: handles corrupt JSON string', () => {
    assert.deepStrictEqual(safeParseArray('{invalid json}'), []);
});

test('safeParseArray: handles non-array JSON value (object, number, boolean)', () => {
    assert.deepStrictEqual(safeParseArray('{"name":"test"}'), []);
    assert.deepStrictEqual(safeParseArray('12345'), []);
    assert.deepStrictEqual(safeParseArray('true'), []);
});

test('safeParseArray: successfully parses valid array', () => {
    assert.deepStrictEqual(safeParseArray('["ip-calculator","subnet-calculator"]'), ['ip-calculator', 'subnet-calculator']);
});

test('sanitizeFeedbackItem: protects against malformed object or XSS lengths', () => {
    const sanitized = sanitizeFeedbackItem({
        id: 1234,
        type: 'invalid_type',
        title: 'A'.repeat(1000),
        sender: 'B'.repeat(200)
    });
    assert.strictEqual(sanitized.type, 'feedback');
    assert.strictEqual(sanitized.title.length, 500);
    assert.strictEqual(sanitized.sender.length, 80);
});


// ----------------------------------------------------
// 4. UNIT CONVERSIONS & BANDWIDTH CONSISTENCY
// ----------------------------------------------------
console.log('\n[4/9] Menguji Unit Consistency (SI vs IEC)...');

function calculateBandwidthTransfer(sizeVal, sizeUnit, speedVal, speedUnit) {
    if (isNaN(sizeVal) || sizeVal <= 0 || isNaN(speedVal) || speedVal <= 0) {
        return null;
    }

    // Konvensi Satuan Baku:
    // SI Desimal (KB, MB, GB, TB) berbasis 1000
    // IEC Biner (KiB, MiB, GiB, TiB) berbasis 1024
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

    // Kecepatan Jaringan:
    // 1 Mbps = 1,000,000 bits/s
    // 1 Gbps = 1,000,000,000 bits/s
    // 1 MB/s = 8,000,000 bits/s (1,000,000 Bytes/s * 8)
    let speedInBitsPerSec = 0;
    switch(speedUnit) {
        case 'Kbps': speedInBitsPerSec = speedVal * 1000; break;
        case 'Mbps': speedInBitsPerSec = speedVal * 1000000; break;
        case 'Gbps': speedInBitsPerSec = speedVal * 1000000000; break;
        case 'KB/s': speedInBitsPerSec = speedVal * 1000 * 8; break;
        case 'MB/s': speedInBitsPerSec = speedVal * 1000000 * 8; break;
        default: speedInBitsPerSec = speedVal * 1000000;
    }

    return sizeInBits / speedInBitsPerSec;
}

test('Bandwidth Transfer Time: 100 MB at 100 Mbps = 8.00 seconds', () => {
    // 100 MB = 100,000,000 Bytes = 800,000,000 bits
    // 100 Mbps = 100,000,000 bits/s
    // Waktu = 800,000,000 / 100,000,000 = 8 detik
    const seconds = calculateBandwidthTransfer(100, 'MB', 100, 'Mbps');
    assert.strictEqual(seconds, 8);
});

test('Bandwidth Transfer Time: 100 MB at 10 MB/s = 10.00 seconds', () => {
    // 100 MB / 10 MB/s = 10 detik
    const seconds = calculateBandwidthTransfer(100, 'MB', 10, 'MB/s');
    assert.strictEqual(seconds, 10);
});


// ----------------------------------------------------
// 5. SUBNET & CIDR RECONSTRUCTION
// ----------------------------------------------------
console.log('\n[5/9] Menguji Subnetting & CIDR Math...');

function cidrToMask(cidr) {
    return cidr === 0 ? 0 : (~0 << (32 - cidr)) >>> 0;
}

function maskToCidr(maskInt) {
    let cidr = 0;
    for (let i = 31; i >= 0; i--) {
        if ((maskInt & (1 << i)) !== 0) {
            cidr++;
        } else {
            break;
        }
    }
    const reconstructed = cidr === 0 ? 0 : (~0 << (32 - cidr)) >>> 0;
    return reconstructed === maskInt ? cidr : -1;
}

test('CIDR to Mask and reverse for /24', () => {
    const mask = cidrToMask(24);
    assert.strictEqual(mask, 4294967040); // 255.255.255.0 in uint32
    assert.strictEqual(maskToCidr(mask), 24);
});

test('maskToCidr rejects non-contiguous mask (e.g., 255.0.255.0)', () => {
    // 255.0.255.0 in uint32 = (255 << 24) + (255 << 8)
    const invalidMask = ((255 << 24) | (255 << 8)) >>> 0;
    assert.strictEqual(maskToCidr(invalidMask), -1);
});

// Pengujian MAC Address Normalization & Analysis
const macTools = require('../js/tools/mac-address.js');

test('MAC Normalizer: Standard Colon (AA:BB:CC:DD:EE:FF)', () => {
    assert.strictEqual(macTools.normalizeMacAddress('AA:BB:CC:DD:EE:FF'), 'AA:BB:CC:DD:EE:FF');
    assert.strictEqual(macTools.normalizeMacAddress('aa:bb:cc:dd:ee:ff'), 'AA:BB:CC:DD:EE:FF');
});

test('MAC Normalizer: Hyphen-separated (AA-BB-CC-DD-EE-FF)', () => {
    assert.strictEqual(macTools.normalizeMacAddress('00-1B-44-11-3A-B7'), '00:1B:44:11:3A:B7');
});

test('MAC Normalizer: Cisco Dot Notation (AAAA.BBBB.CCCC)', () => {
    assert.strictEqual(macTools.normalizeMacAddress('0011.2233.4455'), '00:11:22:33:44:55');
    assert.strictEqual(macTools.normalizeMacAddress('c04a.0014.abcd'), 'C0:4A:00:14:AB:CD');
});

test('MAC Normalizer: 12-Hex Undotted (AABBCCDDEEFF)', () => {
    assert.strictEqual(macTools.normalizeMacAddress('AABBCCDDEEFF'), 'AA:BB:CC:DD:EE:FF');
});

test('MAC Normalizer: Rejects Invalid Formats', () => {
    assert.strictEqual(macTools.normalizeMacAddress(''), null);
    assert.strictEqual(macTools.normalizeMacAddress('AA:BB:CC:DD:EE'), null);
    assert.strictEqual(macTools.normalizeMacAddress('AA:BB:CC:DD:EE:GG'), null);
    assert.strictEqual(macTools.normalizeMacAddress('12345'), null);
});

test('MAC Analysis: Broadcast (FF:FF:FF:FF:FF:FF) sets N/A for OUI and Admin', () => {
    const info = macTools.parseMacInfo('FF:FF:FF:FF:FF:FF');
    assert.strictEqual(info.success, true);
    assert.strictEqual(info.type, 'Broadcast');
    assert.strictEqual(info.broadcast, 'Ya');
    assert.strictEqual(info.oui, 'N/A (Broadcast)');
    assert.strictEqual(info.admin, 'N/A (Broadcast)');
});

test('MAC Analysis: Multicast and Unicast with UAA/LAA classification', () => {
    // 01:00:5E:00:00:01 (IPv4 Multicast, UAA)
    const mcast = macTools.parseMacInfo('01:00:5E:00:00:01');
    assert.strictEqual(mcast.success, true);
    assert.strictEqual(mcast.type, 'Multicast');
    assert.strictEqual(mcast.admin, 'Universally Administered (UAA)');
    assert.strictEqual(mcast.broadcast, 'Tidak');

    // 02:00:00:00:00:01 (Unicast, LAA)
    const laa = macTools.parseMacInfo('02:00:00:00:00:01');
    assert.strictEqual(laa.success, true);
    assert.strictEqual(laa.type, 'Unicast');
    assert.strictEqual(laa.admin, 'Locally Administered (LAA)');
});

// ----------------------------------------------------
// 6. STRICT CIDR VALIDATOR (P0.3)
// ----------------------------------------------------
console.log('\n[6/9] Menguji Strict CIDR Prefix Validation...');

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

test('Valid Standard CIDR: 0, 1, 8, 16, 24, 30, 31, 32', () => {
    const validCases = [0, 1, 8, 16, 24, 30, 31, 32];
    for (const val of validCases) {
        const res = parseCIDR(val);
        assert.strictEqual(res.success, true, `Should accept CIDR ${val}`);
        assert.strictEqual(res.cidr, val);
    }
});

test('Valid Slash-prefixed CIDR: /24, /0, /30, /32', () => {
    assert.strictEqual(parseCIDR('/24').success, true);
    assert.strictEqual(parseCIDR('/24').cidr, 24);
    assert.strictEqual(parseCIDR('/0').success, true);
    assert.strictEqual(parseCIDR('/0').cidr, 0);
    assert.strictEqual(parseCIDR('/30').success, true);
    assert.strictEqual(parseCIDR('/30').cidr, 30);
    assert.strictEqual(parseCIDR('/32').success, true);
    assert.strictEqual(parseCIDR('/32').cidr, 32);
});

test('REJECT Out-of-Range CIDR: -1, 33, 100, 999', () => {
    assert.strictEqual(parseCIDR('-1').success, false);
    assert.strictEqual(parseCIDR('33').success, false);
    assert.strictEqual(parseCIDR('100').success, false);
    assert.strictEqual(parseCIDR('999').success, false);
});

test('REJECT Alphanumeric Suffix / Prefix: 24abc, abc24, 24xyz, 1x, 32foo, foo32', () => {
    assert.strictEqual(parseCIDR('24abc').success, false);
    assert.strictEqual(parseCIDR('abc24').success, false);
    assert.strictEqual(parseCIDR(' 24abc').success, false);
    assert.strictEqual(parseCIDR('24xyz').success, false);
    assert.strictEqual(parseCIDR('1x').success, false);
    assert.strictEqual(parseCIDR('32foo').success, false);
    assert.strictEqual(parseCIDR('foo32').success, false);
});

test('REJECT Embedded Whitespace & Trailing Symbols: "24 abc", "24-", "+24", "++", "--"', () => {
    assert.strictEqual(parseCIDR('24 abc').success, false);
    assert.strictEqual(parseCIDR('24-').success, false);
    assert.strictEqual(parseCIDR('+24').success, false);
    assert.strictEqual(parseCIDR('++').success, false);
    assert.strictEqual(parseCIDR('--').success, false);
});

test('REJECT Decimal / Floating Point CIDR: 24.5 and /24.5', () => {
    assert.strictEqual(parseCIDR('24.5').success, false);
    assert.strictEqual(parseCIDR('/24.5').success, false);
});

test('REJECT Empty, Whitespace, Null, or Undefined', () => {
    assert.strictEqual(parseCIDR('').success, false);
    assert.strictEqual(parseCIDR('   ').success, false);
    assert.strictEqual(parseCIDR('/').success, false);
    assert.strictEqual(parseCIDR(null).success, false);
    assert.strictEqual(parseCIDR(undefined).success, false);
});

test('REJECT Leading Zeroes: 01, 00, /024', () => {
    assert.strictEqual(parseCIDR('01').success, false);
    assert.strictEqual(parseCIDR('00').success, false);
    assert.strictEqual(parseCIDR('/024').success, false);
});

// ----------------------------------------------------
// 7. DATA UNIT CONVERTER TEST MATRIX (SI vs IEC)
// ----------------------------------------------------
console.log('\n[7/9] Menguji Data Unit Conversions Matrix (SI vs IEC)...');

function convertDataUnits(val, fromUnit) {
    if (isNaN(val) || val <= 0) return null;
    let bytes = 0;
    switch(fromUnit) {
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
        default: return null;
    }
    return {
        bits: bytes * 8,
        bytes: bytes,
        kb: bytes / 1000,
        kib: bytes / 1024,
        mb: bytes / Math.pow(10, 6),
        mib: bytes / Math.pow(2, 20),
        gb: bytes / Math.pow(10, 9),
        gib: bytes / Math.pow(2, 30),
        tb: bytes / Math.pow(10, 12),
        tib: bytes / Math.pow(2, 40)
    };
}

test('Data Units: 1 Byte = 8 bits, and 8 bits = 1 Byte', () => {
    const res1 = convertDataUnits(1, 'Byte');
    assert.strictEqual(res1.bits, 8);
    assert.strictEqual(res1.bytes, 1);

    const res2 = convertDataUnits(8, 'bit');
    assert.strictEqual(res2.bytes, 1);
});

test('Data Units: 1 KB (SI 1000) vs 1 KiB (IEC 1024)', () => {
    const kb = convertDataUnits(1, 'KB');
    assert.strictEqual(kb.bytes, 1000);
    assert.strictEqual(kb.kb, 1);

    const kib = convertDataUnits(1, 'KiB');
    assert.strictEqual(kib.bytes, 1024);
    assert.strictEqual(kib.kib, 1);
});

test('Data Units: 1 MB (10^6) vs 1 MiB (2^20)', () => {
    const mb = convertDataUnits(1, 'MB');
    assert.strictEqual(mb.bytes, 1000000);

    const mib = convertDataUnits(1, 'MiB');
    assert.strictEqual(mib.bytes, 1048576);
});

test('Data Units: 1 GB (10^9) vs 1 GiB (2^30)', () => {
    const gb = convertDataUnits(1, 'GB');
    assert.strictEqual(gb.bytes, 1000000000);

    const gib = convertDataUnits(1, 'GiB');
    assert.strictEqual(gib.bytes, 1073741824);
});

test('Data Units: 1 TB (10^12) vs 1 TiB (2^40)', () => {
    const tb = convertDataUnits(1, 'TB');
    assert.strictEqual(tb.bytes, 1000000000000);
    assert.strictEqual(tb.tb, 1);

    const tib = convertDataUnits(1, 'TiB');
    assert.strictEqual(tib.bytes, 1099511627776);
    assert.strictEqual(tib.tib, 1);
});

test('Data Units Bidirectional: 1000 GB = 1 TB and 1024 GiB = 1 TiB', () => {
    const fromGB = convertDataUnits(1000, 'GB');
    assert.strictEqual(fromGB.tb, 1);
    assert.strictEqual(fromGB.bytes, 1000000000000);

    const fromGiB = convertDataUnits(1024, 'GiB');
    assert.strictEqual(fromGiB.tib, 1);
    assert.strictEqual(fromGiB.bytes, 1099511627776);
});

test('Data Units Cross-Conversion: 1 TiB to TB (1.09951163) and 1 TB to TiB (0.90949470)', () => {
    const tib = convertDataUnits(1, 'TiB');
    assert.strictEqual(tib.tb.toFixed(8), '1.09951163');

    const tb = convertDataUnits(1, 'TB');
    assert.strictEqual(tb.tib.toFixed(8), '0.90949470');
});

// ----------------------------------------------------
// 8. IPv4 ADDRESS & SPECIAL-RANGE CLASSIFICATION
// ----------------------------------------------------
console.log('\n[8/9] Menguji Klasifikasi IPv4 Address & Special Ranges...');

const { getIpClass } = require('../js/tools/ip-calculator.js');

test('Special — This Network (0.0.0.0/8): 0.0.0.0 and 0.1.2.3', () => {
    assert.strictEqual(getIpClass('0.0.0.0'), 'Special — This Network');
    assert.strictEqual(getIpClass('0.1.2.3'), 'Special — This Network');
    assert.strictEqual(getIpClass('0.255.255.255'), 'Special — This Network');
});

test('Special — Loopback (127.0.0.0/8): 127.0.0.1 and 127.255.255.254', () => {
    assert.strictEqual(getIpClass('127.0.0.1'), 'Special — Loopback');
    assert.strictEqual(getIpClass('127.255.255.254'), 'Special — Loopback');
    assert.strictEqual(getIpClass('127.0.0.0'), 'Special — Loopback');
});

test('Special — Limited Broadcast: 255.255.255.255', () => {
    assert.strictEqual(getIpClass('255.255.255.255'), 'Special — Limited Broadcast');
});

test('Standard Class A (1.0.0.0 to 126.255.255.255)', () => {
    assert.strictEqual(getIpClass('1.0.0.1'), 'Class A');
    assert.strictEqual(getIpClass('10.0.0.1'), 'Class A');
    assert.strictEqual(getIpClass('126.255.255.254'), 'Class A');
});

test('Standard Class B (128.0.0.0 to 191.255.255.255)', () => {
    assert.strictEqual(getIpClass('128.0.0.1'), 'Class B');
    assert.strictEqual(getIpClass('172.16.0.1'), 'Class B');
    assert.strictEqual(getIpClass('191.255.255.254'), 'Class B');
});

test('Standard Class C (192.0.0.0 to 223.255.255.255)', () => {
    assert.strictEqual(getIpClass('192.0.0.1'), 'Class C');
    assert.strictEqual(getIpClass('192.168.1.1'), 'Class C');
    assert.strictEqual(getIpClass('223.255.255.254'), 'Class C');
});

test('Class D — Multicast (224.0.0.0 to 239.255.255.255)', () => {
    assert.strictEqual(getIpClass('224.0.0.1'), 'Class D (Multicast)');
    assert.strictEqual(getIpClass('239.255.255.255'), 'Class D (Multicast)');
});

test('Class E — Reserved (240.0.0.0 to 255.255.255.254)', () => {
    assert.strictEqual(getIpClass('240.0.0.1'), 'Class E (Reserved)');
    assert.strictEqual(getIpClass('254.255.255.254'), 'Class E (Reserved)');
    assert.strictEqual(getIpClass('255.255.255.254'), 'Class E (Reserved)');
});

test('Invalid IP handling in getIpClass', () => {
    assert.strictEqual(getIpClass(''), 'Invalid IP');
    assert.strictEqual(getIpClass(null), 'Invalid IP');
    assert.strictEqual(getIpClass(undefined), 'Invalid IP');
    assert.strictEqual(getIpClass('not-an-ip'), 'Invalid IP');
    assert.strictEqual(getIpClass('256.0.0.1'), 'Invalid IP');
});

// ----------------------------------------------------
// 9. QUIZ MCQ QUESTION SELECTION & POOL INTEGRITY
// ----------------------------------------------------
console.log('\n[9/9] Menguji Integritas Bank Soal & Algoritma Seleksi Kuis...');

const fs = require('fs');
const quizFileContent = fs.readFileSync(require('path').join(__dirname, '../data/quiz-questions.js'), 'utf8');
const loadQuizQuestions = new Function(quizFileContent + '; return mcqQuestions;');
const allQuestions = loadQuizQuestions();

test('Bank Soal Kuis memiliki minimal 100 soal terstruktur', () => {
    assert(Array.isArray(allQuestions));
    assert(allQuestions.length >= 100);
});

test('Validasi integritas struktur setiap soal kuis (q, options 4, answer 0-3, difficulty)', () => {
    allQuestions.forEach((q, idx) => {
        assert(typeof q.q === 'string' && q.q.length > 5, `Soal index ${idx} pertanyaan tidak valid`);
        assert(Array.isArray(q.options) && q.options.length === 4, `Soal index ${idx} harus memiliki 4 opsi`);
        assert(typeof q.answer === 'number' && q.answer >= 0 && q.answer <= 3, `Soal index ${idx} answer harus 0..3`);
        assert(['easy', 'medium', 'hard', 'expert', 'nightmare'].includes(q.difficulty), `Soal index ${idx} difficulty tidak valid: ${q.difficulty}`);
    });
});

test('Algoritma seleksi kuis menghasilkan tepat 25 soal tanpa crash', () => {
    const MCQ_DIFFICULTY_BLUEPRINT = {
        easy: 8,
        medium: 7,
        hard: 5,
        expert: 2,
        nightmare: 3
    };

    const difficultyPools = {
        easy: [],
        medium: [],
        hard: [],
        expert: [],
        nightmare: []
    };

    allQuestions.forEach(question => {
        if (question && difficultyPools[question.difficulty]) {
            difficultyPools[question.difficulty].push(question);
        }
    });

    const currentMcqQuestions = [];
    Object.entries(MCQ_DIFFICULTY_BLUEPRINT).forEach(([difficulty, requiredCount]) => {
        const pool = difficultyPools[difficulty] || [];
        currentMcqQuestions.push(...pool.slice(0, requiredCount));
    });

    if (currentMcqQuestions.length < 25) {
        const selectedSet = new Set(currentMcqQuestions);
        const remaining = allQuestions.filter(q => !selectedSet.has(q));
        const needed = 25 - currentMcqQuestions.length;
        currentMcqQuestions.push(...remaining.slice(0, needed));
    }

    assert.strictEqual(currentMcqQuestions.length, 25);
    const uniqueQuestions = new Set(currentMcqQuestions);
    assert.strictEqual(uniqueQuestions.size, 25);
});

test('Fallback seleksi kuis tetap menghasilkan 25 soal unik jika salah satu pool kosong', () => {
    const mockedPools = {
        easy: allQuestions.filter(q => q.difficulty === 'easy'),
        medium: allQuestions.filter(q => q.difficulty === 'medium'),
        hard: allQuestions.filter(q => q.difficulty === 'hard'),
        expert: [],
        nightmare: allQuestions.filter(q => q.difficulty === 'nightmare')
    };

    const selected = [];
    const blueprint = { easy: 8, medium: 7, hard: 5, expert: 2, nightmare: 3 };
    Object.entries(blueprint).forEach(([d, count]) => {
        selected.push(...(mockedPools[d] || []).slice(0, count));
    });

    assert.strictEqual(selected.length, 23);

    const selectedSet = new Set(selected);
    const remaining = allQuestions.filter(q => !selectedSet.has(q));
    const needed = 25 - selected.length;
    selected.push(...remaining.slice(0, needed));

    assert.strictEqual(selected.length, 25);
    assert.strictEqual(new Set(selected).size, 25);
});

// ----------------------------------------------------
// SUMMARY
// ----------------------------------------------------
console.log('\n========================================');
console.log(`HASIL: ${passedTests}/${totalTests} Pengujian Berhasil`);
if (failedTests > 0) {
    console.error(`Status: ${failedTests} GAGAL!`);
    process.exit(1);
} else {
    console.log('Status: 100% LULUS!');
    console.log('========================================\n');
}
