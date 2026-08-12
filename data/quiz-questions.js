const mcqQuestions = [
    // =========================
    // OSI — 8 SOAL
    // =========================
    {
        q: "Layer berapa pada OSI Model yang bertanggung jawab untuk pengalamatan IP (Logical Addressing)?",
        options: [
            "Layer 1 (Physical)",
            "Layer 2 (Data Link)",
            "Layer 3 (Network)",
            "Layer 4 (Transport)"
        ],
        answer: 2,
        category: "OSI",
        difficulty: "easy"
    },
    {
        q: "Layer OSI yang bertanggung jawab terhadap komunikasi end-to-end adalah?",
        options: [
            "Layer 2 (Data Link)",
            "Layer 3 (Network)",
            "Layer 4 (Transport)",
            "Layer 5 (Session)"
        ],
        answer: 2,
        category: "OSI",
        difficulty: "medium"
    },
    {
        q: "Ethernet terutama bekerja pada layer OSI?",
        options: [
            "Physical dan Data Link",
            "Network dan Transport",
            "Session dan Presentation",
            "Transport dan Application"
        ],
        answer: 0,
        category: "OSI",
        difficulty: "easy"
    },
    {
        q: "Layer OSI yang bertanggung jawab terhadap routing packet adalah?",
        options: [
            "Physical",
            "Data Link",
            "Network",
            "Transport"
        ],
        answer: 2,
        category: "OSI",
        difficulty: "hard"
    },
    {
        q: "MAC Address paling berkaitan dengan layer OSI?",
        options: [
            "Layer 1",
            "Layer 2",
            "Layer 3",
            "Layer 4"
        ],
        answer: 1,
        category: "OSI",
        difficulty: "expert"
    },
    {
        q: "Layer OSI yang menangani enkripsi, kompresi, dan translasi format data adalah?",
        options: [
            "Session",
            "Presentation",
            "Transport",
            "Network"
        ],
        answer: 1,
        category: "OSI",
        difficulty: "easy"
    },
    {
        q: "Layer OSI yang mengatur pembentukan dan pemeliharaan sesi komunikasi adalah?",
        options: [
            "Session",
            "Presentation",
            "Network",
            "Data Link"
        ],
        answer: 0,
        category: "OSI",
        difficulty: "medium"
    },
    {
        q: "Urutan layer OSI dari Layer 7 menuju Layer 1 yang benar adalah?",
        options: [
            "Application, Presentation, Session, Transport, Network, Data Link, Physical",
            "Application, Session, Presentation, Network, Transport, Data Link, Physical",
            "Physical, Data Link, Network, Transport, Session, Presentation, Application",
            "Application, Presentation, Transport, Session, Network, Data Link, Physical"
        ],
        answer: 0,
        category: "OSI",
        difficulty: "medium"
    },

    // =========================
    // TCP/IP — 7 SOAL
    // =========================
    {
        q: "Protokol yang menyediakan komunikasi connection-oriented dan reliable adalah?",
        options: [
            "UDP",
            "IP",
            "TCP",
            "ARP"
        ],
        answer: 2,
        category: "TCP/IP",
        difficulty: "easy"
    },
    {
        q: "Protokol yang bersifat connectionless dan memiliki overhead lebih rendah dibanding TCP adalah?",
        options: [
            "TCP",
            "UDP",
            "HTTP",
            "SSH"
        ],
        answer: 1,
        category: "TCP/IP",
        difficulty: "easy"
    },
    {
        q: "Pada model TCP/IP, IP bekerja pada lapisan?",
        options: [
            "Application",
            "Transport",
            "Internet",
            "Network Access"
        ],
        answer: 2,
        category: "TCP/IP",
        difficulty: "easy"
    },
    {
        q: "TCP menggunakan mekanisme apa untuk memastikan koneksi dibuat sebelum pertukaran data?",
        options: [
            "Three-way handshake",
            "ARP broadcast",
            "DNS lookup",
            "DHCP discovery"
        ],
        answer: 0,
        category: "TCP/IP",
        difficulty: "medium"
    },
    {
        q: "Manakah yang merupakan contoh protokol Transport Layer?",
        options: [
            "TCP dan UDP",
            "IP dan ICMP",
            "DNS dan DHCP",
            "HTTP dan FTP"
        ],
        answer: 0,
        category: "TCP/IP",
        difficulty: "medium"
    },
    {
        q: "Jika aplikasi membutuhkan kecepatan dan dapat mentoleransi sebagian packet loss, protokol transport yang biasanya lebih sesuai adalah?",
        options: [
            "TCP",
            "UDP",
            "ARP",
            "ICMP"
        ],
        answer: 1,
        category: "TCP/IP",
        difficulty: "hard"
    },
    {
        q: "Manakah yang bukan termasuk layer utama model TCP/IP?",
        options: [
            "Application",
            "Transport",
            "Internet",
            "Presentation"
        ],
        answer: 3,
        category: "TCP/IP",
        difficulty: "hard"
    },

    // =========================
    // PROTOCOL — 8 SOAL
    // =========================
    {
        q: "Protokol yang digunakan untuk menerjemahkan nama domain menjadi alamat IP adalah?",
        options: [
            "DHCP",
            "DNS",
            "FTP",
            "HTTP"
        ],
        answer: 1,
        category: "Protocol",
        difficulty: "easy"
    },
    {
        q: "Protokol yang digunakan untuk memberikan alamat IP secara otomatis kepada client adalah?",
        options: [
            "DNS",
            "DHCP",
            "FTP",
            "SSH"
        ],
        answer: 1,
        category: "Protocol",
        difficulty: "easy"
    },
    {
        q: "Protokol yang umum digunakan untuk remote access terenkripsi ke perangkat jaringan adalah?",
        options: [
            "HTTP",
            "FTP",
            "SSH",
            "DNS"
        ],
        answer: 2,
        category: "Protocol",
        difficulty: "medium"
    },
    {
        q: "Protokol yang digunakan untuk transfer file antara client dan server adalah?",
        options: [
            "FTP",
            "DNS",
            "ARP",
            "ICMP"
        ],
        answer: 0,
        category: "Protocol",
        difficulty: "easy"
    },
    {
        q: "Protokol yang digunakan untuk mengirim email dari mail client ke mail server adalah?",
        options: [
            "SMTP",
            "DNS",
            "DHCP",
            "ARP"
        ],
        answer: 0,
        category: "Protocol",
        difficulty: "hard"
    },
    {
        q: "Protokol yang digunakan untuk menguji konektivitas dengan mekanisme echo request dan echo reply adalah?",
        options: [
            "ICMP",
            "FTP",
            "SMTP",
            "DHCP"
        ],
        answer: 0,
        category: "Protocol",
        difficulty: "medium"
    },
    {
        q: "Protokol yang memetakan IPv4 Address ke MAC Address dalam jaringan lokal adalah?",
        options: [
            "DNS",
            "ARP",
            "DHCP",
            "HTTP"
        ],
        answer: 1,
        category: "Protocol",
        difficulty: "expert"
    },
    {
        q: "Port default HTTPS adalah?",
        options: [
            "21",
            "22",
            "80",
            "443"
        ],
        answer: 3,
        category: "Protocol",
        difficulty: "hard"
    },

    // =========================
    // IPv4 — 8 SOAL
    // =========================
    {
        q: "Berapa panjang alamat IPv4?",
        options: [
            "32 bit",
            "48 bit",
            "64 bit",
            "128 bit"
        ],
        answer: 0,
        category: "IPv4",
        difficulty: "easy"
    },
    {
        q: "Berapakah jumlah total alamat IPv4 yang dapat direpresentasikan oleh 32 bit?",
        options: [
            "2^16",
            "2^24",
            "2^32",
            "2^64"
        ],
        answer: 2,
        category: "IPv4",
        difficulty: "medium"
    },
    {
        q: "Manakah yang merupakan private IPv4 address?",
        options: [
            "8.8.8.8",
            "172.20.10.5",
            "1.1.1.1",
            "203.0.113.10"
        ],
        answer: 1,
        category: "IPv4",
        difficulty: "easy"
    },
    {
        q: "Rentang private IPv4 Class A yang umum digunakan adalah?",
        options: [
            "10.0.0.0/8",
            "127.0.0.0/8",
            "169.254.0.0/16",
            "224.0.0.0/4"
        ],
        answer: 0,
        category: "IPv4",
        difficulty: "easy"
    },
    {
        q: "Alamat IPv4 127.0.0.1 dikenal sebagai?",
        options: [
            "Broadcast address",
            "Loopback address",
            "Multicast address",
            "Gateway address"
        ],
        answer: 1,
        category: "IPv4",
        difficulty: "easy"
    },
    {
        q: "Alamat 169.254.x.x biasanya muncul ketika host gagal mendapatkan alamat dari?",
        options: [
            "DNS server",
            "DHCP server",
            "FTP server",
            "Web server"
        ],
        answer: 1,
        category: "IPv4",
        difficulty: "expert"
    },
    {
        q: "Berapakah jumlah host usable pada jaringan /24?",
        options: [
            "128",
            "254",
            "256",
            "512"
        ],
        answer: 1,
        category: "IPv4",
        difficulty: "medium"
    },
    {
        q: "Subnet mask 255.255.255.0 setara dengan prefix?",
        options: [
            "/16",
            "/24",
            "/25",
            "/32"
        ],
        answer: 1,
        category: "IPv4",
        difficulty: "hard"
    },

    // =========================
    // SUBNETTING — 10 SOAL
    // =========================
    {
        q: "Berapakah jumlah total alamat IP dalam subnet /26?",
        options: [
            "32",
            "64",
            "128",
            "256"
        ],
        answer: 1,
        category: "Subnetting",
        difficulty: "medium"
    },
    {
        q: "Berapakah jumlah host usable pada subnet /26?",
        options: [
            "30",
            "62",
            "64",
            "126"
        ],
        answer: 1,
        category: "Subnetting",
        difficulty: "medium"
    },
    {
        q: "Berapakah jumlah host usable pada subnet /27?",
        options: [
            "14",
            "30",
            "32",
            "62"
        ],
        answer: 1,
        category: "Subnetting",
        difficulty: "medium"
    },
    {
        q: "Berapakah jumlah host usable pada subnet /28?",
        options: [
            "14",
            "16",
            "30",
            "62"
        ],
        answer: 0,
        category: "Subnetting",
        difficulty: "medium"
    },
    {
        q: "IP 192.168.1.70/26 berada pada network address?",
        options: [
            "192.168.1.0",
            "192.168.1.64",
            "192.168.1.128",
            "192.168.1.192"
        ],
        answer: 1,
        category: "Subnetting",
        difficulty: "hard"
    },
    {
        q: "IP 192.168.10.130/26 berada pada network address?",
        options: [
            "192.168.10.0",
            "192.168.10.64",
            "192.168.10.128",
            "192.168.10.192"
        ],
        answer: 2,
        category: "Subnetting",
        difficulty: "hard"
    },
    {
        q: "Berapakah block size dari subnet mask /27?",
        options: [
            "16",
            "32",
            "64",
            "128"
        ],
        answer: 1,
        category: "Subnetting",
        difficulty: "hard"
    },
    {
        q: "Berapakah block size dari subnet mask /26?",
        options: [
            "16",
            "32",
            "64",
            "128"
        ],
        answer: 2,
        category: "Subnetting",
        difficulty: "hard"
    },
    {
        q: "Network 192.168.1.0/26 memiliki broadcast address?",
        options: [
            "192.168.1.31",
            "192.168.1.63",
            "192.168.1.127",
            "192.168.1.255"
        ],
        answer: 1,
        category: "Subnetting",
        difficulty: "hard"
    },
    {
        q: "IP 10.10.10.200/27 berada pada subnet yang memiliki network address?",
        options: [
            "10.10.10.160",
            "10.10.10.192",
            "10.10.10.224",
            "10.10.10.128"
        ],
        answer: 1,
        category: "Subnetting",
        difficulty: "expert"
    },

    // =========================
    // NETWORK DEVICE — 5 SOAL
    // =========================
    {
        q: "Perangkat jaringan yang digunakan untuk menghubungkan beberapa jaringan berbeda adalah?",
        options: [
            "Switch",
            "Hub",
            "Router",
            "Repeater"
        ],
        answer: 2,
        category: "Network Device",
        difficulty: "hard"
    },
    {
        q: "Perangkat yang meneruskan frame berdasarkan MAC Address adalah?",
        options: [
            "Router",
            "Switch",
            "Modem",
            "Repeater"
        ],
        answer: 1,
        category: "Network Device",
        difficulty: "medium"
    },
    {
        q: "Perangkat yang bekerja dengan memperkuat atau meregenerasi sinyal agar jangkauan transmisi lebih jauh adalah?",
        options: [
            "Repeater",
            "Router",
            "Switch",
            "Firewall"
        ],
        answer: 0,
        category: "Network Device",
        difficulty: "easy"
    },
    {
        q: "Perangkat yang menyediakan koneksi wireless kepada client dalam jaringan disebut?",
        options: [
            "Access Point",
            "Patch Panel",
            "Hub",
            "NIC"
        ],
        answer: 0,
        category: "Network Device",
        difficulty: "easy"
    },
    {
        q: "Perangkat yang dapat melakukan filtering traffic berdasarkan aturan keamanan jaringan adalah?",
        options: [
            "Firewall",
            "Repeater",
            "Hub",
            "Patch Panel"
        ],
        answer: 0,
        category: "Network Device",
        difficulty: "expert"
    },

    // =========================
    // NETWORK FUNDAMENTALS — 4 SOAL
    // =========================
    {
        q: "Apa fungsi utama default gateway pada sebuah host?",
        options: [
            "Menyimpan file pengguna",
            "Menghubungkan host ke jaringan lain",
            "Mengubah MAC Address menjadi IP Address",
            "Memberikan nama domain"
        ],
        answer: 1,
        category: "Network Fundamentals",
        difficulty: "easy"
    },
    {
        q: "Apa fungsi utama MAC Address pada jaringan Ethernet?",
        options: [
            "Identitas hardware pada jaringan lokal",
            "Menentukan subnet mask",
            "Menentukan DNS server",
            "Menentukan nomor port aplikasi"
        ],
        answer: 0,
        category: "Network Fundamentals",
        difficulty: "easy"
    },
    {
        q: "Perintah yang umum digunakan untuk menguji apakah sebuah host dapat dijangkau melalui jaringan adalah?",
        options: [
            "ping",
            "mkdir",
            "cd",
            "format"
        ],
        answer: 0,
        category: "Network Fundamentals",
        difficulty: "easy"
    },
    {
        q: "Jika dua komputer berada pada subnet yang sama, komunikasi langsung biasanya tidak membutuhkan?",
        options: [
            "Network Interface Card",
            "Switch atau media jaringan",
            "Default gateway untuk komunikasi lokal",
            "IP Address"
        ],
        answer: 2,
        category: "Network Fundamentals",
        difficulty: "medium"
    }
];
