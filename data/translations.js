/**
 * AllTools TJKT — Bilingual Localization Dictionary (i18n)
 * Supported languages: Bahasa Indonesia ('id') & English ('en')
 * Zero external dependencies. Adheres to TJKT networking terminology standards.
 */

const I18N_DICTIONARY = {
    id: {
        common: {
            appTitle: "AllTools TJKT",
            back: "← Kembali",
            openTool: "Buka Tool →",
            calculate: "Hitung",
            reset: "Reset",
            copied: "Tersalin!",
            searchPlaceholder: "Cari tools (contoh: subnet, IP, port)...",
            searchAria: "Cari Tools",
            logoAria: "Ke Halaman Utama",
            themeToggleAria: "Ganti Tema Gelap/Terang",
            mobileMenuAria: "Buka Menu Navigasi",
            langToggleBtn: "🌐 EN",
            langToggleAria: "Switch to English",
            langToggleTitle: "Switch to English",
            favoriteAdd: "Tambah ke Favorit",
            favoriteRemove: "Hapus dari Favorit",
            footerText: "© 2026 AllTools TJKT. Dibuat untuk pembelajaran.",
            settingsBtn: "⚙️ Pengaturan Data",
            resultTitle: "Hasil Perhitungan:",
            status: "Status",
            emptyInputError: "Input tidak boleh kosong."
        },
        nav: {
            home: "Home",
            networking: "Networking Tools",
            calculator: "Calculator",
            converter: "Converter",
            practice: "Practice",
            reference: "Reference",
            about: "About"
        },
        home: {
            welcomeTitle: "Selamat Datang di AllTools TJKT",
            welcomeDesc: "Satu tempat untuk berbagai tools praktis belajar, latihan, dan troubleshooting jaringan komputer.",
            favoritesTitle: "⭐ Favorit",
            recentTitle: "🕒 Terakhir Digunakan",
            categoriesTitle: "Kategori & Daftar Tools"
        },
        categories: {
            networking: {
                title: "Networking Tools",
                desc: "Pilih tool networking yang ingin digunakan."
            },
            calculator: {
                title: "Calculator Tools",
                desc: "Pilih kalkulator jaringan dan data yang ingin digunakan."
            },
            converter: {
                title: "Converter Tools",
                desc: "Pilih modul konversi data dan basis angka."
            },
            practice: {
                title: "TJKT Practice",
                desc: "Latihan interaktif dan uji pemahaman jaringan."
            },
            reference: {
                title: "Network Reference",
                desc: "Dokumentasi dan tabel referensi cepat standar jaringan."
            }
        },
        tools: {
            'ip-calculator': {
                title: "IP Address Calculator",
                category: "Networking",
                desc: "Hitung Network, Broadcast, Host Range, dan informasi IPv4.",
                openDesc: "Buka IP Address Calculator untuk menghitung parameter jaringan IPv4."
            },
            'subnet-calculator': {
                title: "Subnet Calculator",
                category: "Networking",
                desc: "Analisis subnet dan pembagian network secara lebih detail.",
                openDesc: "Buka Subnet Calculator untuk menganalisis pembagian subnet secara detail."
            },
            'mac-address': {
                title: "MAC Address Tools",
                category: "Networking",
                desc: "Tools untuk informasi dan analisis MAC Address.",
                openDesc: "Buka MAC Address Tools untuk analisis dan normalisasi MAC Address."
            },
            'cable-wiring': {
                title: "Kabel UTP & Crimping",
                category: "Networking",
                desc: "Susunan pin T568A, T568B, straight, crossover, dan panduan kabel LAN.",
                openDesc: "Buka panduan susunan pin kabel LAN UTP T568A dan T568B."
            },
            'bandwidth-calculator': {
                title: "Bandwidth Calculator",
                category: "Calculator",
                desc: "Hitung estimasi waktu transfer dan kebutuhan bandwidth.",
                openDesc: "Buka Bandwidth Calculator untuk estimasi waktu unduh dan unggah."
            },
            'converters': {
                title: "Data Unit & Base Converter",
                category: "Converter",
                desc: "Konversi data, desimal, biner, dan hexadecimal.",
                openDesc: "Buka Converter untuk konversi IPv4 binary, basis angka, dan unit data."
            },
            'quiz': {
                title: "Subnetting & Quiz",
                category: "TJKT Practice",
                desc: "Latihan subnetting dan kuis interaktif untuk TJKT.",
                openDesc: "Buka latihan subnetting dan kuis pilihan ganda jaringan."
            },
            'network-reference': {
                title: "Network Reference",
                category: "Reference",
                desc: "Referensi OSI, TCP/IP, port, protokol, dan jaringan.",
                openDesc: "Buka tabel referensi port standar, protokol, dan model OSI."
            },
            'about': {
                title: "About AllTools TJKT",
                category: "About",
                desc: "Tentang project, pengembang, dan formulir masukan pengguna."
            }
        },
        ipCalc: {
            title: "IP Address Calculator",
            desc: "Hitung Network, Broadcast, Subnet Mask, dan Range Host dari IPv4 & CIDR.",
            ipLabel: "IPv4 Address:",
            ipPlaceholder: "Contoh: 192.168.1.10",
            cidrLabel: "CIDR Prefix (0 - 32):",
            cidrPlaceholder: "Contoh: 24 atau /24",
            calcBtn: "Hitung",
            resTitle: "Hasil Perhitungan:",
            network: "Network Address",
            broadcast: "Broadcast Address",
            subnet: "Subnet Mask",
            wildcard: "Wildcard Mask",
            firstIp: "First Usable IP",
            lastIp: "Last Usable IP",
            totalAddr: "Total Address",
            usableHosts: "Usable Hosts",
            ipClass: "IP Class",
            binaryRep: "Binary Representation",
            errEmpty: "Input tidak boleh kosong.",
            errInvalidIp: "IPv4 tidak valid."
        },
        subnetCalc: {
            title: "Subnet Calculator",
            desc: "Analisis detail subnet jaringan berdasarkan Network IP dan Subnet Mask atau CIDR.",
            ipLabel: "Network IP / IP Address:",
            ipPlaceholder: "Contoh: 192.168.1.0",
            maskLabel: "Subnet Mask / CIDR:",
            maskPlaceholder: "Contoh: 255.255.255.0 atau 24",
            calcBtn: "Hitung Subnet",
            resTitle: "Hasil Subnetting:",
            network: "Network Address",
            broadcast: "Broadcast Address",
            hostRange: "Host Range",
            numHosts: "Number of Hosts",
            subnetMask: "Subnet Mask",
            wildcardMask: "Wildcard Mask",
            errEmptyIp: "Masukkan IP Address terlebih dahulu.",
            errInvalidIp: "IP Address tidak valid.",
            errEmptyMask: "Masukkan Subnet Mask atau Prefix CIDR.",
            errInvalidMask: "Subnet Mask atau CIDR tidak valid."
        },
        macTools: {
            title: "MAC Address Tools",
            desc: "Validasi, normalisasi, dan analisis informasi dasar MAC Address.",
            macLabel: "MAC Address:",
            macPlaceholder: "Contoh: AA:BB:CC:DD:EE:FF",
            analyzeBtn: "Analisis MAC",
            resTitle: "Hasil Analisis:",
            standardFormat: "MAC Address (Standar Colon)",
            rawFormat: "Tanpa Separator",
            ouiPrefix: "OUI / Prefix 24-bit",
            binary: "Binary",
            addressType: "Jenis Alamat",
            adminScope: "Lingkup Administrasi",
            ciscoFormat: "Format Cisco",
            hyphenFormat: "Format Hyphen",
            errEmpty: "Masukkan MAC Address terlebih dahulu.",
            errInvalid: "Format MAC Address tidak valid. Gunakan 12 karakter hexadesimal."
        },
        cableWiring: {
            title: "Kabel UTP & Panduan Crimping",
            desc: "Panduan susunan warna pin RJ45, standar T568A/T568B, jenis pengkabelan, dan referensi praktikum jaringan TJKT.",
            tabVisual: "🔌 Diagram Susunan Pin",
            tabDevices: "🔄 Panduan Perangkat",
            tabPinout: "📋 Fungsi Pin & Spek",
            tabSteps: "🛠️ Langkah Praktik Crimping",
            tabPractice: "🎯 Kuis Hafalan Warna",
            selectStandard: "Pilih Jenis Kabel / Standar:",
            optStraight: "Kabel Straight-Through (T568B - T568B)",
            optCrossover: "Kabel Cross-Over (T568B - T568A)",
            optT568b: "Standar T568B (Konektor Tunggal)",
            optT568a: "Standar T568A (Konektor Tunggal)",
            optRollover: "Kabel Rollover / Console Cisco"
        },
        bandwidth: {
            title: "Bandwidth & Transfer Time Calculator",
            desc: "Hitung estimasi waktu unduh atau unggah file berdasarkan kapasitas bandwidth jaringan.",
            fileSizeLabel: "Ukuran File:",
            speedLabel: "Kecepatan Transfer Jaringan:",
            unitNote: "💡 Catatan Standar Satuan: Satuan desimal SI (KB, MB, GB) berbasis 1.000, sedangkan biner IEC (KiB, MiB, GiB) berbasis 1.024. Kecepatan 1 MB/s = 8 Mbps (1 Byte = 8 bit).",
            calcBtn: "Hitung Waktu Transfer",
            resTitle: "Estimasi Waktu:",
            errFileSize: "Masukkan ukuran file yang valid (lebih besar dari 0).",
            errSpeed: "Masukkan kecepatan transfer yang valid (lebih besar dari 0)."
        },
        converters: {
            title: "Converters & Number Base",
            desc: "Konversi format IPv4, basis angka (Decimal, Binary, Hexadecimal, Octal), dan unit data.",
            tabIp: "IPv4 Binary",
            tabBase: "Number Base",
            tabData: "Data Unit",
            ipHeading: "IPv4 Decimal ↔ Binary",
            ipLabel: "Masukkan IP atau Binary:",
            ipPlaceholder: "192.168.1.1 atau 11000000...",
            convertBtn: "Konversi",
            baseHeading: "Number Base Converter (Dec, Bin, Hex, Oct)",
            baseLabel: "Nilai Angka:",
            basePlaceholder: "Masukkan angka...",
            baseFromLabel: "Dari Basis:",
            convertBaseBtn: "Konversi Basis",
            dataHeading: "Data Unit Converter (SI vs IEC)",
            dataValueLabel: "Nilai Ukuran Data:",
            dataFromLabel: "Dari Satuan:",
            convertDataBtn: "Konversi Unit"
        },
        quiz: {
            title: "TJKT Practice & Quiz",
            desc: "Uji kemampuan dan latihan soal seputar subnetting serta konsep jaringan komputer.",
            tabPractice: "Latihan Subnetting",
            tabQuiz: "Kuis Jaringan & OSI",
            subnetHeading: "Generator Soal Subnetting",
            subnetDesc: "Latih kemampuan analisis IP dan CIDR Anda secara acak.",
            genSubnetBtn: "Generate Soal Baru",
            yourAnswerLabel: "Jawaban Anda:",
            answerPlaceholder: "Masukkan jawaban...",
            checkBtn: "Periksa Jawaban",
            mcqHeading: "Kuis Pilihan Ganda TJKT",
            mcqDesc: "Mulai kuis untuk menguji pemahaman teori jaringan (OSI Layer, TCP/IP, Protokol).",
            startMcqBtn: "Mulai Kuis",
            scoreLabel: "Skor Akhir",
            nextBtn: "Soal Berikutnya →",
            finishBtn: "Selesai Kuis",
            restartBtn: "Ulangi Kuis"
        },
        networkRef: {
            title: "Network Reference",
            desc: "Referensi cepat OSI Model, TCP/IP, port, dan protokol jaringan.",
            tabOsi: "OSI Model",
            tabTcpip: "TCP/IP",
            tabPorts: "Ports",
            tabProtocols: "Protocols",
            thLayer: "Layer",
            thName: "Nama",
            thFunction: "Fungsi",
            thProtocol: "Protokol Terkait",
            thPort: "Port",
            thTransport: "Transport",
            thDesc: "Deskripsi",
            searchPortPlaceholder: "Cari nomor port atau layanan...",
            searchProtoPlaceholder: "Cari nama protokol atau deskripsi..."
        },
        about: {
            label: "ABOUT THE PROJECT",
            title: "AllTools TJKT",
            lead: "Dibuat oleh Rangga, pelajar TJKT yang sedang belajar membangun teknologi dari nol.",
            whyTitle: "🎯 Kenapa AllTools TJKT dibuat?",
            whyP1: "AllTools TJKT dibuat untuk mengumpulkan berbagai tools yang berguna dalam proses belajar TJKT ke dalam satu tempat yang sederhana, cepat, dan mudah digunakan.",
            whyP2: "Project ini juga menjadi bagian dari perjalanan belajar membangun website menggunakan HTML, CSS, JavaScript, Git, dan teknologi web lainnya.",
            statusTitle: "🛠️ Status Project",
            statusActive: "Active Development",
            statusDesc: "AllTools TJKT terus dikembangkan dan diperbaiki.",
            feedbackHeading: "💬 Ceritain masalah atau idemu",
            feedbackLead: "Ada bug, punya saran, atau sekadar mau kasih feedback? Ceritain aja seperti ngobrol dengan developer.",
            typeBug: "🐛 Bug",
            typeSuggestion: "💡 Saran",
            typeFeedback: "❤️ Feedback",
            senderPlaceholder: "Nama atau Kontak / Email kamu (opsional)",
            msgPlaceholder: "Tulis kritik, saran, atau laporan bug di sini...",
            contextLabel: "Halaman: About",
            privacyNote: "🔒 Privasi: Masukan akan dikirimkan ke email pembuat via FormSubmit. Jangan mengirimkan kata sandi atau data rahasia pribadi.",
            submitBtn: "🚀 Kirim Feedback",
            openLocalInboxBtn: "🛠️ Buka Panel Masukan Lokal (Mode Pembuat)"
        },
        settings: {
            modalTitle: "⚙️ Pengaturan Data",
            modalDesc: "Kelola data yang tersimpan di browser ini. Data hanya ada di perangkat ini dan tidak tersinkron ke perangkat lain.",
            languageLabel: "🌐 Bahasa / Language",
            languageDesc: "Pilih bahasa tampilan antarmuka aplikasi.",
            favoritesLabel: "⭐ Favorit",
            favoritesDesc: "Daftar tool yang kamu tandai sebagai favorit.",
            recentLabel: "🕒 Terakhir Digunakan",
            recentDesc: "Riwayat tool yang baru-baru ini dibuka.",
            quizLabel: "📝 Riwayat Kuis",
            quizDesc: "Statistik skor dan riwayat pengerjaan kuis.",
            feedbackLabel: "💬 Masukan Lokal",
            feedbackDesc: "Draft masukan dan log umpan balik yang tersimpan di perangkat ini.",
            resetAllLabel: "⚠️ Reset Semua Data",
            resetAllDesc: "Menghapus seluruh favorit, riwayat, masukan lokal, dan preferensi.",
            clearBtn: "Hapus",
            resetAllBtn: "Reset Semua Data",
            closeAria: "Tutup pengaturan",
            confirmFavorites: "Yakin ingin menghapus semua data favorit?",
            confirmRecent: "Yakin ingin menghapus riwayat terakhir digunakan?",
            confirmQuiz: "Yakin ingin menghapus semua riwayat kuis?",
            confirmFeedback: "Yakin ingin menghapus semua data masukan yang tersimpan di perangkat ini?",
            confirmResetAll: "PERINGATAN: Seluruh data lokal (favorit, riwayat, kuis, masukan) akan dihapus secara permanen. Lanjutkan?",
            clearedAlert: "✓ Data berhasil dihapus."
        }
    },
    en: {
        common: {
            appTitle: "AllTools TJKT",
            back: "← Back",
            openTool: "Open Tool →",
            calculate: "Calculate",
            reset: "Reset",
            copied: "Copied!",
            searchPlaceholder: "Search tools (e.g. subnet, IP, port)...",
            searchAria: "Search Tools",
            logoAria: "Back to Home",
            themeToggleAria: "Toggle Dark/Light Theme",
            mobileMenuAria: "Toggle Navigation Menu",
            langToggleBtn: "🌐 ID",
            langToggleAria: "Ganti ke Bahasa Indonesia",
            langToggleTitle: "Ganti ke Bahasa Indonesia",
            favoriteAdd: "Add to Favorites",
            favoriteRemove: "Remove from Favorites",
            footerText: "© 2026 AllTools TJKT. Created for learning purposes.",
            settingsBtn: "⚙️ Data Settings",
            resultTitle: "Calculation Results:",
            status: "Status",
            emptyInputError: "Input cannot be empty."
        },
        nav: {
            home: "Home",
            networking: "Networking Tools",
            calculator: "Calculator",
            converter: "Converter",
            practice: "Practice",
            reference: "Reference",
            about: "About"
        },
        home: {
            welcomeTitle: "Welcome to AllTools TJKT",
            welcomeDesc: "A dedicated toolkit for studying, practicing, and troubleshooting computer networks.",
            favoritesTitle: "⭐ Favorites",
            recentTitle: "🕒 Recently Used",
            categoriesTitle: "Categories & Tool Catalog"
        },
        categories: {
            networking: {
                title: "Networking Tools",
                desc: "Select a networking tool to begin."
            },
            calculator: {
                title: "Calculator Tools",
                desc: "Select a network or data calculator."
            },
            converter: {
                title: "Converter Tools",
                desc: "Select a number base or data unit conversion module."
            },
            practice: {
                title: "TJKT Practice",
                desc: "Interactive exercises and network knowledge quizzes."
            },
            reference: {
                title: "Network Reference",
                desc: "Documentation and quick reference tables for networking standards."
            }
        },
        tools: {
            'ip-calculator': {
                title: "IP Address Calculator",
                category: "Networking",
                desc: "Calculate Network, Broadcast, Host Range, and IPv4 details.",
                openDesc: "Open IP Address Calculator to analyze IPv4 network parameters."
            },
            'subnet-calculator': {
                title: "Subnet Calculator",
                category: "Networking",
                desc: "Detailed subnetting analysis and network partitioning.",
                openDesc: "Open Subnet Calculator for in-depth subnet partitioning."
            },
            'mac-address': {
                title: "MAC Address Tools",
                category: "Networking",
                desc: "Tools for MAC Address lookup, analysis, and formatting.",
                openDesc: "Open MAC Address Tools for analysis and normalization."
            },
            'cable-wiring': {
                title: "UTP Cable & Crimping",
                category: "Networking",
                desc: "T568A, T568B pinouts, straight, crossover, and LAN cable guide.",
                openDesc: "Open UTP cable pinout guide for T568A and T568B wiring standards."
            },
            'bandwidth-calculator': {
                title: "Bandwidth Calculator",
                category: "Calculator",
                desc: "Calculate estimated transfer time and bandwidth requirements.",
                openDesc: "Open Bandwidth Calculator for download and upload time estimations."
            },
            'converters': {
                title: "Data Unit & Base Converter",
                category: "Converter",
                desc: "Convert data units, decimal, binary, and hexadecimal.",
                openDesc: "Open Converter for IPv4 binary, number bases, and data units."
            },
            'quiz': {
                title: "Subnetting & Quiz",
                category: "TJKT Practice",
                desc: "Subnetting practice and interactive quiz for TJKT students.",
                openDesc: "Open subnetting practice and networking multiple-choice quizzes."
            },
            'network-reference': {
                title: "Network Reference",
                category: "Reference",
                desc: "Reference guide for OSI layers, TCP/IP, ports, and protocols.",
                openDesc: "Open reference tables for standard ports, protocols, and OSI layers."
            },
            'about': {
                title: "About AllTools TJKT",
                category: "About",
                desc: "About the project, developer, and user feedback form."
            }
        },
        ipCalc: {
            title: "IP Address Calculator",
            desc: "Calculate Network, Broadcast, Subnet Mask, and Host Range from IPv4 & CIDR.",
            ipLabel: "IPv4 Address:",
            ipPlaceholder: "e.g. 192.168.1.10",
            cidrLabel: "CIDR Prefix (0 - 32):",
            cidrPlaceholder: "e.g. 24 or /24",
            calcBtn: "Calculate",
            resTitle: "Calculation Results:",
            network: "Network Address",
            broadcast: "Broadcast Address",
            subnet: "Subnet Mask",
            wildcard: "Wildcard Mask",
            firstIp: "First Usable IP",
            lastIp: "Last Usable IP",
            totalAddr: "Total Address",
            usableHosts: "Usable Hosts",
            ipClass: "IP Class",
            binaryRep: "Binary Representation",
            errEmpty: "Input cannot be empty.",
            errInvalidIp: "Invalid IPv4 address."
        },
        subnetCalc: {
            title: "Subnet Calculator",
            desc: "Detailed subnet analysis based on Network IP and Subnet Mask or CIDR.",
            ipLabel: "Network IP / IP Address:",
            ipPlaceholder: "e.g. 192.168.1.0",
            maskLabel: "Subnet Mask / CIDR:",
            maskPlaceholder: "e.g. 255.255.255.0 or 24",
            calcBtn: "Calculate Subnet",
            resTitle: "Subnetting Results:",
            network: "Network Address",
            broadcast: "Broadcast Address",
            hostRange: "Host Range",
            numHosts: "Number of Hosts",
            subnetMask: "Subnet Mask",
            wildcardMask: "Wildcard Mask",
            errEmptyIp: "Please enter an IP Address first.",
            errInvalidIp: "Invalid IP Address.",
            errEmptyMask: "Please enter a Subnet Mask or CIDR prefix.",
            errInvalidMask: "Invalid Subnet Mask or CIDR prefix."
        },
        macTools: {
            title: "MAC Address Tools",
            desc: "Validate, normalize, and inspect MAC Address information.",
            macLabel: "MAC Address:",
            macPlaceholder: "e.g. AA:BB:CC:DD:EE:FF",
            analyzeBtn: "Analyze MAC",
            resTitle: "Analysis Results:",
            standardFormat: "MAC Address (Standard Colon)",
            rawFormat: "Without Separator",
            ouiPrefix: "OUI / 24-bit Prefix",
            binary: "Binary",
            addressType: "Address Type",
            adminScope: "Administration Scope",
            ciscoFormat: "Cisco Format",
            hyphenFormat: "Hyphen Format",
            errEmpty: "Please enter a MAC Address first.",
            errInvalid: "Invalid MAC Address format. Use 12 hexadecimal characters."
        },
        cableWiring: {
            title: "UTP Cable & Crimping Guide",
            desc: "RJ45 pinout color arrangement, T568A/T568B standards, cabling types, and networking lab reference.",
            tabVisual: "🔌 Pinout Diagram",
            tabDevices: "🔄 Device Guidelines",
            tabPinout: "📋 Pin Functions & Specs",
            tabSteps: "🛠️ Practical Crimping Steps",
            tabPractice: "🎯 Color Memorization Quiz",
            selectStandard: "Select Cable Type / Standard:",
            optStraight: "Straight-Through Cable (T568B - T568B)",
            optCrossover: "Cross-Over Cable (T568B - T568A)",
            optT568b: "T568B Standard (Single Connector)",
            optT568a: "T568A Standard (Single Connector)",
            optRollover: "Rollover / Cisco Console Cable"
        },
        bandwidth: {
            title: "Bandwidth & Transfer Time Calculator",
            desc: "Calculate estimated file download or upload time based on network bandwidth capacity.",
            fileSizeLabel: "File Size:",
            speedLabel: "Network Transfer Speed:",
            unitNote: "💡 Standard Units Note: SI decimal units (KB, MB, GB) are base 1,000, while IEC binary units (KiB, MiB, GiB) are base 1,024. Speed 1 MB/s = 8 Mbps (1 Byte = 8 bits).",
            calcBtn: "Calculate Transfer Time",
            resTitle: "Estimated Time:",
            errFileSize: "Please enter a valid file size (greater than 0).",
            errSpeed: "Please enter a valid transfer speed (greater than 0)."
        },
        converters: {
            title: "Converters & Number Base",
            desc: "Convert IPv4 binary formats, number bases (Decimal, Binary, Hexadecimal, Octal), and data units.",
            tabIp: "IPv4 Binary",
            tabBase: "Number Base",
            tabData: "Data Unit",
            ipHeading: "IPv4 Decimal ↔ Binary",
            ipLabel: "Enter IP or Binary:",
            ipPlaceholder: "192.168.1.1 or 11000000...",
            convertBtn: "Convert",
            baseHeading: "Number Base Converter (Dec, Bin, Hex, Oct)",
            baseLabel: "Numeric Value:",
            basePlaceholder: "Enter number...",
            baseFromLabel: "From Base:",
            convertBaseBtn: "Convert Base",
            dataHeading: "Data Unit Converter (SI vs IEC)",
            dataValueLabel: "Data Size Value:",
            dataFromLabel: "From Unit:",
            convertDataBtn: "Convert Unit"
        },
        quiz: {
            title: "TJKT Practice & Quiz",
            desc: "Test your skills with randomized subnetting exercises and networking concepts.",
            tabPractice: "Subnetting Practice",
            tabQuiz: "Networking & OSI Quiz",
            subnetHeading: "Subnetting Question Generator",
            subnetDesc: "Practice your IP and CIDR analysis skills with randomized questions.",
            genSubnetBtn: "Generate New Question",
            yourAnswerLabel: "Your Answer:",
            answerPlaceholder: "Enter your answer...",
            checkBtn: "Check Answer",
            mcqHeading: "Networking Multiple-Choice Quiz",
            mcqDesc: "Start the quiz to test your understanding of network theory (OSI, TCP/IP, Protocols).",
            startMcqBtn: "Start Quiz",
            scoreLabel: "Final Score",
            nextBtn: "Next Question →",
            finishBtn: "Finish Quiz",
            restartBtn: "Restart Quiz"
        },
        networkRef: {
            title: "Network Reference",
            desc: "Quick reference for OSI Model, TCP/IP, ports, and network protocols.",
            tabOsi: "OSI Model",
            tabTcpip: "TCP/IP",
            tabPorts: "Ports",
            tabProtocols: "Protocols",
            thLayer: "Layer",
            thName: "Name",
            thFunction: "Function",
            thProtocol: "Associated Protocols",
            thPort: "Port",
            thTransport: "Transport",
            thDesc: "Description",
            searchPortPlaceholder: "Search port number or service...",
            searchProtoPlaceholder: "Search protocol name or description..."
        },
        about: {
            label: "ABOUT THE PROJECT",
            title: "AllTools TJKT",
            lead: "Created by Rangga, a vocational TJKT student learning to build tech solutions from the ground up.",
            whyTitle: "🎯 Why AllTools TJKT was created?",
            whyP1: "AllTools TJKT was built to gather essential network engineering tools into one simple, fast, and accessible place for students.",
            whyP2: "This project is part of a hands-on journey learning web development with HTML, CSS, JavaScript, Git, and modern web tech.",
            statusTitle: "🛠️ Project Status",
            statusActive: "Active Development",
            statusDesc: "AllTools TJKT is actively maintained, updated, and improved.",
            feedbackHeading: "💬 Share an issue or idea",
            feedbackLead: "Found a bug, have a suggestion, or just want to give feedback? Reach out directly to the developer.",
            typeBug: "🐛 Bug",
            typeSuggestion: "💡 Suggestion",
            typeFeedback: "❤️ Feedback",
            senderPlaceholder: "Your Name or Contact / Email (optional)",
            msgPlaceholder: "Write your feedback, suggestion, or bug report here...",
            contextLabel: "Page: About",
            privacyNote: "🔒 Privacy: Feedback is submitted to the developer via FormSubmit. Never submit passwords or sensitive personal data.",
            submitBtn: "🚀 Submit Feedback",
            openLocalInboxBtn: "🛠️ Open Local Feedback Panel (Creator Mode)"
        },
        settings: {
            modalTitle: "⚙️ Data Settings",
            modalDesc: "Manage data stored in this browser. All data remains exclusively on this device and is never synced externally.",
            languageLabel: "🌐 Language / Bahasa",
            languageDesc: "Choose interface display language.",
            favoritesLabel: "⭐ Favorites",
            favoritesDesc: "List of tools marked as favorite.",
            recentLabel: "🕒 Recently Used",
            recentDesc: "History of recently accessed tools.",
            quizLabel: "📝 Quiz History",
            quizDesc: "Score statistics and quiz completion history.",
            feedbackLabel: "💬 Local Feedback",
            feedbackDesc: "Draft feedback and review items saved on this device.",
            resetAllLabel: "⚠️ Reset All Data",
            resetAllDesc: "Permanently delete all favorites, history, local feedback, and preferences.",
            clearBtn: "Clear",
            resetAllBtn: "Reset All Data",
            closeAria: "Close settings",
            confirmFavorites: "Are you sure you want to clear all favorites?",
            confirmRecent: "Are you sure you want to clear recently used history?",
            confirmQuiz: "Are you sure you want to clear all quiz history?",
            confirmFeedback: "Are you sure you want to clear all local feedback saved on this device?",
            confirmResetAll: "WARNING: All local data (favorites, history, quiz, feedback) will be permanently deleted. Continue?",
            clearedAlert: "✓ Data cleared successfully."
        }
    }
};

// Export for CommonJS (Node.js test runner) or browser global
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { I18N_DICTIONARY };
} else {
    window.I18N_DICTIONARY = I18N_DICTIONARY;
}
