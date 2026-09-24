# AllTools TJKT

## 1. Identitas
- **Nama Proyek:** AllTools TJKT
- **Kategori:** Media Pembelajaran & Toolkit Utilitas Jaringan Komputer
- **Target Pengguna:** Siswa SMK jurusan Teknik Jaringan Komputer dan Telekomunikasi (TJKT), guru pengampu, serta teknisi pemula.
- **Model Aplikasi:** Single Page Application (SPA), client-side, dan offline-friendly.

## 2. Bahasa & Teknologi yang Digunakan
- **HTML5:** Struktur semantik halaman web.
- **CSS3:** Tata letak responsif (Flexbox & CSS Grid), animasi halus, serta sistem tema terang/gelap (*CSS Custom Properties*).
- **JavaScript (Vanilla ES6+):** Logika kalkulasi jaringan, interaktivitas antarmuka, routing client-side, serta manajemen state lokal tanpa ketergantungan framework atau library eksternal.

## 3. Fungsi
AllTools TJKT berfungsi sebagai platform sarana belajar, latihan mandiri, dan alat bantu troubleshooting praktis untuk mempercepat pemahaman materi jaringan komputer tanpa perlu menginstal aplikasi berat atau memerlukan koneksi internet aktif.

Aplikasi ini dirancang untuk:
1. Membantu perhitungan pengalamatan jaringan (IP Addressing & Subnetting) secara presisi.
2. Menyediakan konversi format data dan unit kecepatan transmisi secara instan.
3. Memberikan panduan visual perangkat keras dan pengkabelan untuk praktikum laboratorium.
4. Menguji pemahaman teori dan kompetensi keahlian siswa melalui kuis interaktif.

## 4. Penjelasan Fitur

1. **IP Address Calculator**  
   Menganalisis alamat IPv4 dengan memasukkan IP dan CIDR/Netmask untuk menghitung Network Address, Broadcast Address, Usable Host Range, Subnet Mask, Wildcard Mask, kelas IP, serta representasi biner.

2. **Subnet Calculator**  
   Melakukan analisis pembagian subnet dan segmentasi jaringan secara mendalam, baik menggunakan notasi CIDR (`/24`, `/28`, dll.) maupun Dotted Decimal Mask (`255.255.255.0`).

3. **MAC Address Tools**  
   Memeriksa dan menormalisasi format penulisan MAC address (titik dua, tanda hubung, atau format Cisco), mengekstrak 24-bit OUI (identifikasi vendor), representasi biner, serta mendeteksi jenis transmisi (Unicast, Multicast, Broadcast, LAA/UAA).

4. **Bandwidth & Transfer Time Calculator**  
   Mengestimasi durasi unduh atau unggah file berdasarkan ukuran data (KB, MB, GB, TB) dan kecepatan koneksi (Kbps, Mbps, Gbps) untuk perencanaan kapasitas bandwidth jaringan.

5. **Data Unit & Base Converter**  
   Alat konversi multi-tab untuk:
   - Konversi biner IPv4 ke desimal.
   - Konversi basis bilangan (Desimal, Biner, Oktal, Heksadesimal).
   - Konversi satuan data (Bit, Byte, KB, KiB, MB, MiB, GB, GiB, TB, TiB).

6. **Kabel UTP & Panduan Crimping (Wiring Guide)**  
   Panduan visual susunan warna pin RJ45 standar T568A dan T568B, perbandingan kabel Straight-Through dan Cross-Over secara side-by-side, spesifikasi fungsi pin data (Tx/Rx) dan PoE, serta tips praktikum crimping kabel LAN.

7. **Subnetting Practice & Kuis TJKT**  
   Modul latihan interaktif yang mencakup:
   - Generator latihan subnetting acak dengan feedback jawaban instan.
   - Kuis pilihan ganda 25 soal dengan blueprint tingkat kesulitan berimbang (Easy hingga Nightmare), timer per soal, rekap riwayat sesi, dan analisis kategori materi yang perlu diperdalam.

8. **Network Reference**  
   Katalog referensi cepat standar jaringan yang memuat ringkasan 7 Lapisan OSI Model, 4 Lapisan TCP/IP, tabel port umum jaringan (HTTP, HTTPS, SSH, FTP, DNS, DHCP, dll.), serta protokol jaringan utama.

9. **Pengaturan Data & Sistem Feedback**  
   Modal pengelolaan penyimpanan lokal (*localStorage*) untuk melihat atau menghapus data Favorit, Riwayat Akses, Progress Kuis, serta form pengiriman feedback pengguna.
