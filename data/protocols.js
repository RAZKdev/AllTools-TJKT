// Dataset Referensi Protokol Jaringan
const networkProtocols = [
    {
        name: "HTTP",
        layer: "Application",
        desc: "Protokol untuk transfer resource web antara client dan server."
    },
    {
        name: "HTTPS",
        layer: "Application",
        desc: "HTTP yang diamankan menggunakan TLS untuk melindungi komunikasi."
    },
    {
        name: "DNS",
        layer: "Application",
        desc: "Sistem resolusi nama domain ke alamat IP dan reverse lookup."
    },
    {
        name: "DHCP",
        layer: "Application",
        desc: "Memberikan konfigurasi jaringan secara otomatis seperti IP address, subnet mask, gateway, dan DNS."
    },
    {
        name: "FTP",
        layer: "Application",
        desc: "Protokol untuk transfer file antara client dan server."
    },
    {
        name: "SSH",
        layer: "Application",
        desc: "Protokol remote access dan administrasi perangkat secara terenkripsi."
    },
    {
        name: "SMTP",
        layer: "Application",
        desc: "Protokol yang digunakan untuk mengirim email."
    },
    {
        name: "POP3",
        layer: "Application",
        desc: "Protokol untuk mengambil email dari mail server."
    },
    {
        name: "IMAP",
        layer: "Application",
        desc: "Protokol untuk mengakses dan mengelola email yang tersimpan di mail server."
    },
    {
        name: "NTP",
        layer: "Application",
        desc: "Protokol untuk sinkronisasi waktu antar perangkat jaringan."
    },
    {
        name: "SNMP",
        layer: "Application",
        desc: "Protokol untuk monitoring dan manajemen perangkat jaringan."
    },
    {
        name: "TCP",
        layer: "Transport",
        desc: "Protokol connection-oriented dengan reliability, sequencing, dan kontrol pengiriman data."
    },
    {
        name: "UDP",
        layer: "Transport",
        desc: "Protokol connectionless dengan overhead rendah tanpa jaminan delivery dari protokolnya sendiri."
    },
    {
        name: "ICMP",
        layer: "Internet",
        desc: "Protokol untuk pesan kontrol dan diagnostik jaringan, termasuk yang digunakan oleh ping."
    },
    {
        name: "IP",
        layer: "Internet",
        desc: "Protokol untuk pengalamatan logis dan routing packet antar jaringan."
    },
    {
        name: "ARP",
        layer: "Network Access",
        desc: "Memetakan IPv4 address ke MAC address pada jaringan lokal."
    },
    {
        name: "SMB",
        layer: "Application",
        desc: "Protokol untuk file sharing, printer sharing, dan layanan jaringan pada berbagai sistem, terutama Windows."
    },
    {
        name: "LDAP",
        layer: "Application",
        desc: "Protokol untuk mengakses dan mengelola informasi directory service."
    }
];
