// Dataset Referensi Port Jaringan Umum
const networkPorts = [
    {
        port: 20,
        protocol: "TCP",
        service: "FTP (Data)",
        description: "Transfer data pada FTP."
    },
    {
        port: 21,
        protocol: "TCP",
        service: "FTP (Control)",
        description: "Control connection pada FTP."
    },
    {
        port: 22,
        protocol: "TCP",
        service: "SSH",
        description: "Remote access dan administrasi perangkat secara terenkripsi."
    },
    {
        port: 23,
        protocol: "TCP",
        service: "Telnet",
        description: "Remote access tanpa enkripsi."
    },
    {
        port: 25,
        protocol: "TCP",
        service: "SMTP",
        description: "Pengiriman email antar mail server atau dari client ke mail server."
    },
    {
        port: 53,
        protocol: "UDP/TCP",
        service: "DNS",
        description: "Resolusi nama domain dan layanan DNS."
    },
    {
        port: 67,
        protocol: "UDP",
        service: "DHCP Server",
        description: "Port server untuk DHCP."
    },
    {
        port: 68,
        protocol: "UDP",
        service: "DHCP Client",
        description: "Port client untuk DHCP."
    },
    {
        port: 80,
        protocol: "TCP",
        service: "HTTP",
        description: "Web traffic HTTP tanpa TLS."
    },
    {
        port: 110,
        protocol: "TCP",
        service: "POP3",
        description: "Mengambil email dari mail server."
    },
    {
        port: 123,
        protocol: "UDP",
        service: "NTP",
        description: "Sinkronisasi waktu antar perangkat jaringan."
    },
    {
        port: 143,
        protocol: "TCP",
        service: "IMAP",
        description: "Mengakses dan mengelola email pada mail server."
    },
    {
        port: 161,
        protocol: "UDP",
        service: "SNMP",
        description: "Monitoring dan manajemen perangkat jaringan."
    },
    {
        port: 162,
        protocol: "UDP",
        service: "SNMP Trap",
        description: "Menerima notifikasi atau event dari perangkat jaringan."
    },
    {
        port: 389,
        protocol: "TCP/UDP",
        service: "LDAP",
        description: "Directory services untuk menyimpan dan mengakses informasi direktori."
    },
    {
        port: 443,
        protocol: "TCP",
        service: "HTTPS",
        description: "Web traffic HTTP yang diamankan menggunakan TLS."
    },
    {
        port: 445,
        protocol: "TCP",
        service: "SMB",
        description: "File dan printer sharing pada jaringan, terutama lingkungan Windows."
    },
    {
        port: 636,
        protocol: "TCP",
        service: "LDAPS",
        description: "LDAP yang diamankan menggunakan TLS."
    },
    {
        port: 3389,
        protocol: "TCP/UDP",
        service: "RDP",
        description: "Remote Desktop Protocol untuk akses desktop jarak jauh."
    }
];
