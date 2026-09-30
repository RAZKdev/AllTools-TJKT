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
console.log('[1/5] Menguji IPv4 Decimal & Binary Parser...');

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
        if (hasBinaryOnlyChars && (hasOctetOver3Digits || parts.some(p => p.length > 1 && p.length !== 8))) {
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
console.log('\n[2/5] Menguji Number Base Converter Validator...');

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
console.log('\n[3/5] Menguji Defensive Storage Helpers...');

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
console.log('\n[4/5] Menguji Unit Consistency (SI vs IEC)...');

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
console.log('\n[5/5] Menguji Subnetting & CIDR Math...');

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

// ----------------------------------------------------
// 6. STRICT CIDR VALIDATOR (P0.3)
// ----------------------------------------------------
console.log('\n[6/6] Menguji Strict CIDR Prefix Validation...');

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

test('Valid Standard CIDR: 0, 1, 8, 16, 24, 31, 32', () => {
    const validCases = [0, 1, 8, 16, 24, 31, 32];
    for (const val of validCases) {
        const res = parseCIDR(val);
        assert.strictEqual(res.success, true, `Should accept CIDR ${val}`);
        assert.strictEqual(res.cidr, val);
    }
});

test('Valid Slash-prefixed CIDR: /24, /0, /32', () => {
    assert.strictEqual(parseCIDR('/24').success, true);
    assert.strictEqual(parseCIDR('/24').cidr, 24);
    assert.strictEqual(parseCIDR('/0').success, true);
    assert.strictEqual(parseCIDR('/0').cidr, 0);
    assert.strictEqual(parseCIDR('/32').success, true);
    assert.strictEqual(parseCIDR('/32').cidr, 32);
});

test('REJECT Out-of-Range CIDR: -1 and 33', () => {
    assert.strictEqual(parseCIDR('-1').success, false);
    assert.strictEqual(parseCIDR('33').success, false);
    assert.strictEqual(parseCIDR('999').success, false);
});

test('REJECT Alphanumeric Suffix / Prefix: 24abc, abc24, 24xyz, 1x', () => {
    assert.strictEqual(parseCIDR('24abc').success, false);
    assert.strictEqual(parseCIDR('abc24').success, false);
    assert.strictEqual(parseCIDR(' 24abc').success, false);
    assert.strictEqual(parseCIDR('24xyz').success, false);
    assert.strictEqual(parseCIDR('1x').success, false);
});

test('REJECT Decimal / Floating Point CIDR: 24.5', () => {
    assert.strictEqual(parseCIDR('24.5').success, false);
    assert.strictEqual(parseCIDR('/24.5').success, false);
});

test('REJECT Empty, Whitespace, or Lone Slash: "", "   ", "/"', () => {
    assert.strictEqual(parseCIDR('').success, false);
    assert.strictEqual(parseCIDR('   ').success, false);
    assert.strictEqual(parseCIDR('/').success, false);
});

test('REJECT Leading Zeroes: 01, 00, /024', () => {
    assert.strictEqual(parseCIDR('01').success, false);
    assert.strictEqual(parseCIDR('00').success, false);
    assert.strictEqual(parseCIDR('/024').success, false);
});

test('Data Unit Converter: TB (10^12) and TiB (2^40) conversions', () => {
    // 1 TB = 1,000,000,000,000 Bytes
    const tbBytes = 1 * Math.pow(10, 12);
    assert.strictEqual(tbBytes, 1000000000000);

    // 1 TiB = 1,099,511,627,776 Bytes
    const tibBytes = 1 * Math.pow(2, 40);
    assert.strictEqual(tibBytes, 1099511627776);

    // 1 TiB in TB = 1.099511627776 TB
    const tibToTb = (tibBytes / Math.pow(10, 12)).toFixed(8);
    assert.strictEqual(tibToTb, '1.09951163');
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
