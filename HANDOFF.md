# AllTools TJKT — Handoff & Technical Documentation

## Status Project

AllTools TJKT telah melalui audit menyeluruh, perbaikan bug kritis, penguatan keamanan client-side, dan validasi fungsional 100%.

- **Branch:** `main`
- **Repositori GitHub:** `https://github.com/RAZKdev/AllTools-TJKT.git`
- **Arsitektur:** Single Page Application (SPA), Vanilla HTML5/CSS3/JavaScript (ES6+), client-side & offline-friendly.
- **Backend / Database:** Tidak diperlukan (sengaja ditiadakan untuk menjaga sistem tetap ringan, portabel, dan mudah dipelihara).
- **Automated Tests:** 29/29 Unit Tests PASS (`tests/unit-tests.js`).

---

## Ringkasan Perbaikan & Penguatan (Security Hardening & Bug Fix)

1. **P0.1 IPv4 Binary Converter (Fixed):**
   - Parser membedakan secara deterministik antara format *Dotted Decimal* (192.168.1.1), *Dotted Binary* (11000000.10101000.00000001.00000001), dan *Undotted 32-bit Binary*.
   - Validasi ketat untuk panjang bit (tepat 8 bit per oktet binary), rentang desimal (0-255), serta larangan *leading zeros* tidak sah.
   - Pesan error jelas dan edukatif jika format tidak sesuai.

2. **P0.2 Creator PIN Security & Model Kenyamanan Lokal (Hardened):**
   - Menghilangkan asumsi keamanan semu (*false security assumption*). Sistem tidak lagi mengklaim enkripsi/keamanan server di client-side.
   - Didesain ulang menjadi **Mode Tinjauan Lokal Pembuat (*Local Convenience State*)** untuk membaca feedback yang tersimpan di `localStorage` browser tersebut.
   - PIN default: `1234`.

3. **P1 Number Base Converter Validation (Hardened):**
   - Mencegah *partial parsing* dari `parseInt()`. Karakter ilegal seperti `123XYZ` pada basis 10, digit `2` pada biner, `8/9` pada oktal, atau `G` pada heksadesimal ditolak 100% sebagai input tidak valid.
   - Menggunakan `BigInt` untuk mencegah *precision loss* pada konversi nilai besar.

4. **P1 Defensive Storage & Data Model (Hardened):**
   - `StorageManager` mengimplementasikan defensive parsing `Array.isArray()` dan *try/catch* sehingga tidak crash jika data `localStorage` rusak atau bertipe salah.
   - Schema feedback divalidasi dan dibatasi panjangnya (`title` max 500 karakter, `sender` max 80 karakter).
   - Ditambahkan *rate-limiting* (jeda 4 detik) untuk mencegah spam klik form feedback.
   - Ditambahkan catatan keterbukaan privasi (*privacy disclosure*) sebelum pengiriman form via FormSubmit.

5. **P2 Unit Consistency (Standardized):**
   - Harmonisasi konvensi satuan data:
     - Standar Desimal SI (KB, MB, GB, TB) berbasis 1.000 (10³).
     - Standar Biner IEC (KiB, MiB, GiB, TiB) berbasis 1.024 (2¹⁰).
   - Bandwidth transfer membedakan secara akurat antara *Mbps* (Megabit/detik) dan *MB/s* (Megabyte/detik) dengan konversi 1 MB/s = 8 Mbps.

6. **P2 Dead Code & Redundant Stylesheet Cleanup:**
   - Menghapus elemen mati `#search-results` dari `index.html` dan variabel tidak terpakai dari `router.js`.
   - Menghapus aturan CSS mati `.search-results-container` dari `style.css`.
   - Menghapus berkas stylesheet kosong `css/responsive.css` (0 byte) dan tag pemanggilannya di `index.html` guna menghemat 1 request HTTP.

7. **P2 Startup Script `start.bat` (Race Condition Solved):**
   - Memeriksa ketersediaan runtime `python` / `py`.
   - Memverifikasi koneksi port 8000 via loop pengecekan socket sebelum membuka browser otomatis.
   - Menangani error secara anggun jika server gagal aktif tanpa membuka browser ke halaman *Connection Refused*.

---

## Cara Menjalankan & Menguji

### 1. Menjalankan Server Lokal (Windows)
Cukup klik ganda berkas:
```text
start.bat
```
Atau jalankan via PowerShell:
```powershell
python -m http.server 8000
```
Buka browser di:
```text
http://localhost:8000
```

### 2. Menjalankan Automated Unit Tests
```powershell
node tests/unit-tests.js
```

---

## QA Checkpoint Summary

- **Unit Test Suite:** 29/29 PASS (100% Lulus)
- **JavaScript Syntax Check:** Seluruh berkas PASS
- **HTTP Server Responses:** 16 Resource Shell & 8 Aset Gambar Hardware = 200 OK (0 Broken Link)
- **Git Status:** Siap di-commit secara atomik
