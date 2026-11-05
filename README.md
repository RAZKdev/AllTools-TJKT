# AllTools TJKT

> Toolkit jaringan komputer untuk siswa dan guru SMK jurusan Teknik Jaringan Komputer dan Telekomunikasi (TJKT).

## 1. Deskripsi Proyek

**AllTools TJKT** adalah aplikasi web satu halaman (*Single Page Application*) yang menyatukan kalkulator jaringan, alat konversi, panduan pengkabelan, referensi standar, dan latihan soal dalam satu antarmuka. Seluruh proses berjalan di browser (*client-side*), tanpa framework, tanpa proses build, dan tetap dapat digunakan tanpa koneksi internet setelah halaman dimuat.

Aplikasi ini ditujukan untuk:

- Siswa SMK jurusan TJKT yang sedang belajar pengalamatan jaringan, subnetting, dan pengkabelan.
- Guru pengampu yang membutuhkan alat bantu demonstrasi di kelas atau laboratorium.
- Teknisi pemula yang membutuhkan referensi cepat saat melakukan *troubleshooting*.

## 2. Kenapa Proyek Ini Dibuat

Materi jaringan komputer sering kali tersebar di banyak alat dan situs: kalkulator subnet di satu tempat, tabel port di tempat lain, panduan kabel di buku, dan latihan soal di kertas. Kondisi ini menyulitkan siswa yang ingin belajar mandiri atau melakukan praktikum dengan cepat.

AllTools TJKT dibuat untuk menyatukan kebutuhan tersebut dalam satu halaman yang ringan dan bisa dibuka di laptop laboratorium berspesifikasi rendah. Fokusnya adalah:

- **Praktis:** perhitungan jaringan langsung terlihat hasilnya tanpa perlu menghafal rumus.
- **Ringan:** tidak membutuhkan instalasi aplikasi berat atau server backend.
- **Bisa offline:** cocok untuk laboratorium dengan koneksi internet terbatas.
- **Mendidik:** setiap alat disertai penjelasan, dan tersedia latihan soal untuk menguji pemahaman.

## 3. Fungsi & Fitur Utama

1. **IP Address Calculator** — menghitung Network Address, Broadcast Address, rentang host yang dapat dipakai, subnet mask, wildcard mask, kelas IP, dan representasi biner dari sebuah alamat IPv4.
2. **Subnet Calculator** — menganalisis pembagian subnet menggunakan notasi CIDR (`/24`, `/28`, dan sebagainya) maupun *dotted decimal mask* (`255.255.255.0`).
3. **MAC Address Tools** — menormalisasi format MAC address, mengekstrak OUI (identitas vendor), menampilkan representasi biner, serta mendeteksi jenis transmisi (Unicast, Multicast, Broadcast, LAA/UAA).
4. **Bandwidth & Transfer Time Calculator** — memperkirakan waktu unduh/unggah berdasarkan ukuran data dan kecepatan koneksi.
5. **Data Unit & Base Converter** — mengonversi biner IPv4 ke desimal, basis bilangan (desimal, biner, oktal, heksadesimal), dan satuan data (Bit, Byte, KB, KiB, MB, MiB, GB, GiB, TB, TiB).
6. **Panduan Kabel UTP & Crimping** — susunan warna pin RJ45 standar T568A dan T568B, perbandingan *Straight-Through* dan *Cross-Over*, fungsi pin data/PoE, serta tips praktikum.
7. **Subnetting Practice & Kuis TJKT** — generator latihan subnetting dengan umpan balik instan dan kuis pilihan ganda dengan beberapa tingkat kesulitan, timer, riwayat sesi, dan analisis kategori materi.
8. **Network Reference** — ringkasan model OSI 7 lapisan, TCP/IP 4 lapisan, tabel port umum, dan protokol jaringan utama.
9. **Pengaturan Data & Feedback** — pengelolaan data `localStorage` (favorit, riwayat akses, progres kuis) dan formulir umpan balik pengguna.
10. **Dukungan Bilingual** — peralihan Bahasa Indonesia dan English secara instan, termasuk penyesuaian atribut aksesibilitas `<html lang>` dan penyimpanan preferensi bahasa.

## 4. Bahasa Pemrograman & Teknologi

| Lapisan | Teknologi |
| --- | --- |
| Struktur halaman | HTML5 semantik |
| Tampilan | CSS3 (Flexbox, CSS Grid, CSS Custom Properties, tema terang/gelap) |
| Logika aplikasi | JavaScript Vanilla ES6+ |
| Penyimpanan lokal | Web Storage API (`localStorage`) |
| Internasionalisasi | Modul i18n ringan tanpa dependensi |

Proyek ini sengaja tidak memakai framework atau library eksternal agar mudah dipelajari, ringan, dan tidak memerlukan langkah build.

## 5. Struktur Direktori

```text
AllTools-TJKT/
├── index.html              # Shell aplikasi dan seluruh markup utama
├── css/
│   └── style.css           # Tema, layout responsif, dan animasi
├── js/
│   ├── main.js             # Inisialisasi aplikasi
│   ├── router.js           # Navigasi antar-halaman berbasis hash
│   ├── storage.js          # Pembungkus localStorage yang aman
│   ├── i18n.js             # Mesin lokalisasi ID/EN
│   └── tools/              # Modul kalkulator dan fitur
│       ├── ip-calculator.js
│       ├── subnet-calculator.js
│       ├── mac-address.js
│       ├── bandwidth.js
│       ├── converters.js
│       ├── cable-wiring.js
│       ├── network-reference.js
│       └── quiz.js
├── data/                   # Data statis (port, protokol, soal kuis, terjemahan)
└── tests/
    └── unit-tests.js       # Pengujian unit berbasis Node.js
```

## 6. Cara Menjalankan

Tidak ada proses instalasi atau build.

**Opsi 1 — Buka langsung:**

```text
Buka file index.html di browser modern (Chrome, Edge, atau Firefox).
```

**Opsi 2 — Server lokal (disarankan agar perilaku sama seperti hosting):**

```bash
python -m http.server 8000
```

Lalu buka `http://localhost:8000` di browser.

## 7. Pengujian

Pengujian unit dapat dijalankan dengan Node.js:

```bash
node tests/unit-tests.js
```

Pengujian mencakup parser IPv4, konverter basis bilangan, konsistensi satuan data, helper `localStorage`, serta perhitungan MAC address dan subnet.

## 8. Catatan

- Aplikasi tidak memiliki backend dan tidak mengirim data ke server mana pun.
- Data favorit, riwayat, dan progres kuis disimpan di `localStorage` browser masing-masing.
- Repo ini belum menyertakan berkas lisensi. Untuk penggunaan di luar keperluan pribadi/pendidikan, hubungi pemilik repo.
