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
    },

    // =========================
    // OSI — V2-A — SOAL 51-54
    // =========================
    {
        q: "Layer OSI yang bertugas mengirimkan bit mentah melalui media fisik adalah?",
        options: [
            "Physical",
            "Data Link",
            "Network",
            "Transport"
        ],
        answer: 0,
        category: "OSI",
        difficulty: "easy"
    },
    {
        q: "Sebuah switch Ethernet menggunakan MAC Address tujuan untuk menentukan port keluaran frame. Proses tersebut terutama berada pada layer?",
        options: [
            "Physical",
            "Data Link",
            "Network",
            "Transport"
        ],
        answer: 1,
        category: "OSI",
        difficulty: "easy"
    },
    {
        q: "Ketika data aplikasi berukuran besar dipecah menjadi unit-unit yang lebih kecil untuk dikirim melalui jaringan dan kemudian disusun kembali di tujuan, fungsi tersebut terutama berkaitan dengan layer?",
        options: [
            "Data Link",
            "Network",
            "Transport",
            "Presentation"
        ],
        answer: 2,
        category: "OSI",
        difficulty: "medium"
    },
    {
        q: "Sebuah host mengirim data ke host pada jaringan IP yang berbeda. Pada proses tersebut, layer yang menangani routing dan layer yang membentuk frame Ethernet secara berurutan adalah?",
        options: [
            "Network lalu Data Link",
            "Data Link lalu Network",
            "Transport lalu Physical",
            "Physical lalu Transport"
        ],
        answer: 0,
        category: "OSI",
        difficulty: "hard"
    },

    // =========================
    // TCP/IP — V2-A — SOAL 55-57
    // =========================
    {
        q: "Pada model TCP/IP, protokol IP terutama berada pada layer?",
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
        q: "Fungsi nomor port seperti 80, 443, dan 22 terutama digunakan pada layer?",
        options: [
            "Physical",
            "Internet",
            "Transport",
            "Network Access"
        ],
        answer: 2,
        category: "TCP/IP",
        difficulty: "medium"
    },
    {
        q: "Sebuah client mengirim SYN ke server dan menerima SYN-ACK, tetapi ACK terakhir dari client tidak pernah sampai ke server. Kondisi yang paling tepat adalah?",
        options: [
            "Koneksi TCP sudah sepenuhnya established",
            "Server tetap menunggu penyelesaian three-way handshake",
            "DNS server gagal menerjemahkan nama domain",
            "ARP langsung mengganti fungsi TCP"
        ],
        answer: 1,
        category: "TCP/IP",
        difficulty: "hard"
    },

    // =========================
    // PROTOCOL — V2-A — SOAL 58-61
    // =========================
    {
        q: "Protokol yang menerjemahkan nama domain seperti example.com menjadi alamat IP adalah?",
        options: [
            "DNS",
            "DHCP",
            "FTP",
            "ARP"
        ],
        answer: 0,
        category: "Protocol",
        difficulty: "easy"
    },
    {
        q: "Protokol yang digunakan client untuk meminta konfigurasi IP secara otomatis dari server adalah?",
        options: [
            "DNS",
            "DHCP",
            "HTTP",
            "ICMP"
        ],
        answer: 1,
        category: "Protocol",
        difficulty: "easy"
    },
    {
        q: "HTTPS memberikan perlindungan terhadap data HTTP terutama dengan menambahkan mekanisme keamanan dari?",
        options: [
            "ARP",
            "TLS",
            "DHCP",
            "ICMP"
        ],
        answer: 1,
        category: "Protocol",
        difficulty: "medium"
    },
    {
        q: "Sebuah client gagal memperoleh konfigurasi DHCP dan akhirnya menggunakan alamat 169.254.x.x. Urutan kejadian yang paling masuk akal adalah?",
        options: [
            "Client gagal memperoleh lease DHCP lalu menggunakan mekanisme link-local",
            "DNS memberikan alamat 169.254.x.x secara otomatis",
            "Router selalu memberikan 169.254.x.x ketika internet mati",
            "ARP menggantikan DHCP dan membuat alamat publik"
        ],
        answer: 0,
        category: "Protocol",
        difficulty: "expert"
    },

    // =========================
    // IPv4 — V2-A — SOAL 62-65
    // =========================
    {
        q: "Manakah yang termasuk private IPv4 address?",
        options: [
            "10.25.4.8",
            "8.8.8.8",
            "1.1.1.1",
            "224.0.0.1"
        ],
        answer: 0,
        category: "IPv4",
        difficulty: "easy"
    },
    {
        q: "Sebuah subnet menggunakan 192.168.10.96/27. Range host usable yang benar adalah?",
        options: [
            "192.168.10.96 - 192.168.10.127",
            "192.168.10.97 - 192.168.10.126",
            "192.168.10.98 - 192.168.10.125",
            "192.168.10.97 - 192.168.10.127"
        ],
        answer: 1,
        category: "IPv4",
        difficulty: "medium"
    },
    {
        q: "Sebuah host menggunakan alamat 172.16.35.10/20. Network address yang benar adalah?",
        options: [
            "172.16.16.0",
            "172.16.32.0",
            "172.16.35.0",
            "172.16.48.0"
        ],
        answer: 1,
        category: "IPv4",
        difficulty: "hard"
    },
    {
        q: "Host A memiliki alamat 192.168.14.130/23 dengan gateway 192.168.15.1. Host B memiliki alamat 192.168.12.20/23. Kesimpulan yang benar adalah?",
        options: [
            "Host A dan B berada pada subnet yang sama sehingga gateway tidak diperlukan",
            "Host A berada di 192.168.14.0/23 dan Host B di 192.168.12.0/23, sehingga komunikasi antarhost membutuhkan routing",
            "Host A salah karena gateway 192.168.15.1 berada di subnet berbeda",
            "Host B harus menggunakan mask /24 agar dapat berkomunikasi dengan Host A"
        ],
        answer: 1,
        category: "IPv4",
        difficulty: "nightmare"
    },

    // =========================
    // SUBNETTING — V2-A — SOAL 66-70
    // =========================
    {
        q: "Sebuah subnet /30 memiliki berapa jumlah total alamat IP?",
        options: [
            "2",
            "4",
            "6",
            "8"
        ],
        answer: 1,
        category: "Subnetting",
        difficulty: "easy"
    },
    {
        q: "Sebuah subnet /29 menyediakan berapa host usable pada subnet IPv4 biasa?",
        options: [
            "6",
            "8",
            "14",
            "30"
        ],
        answer: 0,
        category: "Subnetting",
        difficulty: "medium"
    },
    {
        q: "IP 192.168.50.77/28 berada pada network address?",
        options: [
            "192.168.50.48",
            "192.168.50.64",
            "192.168.50.72",
            "192.168.50.80"
        ],
        answer: 1,
        category: "Subnetting",
        difficulty: "hard"
    },
    {
        q: "Sebuah jaringan 192.168.100.0/24 harus dibagi menggunakan VLSM untuk kebutuhan 100 host, 50 host, dan 20 host. Rancangan prefix minimum yang paling efisien secara berurutan adalah?",
        options: [
            "/25, /26, /27",
            "/26, /26, /28",
            "/25, /27, /28",
            "/24, /25, /26"
        ],
        answer: 0,
        category: "Subnetting",
        difficulty: "expert"
    },
    {
        q: "Network 172.16.0.0/23 harus dibagi menggunakan VLSM untuk kebutuhan 120, 60, 30, 14, dan 6 host. Urutan prefix minimum yang paling efisien setelah kebutuhan diurutkan dari terbesar ke terkecil adalah?",
        options: [
            "/25, /26, /27, /28, /29",
            "/26, /27, /28, /29, /30",
            "/25, /25, /26, /27, /28",
            "/24, /25, /26, /27, /28"
        ],
        answer: 0,
        category: "Subnetting",
        difficulty: "nightmare"
    },

    // =========================
    // NETWORK DEVICE — V2-A — SOAL 71-73
    // =========================
    {
        q: "Perangkat yang digunakan untuk meneruskan paket antarjaringan IP yang berbeda adalah?",
        options: [
            "Switch",
            "Router",
            "Hub",
            "Patch Panel"
        ],
        answer: 1,
        category: "Network Device",
        difficulty: "easy"
    },
    {
        q: "Sebuah switch menerima frame broadcast dari satu port. Mengapa switch dapat meneruskan frame tersebut ke beberapa port lain?",
        options: [
            "Karena broadcast memang harus dikirim ke seluruh port dalam broadcast domain yang sesuai",
            "Karena switch selalu mengganti broadcast menjadi unicast",
            "Karena switch menggunakan DNS untuk memilih port",
            "Karena switch menggunakan default gateway untuk setiap frame"
        ],
        answer: 0,
        category: "Network Device",
        difficulty: "medium"
    },
    {
        q: "Client pada VLAN 10 dapat berkomunikasi dengan client VLAN 10, tetapi gagal mencapai VLAN 20. Kedua VLAN melewati trunk menuju router. Pemeriksaan paling tepat adalah?",
        options: [
            "Periksa router subinterface, VLAN tagging pada trunk, dan default gateway masing-masing VLAN",
            "Ganti semua kabel menjadi crossover",
            "Nonaktifkan ARP pada seluruh client",
            "Ganti DNS server tanpa memeriksa konfigurasi VLAN"
        ],
        answer: 0,
        category: "Network Device",
        difficulty: "nightmare"
    },

    // =========================
    // NETWORK FUNDAMENTALS — V2-A — SOAL 74-75
    // =========================
    {
        q: "Sebuah PC dapat berkomunikasi dengan host dalam subnet lokal tetapi tidak dapat mencapai jaringan lain. Konfigurasi yang paling penting untuk diperiksa terlebih dahulu adalah?",
        options: [
            "Default gateway",
            "Nama komputer",
            "Resolusi layar",
            "Wallpaper desktop"
        ],
        answer: 0,
        category: "Network Fundamentals",
        difficulty: "medium"
    },
    {
        q: "Sebuah client berhasil memperoleh IP melalui DHCP, dapat ping default gateway, dapat melakukan ping ke alamat IP server, dan DNS juga berhasil me-resolve nama server. Namun koneksi HTTPS ke server selalu timeout, sedangkan client lain dapat mengakses server yang sama. Pemeriksaan paling tepat pada client tersebut adalah?",
        options: [
            "Periksa firewall lokal, proxy, atau kebijakan outbound TCP port 443 pada client",
            "Ganti subnet mask server tanpa melakukan pengujian lain",
            "Hapus MAC Address server dari switch",
            "Matikan DNS server karena DNS sudah pasti menjadi penyebab"
        ],
        answer: 0,
        category: "Network Fundamentals",
        difficulty: "nightmare"
    },

    // =========================
    // OSI — V2-B — SOAL 76-79
    // =========================
    {
        q: "Pada OSI Model, proses pembentukan frame Ethernet terutama berkaitan dengan layer?",
        options: [
            "Physical",
            "Data Link",
            "Network",
            "Transport"
        ],
        answer: 1,
        category: "OSI",
        difficulty: "easy"
    },
    {
        q: "Sebuah data aplikasi bergerak dari Layer 7 menuju Layer 1 sebelum dikirim melalui media. Pada proses tersebut, layer Transport menambahkan informasi yang diperlukan untuk komunikasi end-to-end. Konsep yang paling tepat adalah?",
        options: [
            "Encapsulation",
            "Routing",
            "Broadcasting",
            "Address Resolution"
        ],
        answer: 0,
        category: "OSI",
        difficulty: "medium"
    },
    {
        q: "Sebuah router menerima paket IPv4 dan harus meneruskannya ke jaringan lain. Router menggunakan informasi destination IP dan routing table untuk menentukan jalur, sedangkan frame baru pada interface keluar menggunakan MAC Address yang sesuai dengan next hop. Proses tersebut menunjukkan interaksi utama antara layer?",
        options: [
            "Physical dan Presentation",
            "Data Link dan Network",
            "Session dan Transport",
            "Application dan Presentation"
        ],
        answer: 1,
        category: "OSI",
        difficulty: "hard"
    },
    {
        q: "Host A berada di subnet 192.168.1.0/24 dan gateway-nya 192.168.1.1. Host A mengirim paket ke 10.10.10.20. Destination IP pada paket tetap 10.10.10.20, tetapi destination MAC pada frame pertama adalah MAC gateway. Ketika router meneruskan paket, router membuat frame baru pada interface keluar. Penjelasan yang paling tepat adalah?",
        options: [
            "IP Address tujuan berubah setiap kali paket melewati router, sedangkan MAC Address selalu tetap",
            "MAC Address digunakan untuk komunikasi lokal per-hop, sedangkan destination IP digunakan untuk menentukan host tujuan end-to-end",
            "Router hanya meneruskan frame tanpa mengubah header layer 2",
            "MAC Address menentukan routing antarjaringan dan IP hanya digunakan oleh switch"
        ],
        answer: 1,
        category: "OSI",
        difficulty: "nightmare"
    },

    // =========================
    // TCP/IP — V2-B — SOAL 80-82
    // =========================
    {
        q: "Dalam model TCP/IP, TCP dan UDP berada pada layer?",
        options: [
            "Application",
            "Transport",
            "Internet",
            "Network Access"
        ],
        answer: 1,
        category: "TCP/IP",
        difficulty: "easy"
    },
    {
        q: "Sebuah server menjalankan HTTPS pada TCP port 443. Fungsi nomor port tersebut terutama adalah?",
        options: [
            "Menentukan alamat jaringan tujuan",
            "Membedakan layanan atau proses aplikasi pada host tujuan",
            "Menentukan MAC Address tujuan",
            "Menentukan jenis kabel yang digunakan"
        ],
        answer: 1,
        category: "TCP/IP",
        difficulty: "medium"
    },
    {
        q: "Sebuah koneksi TCP sedang berlangsung. Salah satu segment tidak memperoleh acknowledgement dalam waktu yang sesuai sehingga pengirim melakukan retransmission. Mekanisme tersebut menunjukkan fungsi TCP dalam?",
        options: [
            "Reliable delivery",
            "MAC learning",
            "DNS resolution",
            "IP subnetting"
        ],
        answer: 0,
        category: "TCP/IP",
        difficulty: "hard"
    },

    // =========================
    // PROTOCOL — V2-B — SOAL 83-86
    // =========================
    {
        q: "Protokol yang digunakan untuk menerjemahkan hostname atau domain menjadi alamat IP adalah?",
        options: [
            "DNS",
            "DHCP",
            "ARP",
            "FTP"
        ],
        answer: 0,
        category: "Protocol",
        difficulty: "easy"
    },
    {
        q: "Seorang pengguna ingin mengirim email dan kemudian membaca mailbox yang sama dari beberapa perangkat dengan status pesan tetap tersinkronisasi. Pasangan protokol yang paling sesuai adalah?",
        options: [
            "SMTP untuk pengiriman dan IMAP untuk sinkronisasi mailbox",
            "FTP untuk pengiriman dan ARP untuk sinkronisasi",
            "DNS untuk pengiriman dan DHCP untuk sinkronisasi",
            "ICMP untuk pengiriman dan SSH untuk sinkronisasi"
        ],
        answer: 0,
        category: "Protocol",
        difficulty: "medium"
    },
    {
        q: "Sebuah host dapat melakukan ping ke default gateway dan dapat melakukan ping ke IP server pada jaringan lain, tetapi akses ke website menggunakan nama domain gagal. Ketika URL diganti dengan IP address langsung, website dapat dibuka. Kesimpulan paling tepat adalah?",
        options: [
            "Masalah kemungkinan berada pada DNS resolution, bukan routing IP",
            "Masalah pasti berada pada MAC Address gateway",
            "Masalah pasti berada pada kabel Ethernet",
            "Masalah pasti berada pada subnet mask server"
        ],
        answer: 0,
        category: "Protocol",
        difficulty: "hard"
    },
    {
        q: "Sebuah PC berada pada subnet yang sama dengan gateway. ARP table sudah berisi MAC gateway dan ping gateway berhasil. Ping ke IP server pada jaringan lain juga berhasil, tetapi koneksi HTTPS ke server timeout. Dari PC lain pada subnet yang sama, HTTPS ke server berhasil. Pemeriksaan paling tepat pada PC tersebut adalah?",
        options: [
            "Periksa firewall lokal, proxy, dan aturan outbound TCP port 443 pada PC",
            "Ganti MAC Address gateway karena ARP sudah berhasil",
            "Ganti subnet mask server karena routing IP sudah terbukti berhasil",
            "Matikan DNS server karena koneksi menggunakan IP tidak memerlukan DNS"
        ],
        answer: 0,
        category: "Protocol",
        difficulty: "nightmare"
    },

    // =========================
    // IPv4 — V2-B — SOAL 87-90
    // =========================
    {
        q: "Alamat IPv4 255.255.255.255 dikenal sebagai?",
        options: [
            "Loopback address",
            "Limited broadcast address",
            "Private address",
            "Multicast address"
        ],
        answer: 1,
        category: "IPv4",
        difficulty: "easy"
    },
    {
        q: "Sebuah host menggunakan alamat 192.168.50.130/25. Network address yang benar adalah?",
        options: [
            "192.168.50.0",
            "192.168.50.64",
            "192.168.50.128",
            "192.168.50.192"
        ],
        answer: 2,
        category: "IPv4",
        difficulty: "medium"
    },
    {
        q: "Host A menggunakan 10.10.10.62/26. Host B menggunakan 10.10.10.65/26. Apakah kedua host berada pada subnet yang sama?",
        options: [
            "Ya, karena keduanya menggunakan prefix /26",
            "Ya, karena hanya octet terakhir yang berbeda",
            "Tidak, Host A berada di 10.10.10.0/26 sedangkan Host B berada di 10.10.10.64/26",
            "Tidak, karena alamat 10.10.10.65 merupakan alamat broadcast"
        ],
        answer: 2,
        category: "IPv4",
        difficulty: "hard"
    },
    {
        q: "Sebuah PC menggunakan IP 192.168.40.130/25 dan gateway 192.168.40.1. PC dapat berkomunikasi dengan host lokal, tetapi semua jaringan di luar subnet gagal diakses. Pemeriksaan awal menunjukkan gateway berada pada subnet yang sama dan dapat diping. Router memiliki interface untuk subnet tersebut, tetapi belum memiliki route menuju jaringan tujuan. Penyebab utama kegagalan adalah?",
        options: [
            "Destination routing pada router belum tersedia",
            "ARP pada PC pasti salah",
            "IP PC tidak valid karena 192.168.40.130 termasuk private address",
            "Gateway tidak boleh berada di subnet yang sama dengan host"
        ],
        answer: 0,
        category: "IPv4",
        difficulty: "nightmare"
    },

    // =========================
    // SUBNETTING — V2-B — SOAL 91-95
    // =========================
    {
        q: "Sebuah subnet menggunakan prefix /28. Berapa jumlah host usable yang tersedia pada subnet IPv4 biasa?",
        options: [
            "12",
            "14",
            "16",
            "30"
        ],
        answer: 1,
        category: "Subnetting",
        difficulty: "medium"
    },
    {
        q: "Sebuah network 192.168.100.0/24 harus dibagi menggunakan VLSM untuk kebutuhan 100 host, 50 host, dan 20 host. Prefix minimum yang paling efisien untuk masing-masing kebutuhan secara berurutan adalah?",
        options: [
            "/25, /26, /27",
            "/26, /27, /28",
            "/25, /27, /28",
            "/24, /25, /26"
        ],
        answer: 0,
        category: "Subnetting",
        difficulty: "expert"
    },
    {
        q: "Sebuah host menggunakan IP 192.168.70.200/29. Network address dan broadcast address yang benar adalah?",
        options: [
            "Network 192.168.70.192, Broadcast 192.168.70.199",
            "Network 192.168.70.200, Broadcast 192.168.70.207",
            "Network 192.168.70.192, Broadcast 192.168.70.207",
            "Network 192.168.70.196, Broadcast 192.168.70.203"
        ],
        answer: 2,
        category: "Subnetting",
        difficulty: "hard"
    },
    {
        q: "Sebuah subnet memiliki prefix /22. Berapa jumlah total alamat IPv4 yang tersedia di subnet tersebut?",
        options: [
            "512",
            "1024",
            "2048",
            "4096"
        ],
        answer: 3,
        category: "Subnetting",
        difficulty: "expert"
    },
    {
        q: "Sebuah organisasi memiliki network 10.50.0.0/24 dengan kebutuhan 100 host, 50 host, 25 host, dan 10 host. Menggunakan VLSM, subnet untuk kebutuhan terbesar sudah ditempatkan sebagai 10.50.0.0/25. Pilihan alokasi berikut yang paling tepat untuk tiga kebutuhan sisanya tanpa overlap adalah?",
        options: [
            "10.50.0.128/26, 10.50.0.192/27, 10.50.0.224/28",
            "10.50.0.128/27, 10.50.0.160/26, 10.50.0.224/28",
            "10.50.0.128/26, 10.50.0.160/27, 10.50.0.192/28",
            "10.50.0.128/25, 10.50.0.192/27, 10.50.0.224/29"
        ],
        answer: 0,
        category: "Subnetting",
        difficulty: "nightmare"
    },

    // =========================
    // NETWORK DEVICE — V2-B — SOAL 96-98
    // =========================
    {
        q: "Perangkat yang menyediakan konektivitas wireless bagi client menuju jaringan kabel disebut?",
        options: [
            "Access Point",
            "Patch Panel",
            "Hub",
            "Repeater"
        ],
        answer: 0,
        category: "Network Device",
        difficulty: "easy"
    },
    {
        q: "Sebuah switch menerima unicast frame dengan destination MAC yang belum terdapat pada MAC address table. Tindakan normal switch adalah?",
        options: [
            "Membuang frame karena destination belum dikenal",
            "Flood frame melalui port-port lain dalam VLAN yang sesuai, kecuali port sumber",
            "Mengirim frame hanya ke default gateway",
            "Mengubah destination MAC menjadi broadcast IP"
        ],
        answer: 1,
        category: "Network Device",
        difficulty: "hard"
    },
    {
        q: "Sebuah client pada VLAN 10 dapat berkomunikasi dengan client VLAN 10, tetapi tidak dapat berkomunikasi dengan VLAN 20. Trunk dari switch menuju router sudah aktif. Pemeriksaan menunjukkan VLAN 20 tidak dikonfigurasi pada subinterface router. Penyebab dan perbaikan yang paling tepat adalah?",
        options: [
            "Tambahkan subinterface VLAN 20 beserta encapsulation dan gateway yang sesuai pada router",
            "Ganti semua port access menjadi VLAN 1 karena inter-VLAN routing hanya bekerja pada VLAN 1",
            "Nonaktifkan MAC address table agar router dapat mengenali VLAN 20",
            "Ganti DNS server karena VLAN berbeda tidak dapat dirouting tanpa DNS"
        ],
        answer: 0,
        category: "Network Device",
        difficulty: "nightmare"
    },

    // =========================
    // NETWORK FUNDAMENTALS — V2-B — SOAL 99-100
    // =========================
    {
        q: "Perintah yang umum digunakan pada Windows untuk melihat alamat IP, subnet mask, dan default gateway adalah?",
        options: [
            "ipconfig",
            "ping",
            "tracert",
            "nslookup"
        ],
        answer: 0,
        category: "Network Fundamentals",
        difficulty: "easy"
    },
    {
        q: "Sebuah PC dapat ping gateway. PC juga dapat ping beberapa host pada subnet lokal, tetapi tidak dapat mencapai jaringan lain. Tracert menunjukkan paket berhenti pada gateway pertama. PC lain pada subnet yang sama mengalami gejala identik. Routing table pada router gateway tidak memiliki route menuju jaringan tujuan. Kesimpulan paling tepat adalah?",
        options: [
            "Masalah berada pada routing gateway menuju jaringan tujuan",
            "Masalah pasti berada pada DNS client",
            "Masalah pasti berada pada MAC Address setiap PC",
            "Masalah pasti berada pada resolusi nama komputer"
        ],
        answer: 0,
        category: "Network Fundamentals",
        difficulty: "nightmare"
    },
];
