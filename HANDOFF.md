# AllTools TJKT — Handoff & Technical Documentation

## Status Project

AllTools TJKT telah melalui audit menyeluruh, perbaikan bug kritis, penguatan keamanan client-side, dan validasi fungsional 100%.

- **Branch:** `main`
- **Repositori GitHub:** `https://github.com/RAZKdev/AllTools-TJKT.git`
- **Arsitektur:** Single Page Application (SPA), Vanilla HTML5/CSS3/JavaScript (ES6+), client-side & offline-friendly.
- **Backend / Database:** Tidak diperlukan (sengaja ditiadakan untuk menjaga sistem tetap ringan, portabel, dan mudah dipelihara).
- **Automated Tests:** 37/37 Unit Tests PASS (`tests/unit-tests.js`).

---

## Ringkasan Perbaikan & Penguatan (Security Hardening & Bug Fix)

1. **P0.1 IPv4 Binary Converter (Fixed):**
   - Parser membedakan secara deterministik antara format *Dotted Decimal* (192.168.1.1), *Dotted Binary* (11000000.10101000.00000001.00000001), dan *Undotted 32-bit Binary*.
   - Validasi ketat untuk panjang bit (tepat 8 bit per oktet binary), rentang desimal (0-255), serta larangan *leading zeros* tidak sah.
   - Pesan error jelas dan edukatif jika format tidak sesuai.

2. **P0.2 Creator Mode & Model Kenyamanan Lokal (Hardened):**
   - Menghilangkan asumsi keamanan semu (*false security assumption*). Sistem tidak lagi mengklaim enkripsi/keamanan server di client-side.
   - Fungsi internal di-refactor: `isCreatorAuthenticated()` diubah menjadi `isLocalCreatorModeActive()`.
   - Didesain ulang menjadi **Mode Tinjauan Lokal Pembuat (*Local Convenience State*)** untuk membaca feedback yang tersimpan di `localStorage` browser tersebut.
   - PIN default: `1234`.

3. **P0.3 Strict CIDR Validation (Hardened):**
   - Implementasi parser dan validator mandiri `parseCIDR(rawInput)` pada `ip-calculator.js` dan `subnet-calculator.js`.
   - Input CIDR divalidasi secara ketat sebelum parsing: hanya menerima rentang 0–32, mendukung format awalan slash (`24` maupun `/24`).
   - Mencegah *partial parsing* dari `parseInt()`: menolak input mengandung huruf (`24abc`, `abc24`, ` 24abc`), pecahan desimal (`24.5`), angka negatif (`-1`), angka melebihi batas (`33`, `999`), spasi kosong, dan *leading zeros* (`01`, `00`).
   - Input `#cidr-input` diubah menjadi `type="text"` agar pengguna dapat mengetik `/24` dengan umpan balik pesan validasi yang akurat.

4. **P1 Number Base Converter Validation (Hardened):**
   - Mencegah *partial parsing* dari `parseInt()`. Karakter ilegal seperti `123XYZ` pada basis 10, digit `2` pada biner, `8/9` pada oktal, atau `G` pada heksadesimal ditolak 100% sebagai input tidak valid.
   - Menggunakan `BigInt` untuk mencegah *precision loss* pada konversi nilai besar.

5. **P1 Defensive Storage, Quota Handling & Data Model (Hardened):**
   - `StorageManager` mengimplementasikan defensive parsing `Array.isArray()` dan *try/catch* sehingga tidak crash jika data `localStorage` rusak atau bertipe salah.
   - Diterapkan konstanta pembatas `FEEDBACK_LIMITS`:
     - `MAX_ENTRIES = 50` (kapasitas maksimal masukan lokal, FIFO).
     - `MAX_MESSAGE_LENGTH = 500` karakter.
     - `MAX_CONTACT_LENGTH = 80` karakter.
   - Deteksi `QuotaExceededError` pada `saveFeedback()` dengan notifikasi antarmuka jika kapasitas browser penuh, disertai opsi ekspor JSON dan cadangan pengiriman langsung via Gmail/Email/WhatsApp.
   - Ditambahkan *rate-limiting* (jeda 4 detik) untuk mencegah spam klik form feedback.
   - Ditambahkan catatan keterbukaan privasi (*privacy disclosure*) sebelum pengiriman form via FormSubmit.

6. **P2 Unit Consistency & TB/TiB Outputs (Standardized):**
   - Harmonisasi konvensi satuan data:
     - Standar Desimal SI (KB, MB, GB, TB) berbasis 1.000 (10³ hingga 10¹²).
     - Standar Biner IEC (KiB, MiB, GiB, TiB) berbasis 1.024 (2¹⁰ hingga 2⁴⁰).
   - Menambahkan baris output *Terabytes (TB)* (`#d-tb`) dan *Tebibytes (TiB)* (`#d-tib`) pada tabel hasil kalkulasi Data Unit Converter (`converters.js`).
   - Menambahkan opsi *TiB* pada pemilihan satuan ukuran file di Bandwidth Calculator (`bandwidth.js`).
   - Bandwidth transfer membedakan secara akurat antara *Mbps* (Megabit/detik) dan *MB/s* (Megabyte/detik) dengan konversi baku 1 MB/s = 8 Mbps.

7. **P2 Dead Code & Redundant Stylesheet Cleanup:**
   - Menghapus elemen mati `#search-results` dari `index.html` dan variabel tidak terpakai dari `router.js`.
   - Menghapus aturan CSS mati `.search-results-container` dari `style.css`.
   - Menghapus berkas stylesheet kosong `css/responsive.css` (0 byte) dan tag pemanggilannya di `index.html` guna menghemat 1 request HTTP.

8. **P2 Startup Script `start.bat` (Race Condition Solved):**
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

- **Unit Test Suite:** 37/37 PASS (100% Lulus)
- **JavaScript Syntax Check:** Seluruh berkas PASS
- **HTTP Server Responses:** 16 Resource Shell & 8 Aset Gambar Hardware = 200 OK (0 Broken Link)
- **Git Status:** Siap di-commit secara atomik
