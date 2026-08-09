// Dataset Referensi Protokol Jaringan
const networkProtocols = [
    { name: "HTTP", layer: "Application", desc: "Protokol standar untuk transfer halaman web di internet." },
    { name: "HTTPS", layer: "Application", desc: "Versi aman dari HTTP menggunakan enkripsi SSL/TLS." },
    { name: "DNS", layer: "Application", desc: "Penerjemah alamat IP menjadi nama domain yang mudah diingat." },
    { name: "DHCP", layer: "Application", desc: "Pemberian alamat IP otomatis kepada perangkat dalam jaringan." },
    { name: "FTP", layer: "Application", desc: "Protokol untuk mentransfer file antar komputer di jaringan." },
    { name: "SSH", layer: "Application", desc: "Protokol akses jarak jauh yang terenkripsi." },
    { name: "TCP", layer: "Transport", desc: "Protokol koneksi andal, berorientasi sambungan (connection-oriented)." },
    { name: "UDP", layer: "Transport", desc: "Protokol koneksi cepat tanpa jaminan pengiriman (connectionless)." },
    { name: "ICMP", layer: "Network", desc: "Digunakan untuk diagnosa jaringan seperti perintah Ping." },
    { name: "IP", layer: "Network", desc: "Pengalamatan logis perangkat dalam jaringan komputer." }
];

