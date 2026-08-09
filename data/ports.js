// Dataset Referensi Port Jaringan Umum
const networkPorts = [
    { port: 20, protocol: "TCP", service: "FTP (Data)", description: "File Transfer Protocol - Data Transfer" },
    { port: 21, protocol: "TCP", service: "FTP (Control)", description: "File Transfer Protocol - Control Connection" },
    { port: 22, protocol: "TCP", service: "SSH", description: "Secure Shell - Remote Login yang aman" },
    { port: 23, protocol: "TCP", service: "Telnet", description: "Unencrypted Text Communications" },
    { port: 25, protocol: "TCP", service: "SMTP", description: "Simple Mail Transfer Protocol - Pengiriman Email" },
    { port: 53, protocol: "UDP/TCP", service: "DNS", description: "Domain Name System - Resolusi Nama Domain" },
    { port: 67, protocol: "UDP", service: "DHCP Server", description: "Dynamic Host Configuration Protocol (Server)" },
    { port: 68, protocol: "UDP", service: "DHCP Client", description: "Dynamic Host Configuration Protocol (Client)" },
    { port: 80, protocol: "TCP", service: "HTTP", description: "Hypertext Transfer Protocol - Web Traffic (Tidak Enkripsi)" },
    { port: 110, protocol: "TCP", service: "POP3", description: "Post Office Protocol v3 - Mengambil Email" },
    { port: 143, protocol: "TCP", service: "IMAP", description: "Internet Message Access Protocol - Mengakses Email" },
    { port: 443, protocol: "TCP", service: "HTTPS", description: "Hypertext Transfer Protocol Secure - Web Traffic (Terenkripsi)" },
    { port: 3389, protocol: "TCP/UDP", service: "RDP", description: "Remote Desktop Protocol - Akses Desktop Jarak Jauh" }
];

