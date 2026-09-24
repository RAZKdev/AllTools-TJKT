/**
 * AllTools TJKT — Modul Kabel UTP & Panduan Crimping
 * Standar T568A, T568B, Straight-Through, Cross-Over, Rollover, dan fungsi pin RJ45.
 */

function renderCableWiring(container) {
    container.innerHTML = `
        <div class="tool-card">
            <h2>Kabel UTP & Panduan Crimping</h2>
            <p class="tool-desc">
                Panduan susunan warna pin RJ45, standar T568A/T568B, jenis pengkabelan, dan referensi praktikum jaringan TJKT.
            </p>

            <div class="converter-tabs wiring-tabs">
                <button type="button" class="btn-outline wiring-tab-btn active" data-tab="visual">
                    🔌 Diagram Susunan Pin
                </button>
                <button type="button" class="btn-outline wiring-tab-btn" data-tab="devices">
                    🔄 Panduan Perangkat
                </button>
                <button type="button" class="btn-outline wiring-tab-btn" data-tab="pinout">
                    📋 Fungsi Pin & Spek
                </button>
                <button type="button" class="btn-outline wiring-tab-btn" data-tab="steps">
                    🛠️ Langkah Praktik Crimping
                </button>
                <button type="button" class="btn-outline wiring-tab-btn" data-tab="practice">
                    🎯 Kuis Hafalan Warna
                </button>
            </div>

            <!-- Panel 1: Diagram Susunan Pin -->
            <div id="wiring-panel-visual" class="wiring-panel">
                <div class="form-group" style="margin-bottom: 1.25rem;">
                    <label for="cable-type-select">Pilih Jenis Kabel / Standar:</label>
                    <select id="cable-type-select">
                        <option value="straight" selected>Kabel Straight-Through (T568B - T568B)</option>
                        <option value="crossover">Kabel Cross-Over (T568B - T568A)</option>
                        <option value="t568b">Standar T568B (Konektor Tunggal)</option>
                        <option value="t568a">Standar T568A (Konektor Tunggal)</option>
                        <option value="rollover">Kabel Rollover / Console Cisco</option>
                    </select>
                </div>

                <div id="cable-diagram-view" class="cable-diagram-view">
                    <!-- Di-render dinamis via updateCableDiagram() -->
                </div>
            </div>

            <!-- Panel 2: Panduan Perangkat -->
            <div id="wiring-panel-devices" class="wiring-panel hidden">
                <div class="result-box" style="margin-bottom: 1.25rem;">
                    <h4 style="margin-bottom: 0.5rem;">Aturan Penggunaan Kabel Jaringan</h4>
                    <p style="color: var(--text-secondary); font-size: 0.88rem; line-height: 1.6;">
                        Prinsip dasar pengkabelan tradisional membedakan jenis kabel berdasarkan tingkatan perangkat (Layer OSI):
                        <br>• <strong>Straight-Through:</strong> Menghubungkan dua perangkat yang <em>berbeda jenis</em>.
                        <br>• <strong>Cross-Over:</strong> Menghubungkan dua perangkat yang <em>sejenis</em> (atau sama-sama MDI).
                        <br>• <strong>Rollover:</strong> Khusus konfigurasi router/switch Cisco melalui terminal PC (Port Console ke COM/Serial).
                    </p>
                </div>

                <div class="reference-table-wrap">
                    <table class="result-table">
                        <thead>
                            <tr>
                                <th>Perangkat A</th>
                                <th>Perangkat B</th>
                                <th>Jenis Kabel</th>
                                <th>Keterangan</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Komputer (PC / Laptop)</td>
                                <td>Switch / Hub</td>
                                <td><span class="badge-cable badge-straight">Straight-Through</span></td>
                                <td>Koneksi umum workstation ke jaringan lokal (LAN)</td>
                            </tr>
                            <tr>
                                <td>Router (Port LAN/WAN)</td>
                                <td>Switch</td>
                                <td><span class="badge-cable badge-straight">Straight-Through</span></td>
                                <td>Menghubungkan gateway router ke distribution switch</td>
                            </tr>
                            <tr>
                                <td>Access Point</td>
                                <td>Switch / PoE Switch</td>
                                <td><span class="badge-cable badge-straight">Straight-Through</span></td>
                                <td>Distribusi jaringan nirkabel ke switch</td>
                            </tr>
                            <tr>
                                <td>Komputer (PC)</td>
                                <td>Komputer (PC)</td>
                                <td><span class="badge-cable badge-cross">Cross-Over</span></td>
                                <td>Koneksi peer-to-peer langsung tanpa switch</td>
                            </tr>
                            <tr>
                                <td>Switch</td>
                                <td>Switch</td>
                                <td><span class="badge-cable badge-cross">Cross-Over</span></td>
                                <td>Koneksi uplink antar switch</td>
                            </tr>
                            <tr>
                                <td>Router</td>
                                <td>Router</td>
                                <td><span class="badge-cable badge-cross">Cross-Over</span></td>
                                <td>Koneksi langsung antar port Ethernet router</td>
                            </tr>
                            <tr>
                                <td>Komputer (PC)</td>
                                <td>Router (Port FastEthernet)</td>
                                <td><span class="badge-cable badge-cross">Cross-Over</span></td>
                                <td>Port LAN router bertindak sebagai host terminal (MDI)</td>
                            </tr>
                            <tr>
                                <td>PC (Serial / USB Adapter)</td>
                                <td>Port Console (Router/Switch)</td>
                                <td><span class="badge-cable badge-rollover">Rollover</span></td>
                                <td>Konfigurasi awal CLI perangkat Cisco (Baud 9600)</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <div class="about-status" style="margin-top: 1rem;">
                    <strong>💡 Catatan Teknologi Modern (Auto-MDI/MDIX):</strong>
                    <span>
                        Hampir semua port Gigabit Ethernet (1000Base-T) dan kartu jaringan modern saat ini memiliki fitur <strong>Auto MDI-X</strong>. 
                        Port akan secara otomatis menukar jalur transmisi dan penerimaan jika kabel yang digunakan salah, sehingga kabel Straight-Through tetap bisa berjalan antar dua PC modern. Namun, dalam ujian kompetensi dan teori TJKT, pemahaman aturan konvensional ini wajib dikuasai!
                    </span>
                </div>
            </div>

            <!-- Panel 3: Fungsi Pin & Spek -->
            <div id="wiring-panel-pinout" class="wiring-panel hidden">
                <div class="result-box" style="margin-bottom: 1.25rem;">
                    <h4 style="margin-bottom: 0.5rem;">Spesifikasi 8-Pin RJ45 (Kabel UTP Cat5e / Cat6)</h4>
                    <p style="color: var(--text-secondary); font-size: 0.88rem; line-height: 1.5;">
                        Kabel UTP (Unshielded Twisted Pair) memiliki 4 pasang kawat (total 8 konduktor tembaga).
                    </p>
                </div>

                <div class="reference-table-wrap">
                    <table class="result-table">
                        <thead>
                            <tr>
                                <th>Pin</th>
                                <th>Warna T568B</th>
                                <th>Warna T568A</th>
                                <th>10/100 Mbps (Fast Ethernet)</th>
                                <th>1000 Mbps (Gigabit)</th>
                                <th>Fungsi PoE (802.3af)</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td><strong>1</strong></td>
                                <td>Putih - Oranye</td>
                                <td>Putih - Hijau</td>
                                <td><strong>TX+</strong> (Transmit Data +)</td>
                                <td>BI_DA+ (Bidirectional A+)</td>
                                <td>DC Power + (Mode A)</td>
                            </tr>
                            <tr>
                                <td><strong>2</strong></td>
                                <td>Oranye</td>
                                <td>Hijau</td>
                                <td><strong>TX-</strong> (Transmit Data -)</td>
                                <td>BI_DA- (Bidirectional A-)</td>
                                <td>DC Power + (Mode A)</td>
                            </tr>
                            <tr>
                                <td><strong>3</strong></td>
                                <td>Putih - Hijau</td>
                                <td>Putih - Oranye</td>
                                <td><strong>RX+</strong> (Receive Data +)</td>
                                <td>BI_DB+ (Bidirectional B+)</td>
                                <td>DC Power - (Mode A)</td>
                            </tr>
                            <tr>
                                <td><strong>4</strong></td>
                                <td>Biru</td>
                                <td>Biru</td>
                                <td><em>Tidak Digunakan</em></td>
                                <td>BI_DC+ (Bidirectional C+)</td>
                                <td>DC Power + (Mode B)</td>
                            </tr>
                            <tr>
                                <td><strong>5</strong></td>
                                <td>Putih - Biru</td>
                                <td>Putih - Biru</td>
                                <td><em>Tidak Digunakan</em></td>
                                <td>BI_DC- (Bidirectional C-)</td>
                                <td>DC Power + (Mode B)</td>
                            </tr>
                            <tr>
                                <td><strong>6</strong></td>
                                <td>Hijau</td>
                                <td>Oranye</td>
                                <td><strong>RX-</strong> (Receive Data -)</td>
                                <td>BI_DB- (Bidirectional B-)</td>
                                <td>DC Power - (Mode A)</td>
                            </tr>
                            <tr>
                                <td><strong>7</strong></td>
                                <td>Putih - Cokelat</td>
                                <td>Putih - Cokelat</td>
                                <td><em>Tidak Digunakan</em></td>
                                <td>BI_DD+ (Bidirectional D+)</td>
                                <td>DC Power - (Mode B)</td>
                            </tr>
                            <tr>
                                <td><strong>8</strong></td>
                                <td>Cokelat</td>
                                <td>Cokelat</td>
                                <td><em>Tidak Digunakan</em></td>
                                <td>BI_DD- (Bidirectional D-)</td>
                                <td>DC Power - (Mode B)</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <div class="about-status" style="margin-top: 1rem;">
                    <strong>Fakta Penting Lab:</strong>
                    <span>
                        Pada jaringan <strong>10/100 Mbps (Fast Ethernet)</strong>, hanya 4 pin yang aktif mengirim dan menerima data, yaitu pin <strong>1, 2, 3, dan 6</strong>. Pin 4, 5, 7, dan 8 dapat dimanfaatkan untuk Power over Ethernet (PoE) atau cadangan. Sedangkan pada jaringan <strong>1 Gbps (Gigabit Ethernet)</strong>, seluruh 8 pin digunakan secara simultan untuk mengirim dan menerima data.
                    </span>
                </div>
            </div>

            <!-- Panel 4: Langkah Praktik Crimping -->
            <div id="wiring-panel-steps" class="wiring-panel hidden">
                <div class="result-box" style="margin-bottom: 1.25rem;">
                    <h4 style="margin-bottom: 0.5rem;">Alat & Bahan Praktikum</h4>
                    <p style="color: var(--text-secondary); font-size: 0.88rem; line-height: 1.6;">
                        1. Kabel UTP (Cat5e atau Cat6)<br>
                        2. Konektor RJ45 (minimal 2 buah)<br>
                        3. Tang Crimping (Crimping Tool)<br>
                        4. Pengupas Kabel (Cable Stripper)<br>
                        5. Pemotong Kabel / Gunting<br>
                        6. LAN Cable Tester
                    </p>
                </div>

                <div class="crimping-steps-list">
                    <div class="crimping-step-card">
                        <div class="step-num">1</div>
                        <div class="step-content">
                            <h4>Kupas Jaket Pelindung Luar</h4>
                            <p>Kupas jaket luar kabel UTP sepanjang kurang lebih <strong>2.5 hingga 3 cm</strong> menggunakan cable stripper atau pisau pada tang crimping secara hati-hati agar isolasi 8 kawat di dalamnya tidak tergores.</p>
                        </div>
                    </div>

                    <div class="crimping-step-card">
                        <div class="step-num">2</div>
                        <div class="step-content">
                            <h4>Urai Pilinan dan Luruskan Kabel</h4>
                            <p>Buka 4 pasang pilinan kawat (*twisted pairs*). Luruskan setiap helai kawat dengan jari tangan agar rata dan tidak melengkung.</p>
                        </div>
                    </div>

                    <div class="crimping-step-card">
                        <div class="step-num">3</div>
                        <div class="step-content">
                            <h4>Susun Urutan Warna Sesuai Standar</h4>
                            <p>Rapatkan dan susun urutan warna dari kiri ke kanan (posisi pin 1 di paling kiri). Gunakan standar <strong>T568B</strong> (Putih-Oranye, Oranye, Putih-Hijau, Biru, Putih-Biru, Hijau, Putih-Cokelat, Cokelat) untuk sebagian besar kebutuhan LAN.</p>
                        </div>
                    </div>

                    <div class="crimping-step-card">
                        <div class="step-num">4</div>
                        <div class="step-content">
                            <h4>Potong Rata Kawat Tembaga</h4>
                            <p>Setelah urutan rapi dan sejajar, potong lurus ujung-ujung kabel menggunakan pemotong tang crimping. Sisakan panjang kawat sekitar <strong>1.2 cm hingga 1.5 cm</strong> agar jaket luar kabel bisa masuk ke dalam rumah konektor RJ45.</p>
                        </div>
                    </div>

                    <div class="crimping-step-card">
                        <div class="step-num">5</div>
                        <div class="step-content">
                            <h4>Masukkan ke Konektor RJ45</h4>
                            <p>Posisikan konektor RJ45 dengan <em>pengunci (clip/latch) berada di sisi bawah</em> dan pin tembaga menghadap ke atas. Dorong kabel masuk secara perlahan hingga ke-8 kawat tembaga mentok terlihat di ujung kepala transparan RJ45, dan jaket luar kabel ikut masuk melampaui lidah pengunci konektor.</p>
                        </div>
                    </div>

                    <div class="crimping-step-card">
                        <div class="step-num">6</div>
                        <div class="step-content">
                            <h4>Crimp Konektor RJ45</h4>
                            <p>Masukkan konektor RJ45 ke dalam lubang crimp 8P pada tang crimping. Tekan gagang tang dengan kuat dan mantap hingga pin-pin tembaga menembus kawat konduktor dan lidah pengunci menjepit jaket luar kabel.</p>
                        </div>
                    </div>

                    <div class="crimping-step-card">
                        <div class="step-num">7</div>
                        <div class="step-content">
                            <h4>Uji Menggunakan LAN Tester</h4>
                            <p>Pasang kedua ujung kabel ke Master dan Remote LAN Tester. Hidupkan saklar:
                               <br>• <strong>Kabel Straight:</strong> Lampu indikator 1 s/d 8 pada kedua unit menyala berurutan (1-1, 2-2, 3-3, 4-4, 5-5, 6-6, 7-7, 8-8).
                               <br>• <strong>Kabel Cross:</strong> Lampu Master 1 s/d 8 berurutan, sedangkan Remote menyala sesuai pasangan: 1-3, 2-6, 3-1, 4-4, 5-5, 6-2, 7-7, 8-8.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Panel 5: Kuis Hafalan Warna -->
            <div id="wiring-panel-practice" class="wiring-panel hidden">
                <div class="result-box" style="margin-bottom: 1rem;">
                    <h4>Latihan Hafalan Urutan Pin Kabel</h4>
                    <p style="color: var(--text-secondary); font-size: 0.88rem;">
                        Pilih warna kabel yang tepat untuk pin yang ditanyakan untuk menguji kesiapan sebelum ujian praktik crimping!
                    </p>
                </div>

                <div class="wiring-quiz-container">
                    <div style="display: flex; gap: 0.5rem; margin-bottom: 1rem; flex-wrap: wrap;">
                        <button type="button" id="btn-quiz-mode-b" class="btn-primary" style="font-size: 0.82rem; min-height: 36px;">
                            Latihan Standar T568B
                        </button>
                        <button type="button" id="btn-quiz-mode-a" class="btn-outline" style="font-size: 0.82rem; min-height: 36px;">
                            Latihan Standar T568A
                        </button>
                    </div>

                    <div id="wiring-quiz-card" class="wiring-quiz-card">
                        <!-- Konten kuis dimuat via script -->
                    </div>
                </div>
            </div>

        </div>
    `;

    // Data susunan warna kabel
    const WIRE_COLORS = {
        'white-orange': { name: 'Putih - Oranye', color: '#ff8c00', stripe: true },
        'orange':       { name: 'Oranye',          color: '#ff8c00', stripe: false },
        'white-green':  { name: 'Putih - Hijau',  color: '#22c55e', stripe: true },
        'blue':         { name: 'Biru',            color: '#2563eb', stripe: false },
        'white-blue':   { name: 'Putih - Biru',   color: '#2563eb', stripe: true },
        'green':        { name: 'Hijau',           color: '#22c55e', stripe: false },
        'white-brown':  { name: 'Putih - Cokelat',color: '#8b4513', stripe: true },
        'brown':        { name: 'Cokelat',         color: '#8b4513', stripe: false }
    };

    const STANDARDS = {
        t568b: [
            'white-orange', 'orange', 'white-green', 'blue',
            'white-blue', 'green', 'white-brown', 'brown'
        ],
        t568a: [
            'white-green', 'green', 'white-orange', 'blue',
            'white-blue', 'orange', 'white-brown', 'brown'
        ]
    };

    // Tab switching
    const tabButtons = container.querySelectorAll('.wiring-tab-btn');
    const panels = container.querySelectorAll('.wiring-panel');

    tabButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            tabButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const targetTab = btn.dataset.tab;
            panels.forEach(p => {
                if (p.id === `wiring-panel-${targetTab}`) {
                    p.classList.remove('hidden');
                } else {
                    p.classList.add('hidden');
                }
            });
        });
    });

    // Helper render 1 connector
    function renderRj45ConnectorHtml(title, wireKeys, note = '') {
        const pinsHtml = wireKeys.map((key, index) => {
            const wire = WIRE_COLORS[key];
            const pinNum = index + 1;
            const stripeClass = wire.stripe ? 'wire-striped' : 'wire-solid';

            return `
                <div class="rj45-pin-row">
                    <span class="rj45-pin-num">Pin ${pinNum}</span>
                    <div class="rj45-wire-wrapper">
                        <div class="rj45-wire-bar ${stripeClass}" style="--wire-color: ${wire.color};"></div>
                    </div>
                    <span class="rj45-wire-name">${wire.name}</span>
                </div>
            `;
        }).join('');

        return `
            <div class="rj45-connector-card">
                <div class="rj45-connector-header">
                    <h4>${title}</h4>
                    ${note ? `<span class="rj45-connector-note">${note}</span>` : ''}
                </div>

                <div class="rj45-plug-housing">
                    <div class="rj45-copper-pins">
                        ${wireKeys.map((_, i) => `<span class="rj45-copper-pin" title="Pin ${i+1}"></span>`).join('')}
                    </div>
                    <div class="rj45-wires-container">
                        ${pinsHtml}
                    </div>
                    <div class="rj45-boot-clip">
                        <span>Clip RJ45 menghadap bawah saat memasang</span>
                    </div>
                </div>
            </div>
        `;
    }

    // Function to update visual diagram
    const select = container.querySelector('#cable-type-select');
    const diagramView = container.querySelector('#cable-diagram-view');

    function updateCableDiagram() {
        const type = select.value;

        if (type === 'straight') {
            diagramView.innerHTML = `
                <div class="cable-summary-box">
                    <strong>Kabel Straight-Through (Standar T568B)</strong>
                    <p>Kedua ujung menggunakan susunan warna yang sama (T568B). Paling banyak digunakan untuk menghubungkan komputer ke switch atau hub.</p>
                </div>
                <div class="cable-connectors-grid">
                    ${renderRj45ConnectorHtml('Ujung A (Connector 1)', STANDARDS.t568b, 'Standar T568B')}
                    ${renderRj45ConnectorHtml('Ujung B (Connector 2)', STANDARDS.t568b, 'Standar T568B')}
                </div>
            `;
        } else if (type === 'crossover') {
            diagramView.innerHTML = `
                <div class="cable-summary-box">
                    <strong>Kabel Cross-Over (T568B ke T568A)</strong>
                    <p>Ujung A menggunakan standar T568B dan Ujung B menggunakan standar T568A. Pin 1 ditukar dengan pin 3, dan pin 2 ditukar dengan pin 6 (Tx dan Rx dibalik).</p>
                </div>
                <div class="cable-connectors-grid">
                    ${renderRj45ConnectorHtml('Ujung A (Connector 1)', STANDARDS.t568b, 'Standar T568B')}
                    ${renderRj45ConnectorHtml('Ujung B (Connector 2)', STANDARDS.t568a, 'Standar T568A')}
                </div>
            `;
        } else if (type === 't568b') {
            diagramView.innerHTML = `
                <div class="cable-summary-box">
                    <strong>Standar EIA/TIA-568B</strong>
                    <p>Standar susunan kabel paling umum dan menjadi standar baku instalasi jaringan di Indonesia dan perkantoran global.</p>
                </div>
                <div class="cable-connectors-grid single-connector">
                    ${renderRj45ConnectorHtml('Konektor T568B', STANDARDS.t568b, 'Standar Utama')}
                </div>
            `;
        } else if (type === 't568a') {
            diagramView.innerHTML = `
                <div class="cable-summary-box">
                    <strong>Standar EIA/TIA-568A</strong>
                    <p>Standar alternatif yang sering dipakai di instalasi pemerintah AS dan kabel cross-over pada salah satu ujungnya.</p>
                </div>
                <div class="cable-connectors-grid single-connector">
                    ${renderRj45ConnectorHtml('Konektor T568A', STANDARDS.t568a, 'Standar Alternatif')}
                </div>
            `;
        } else if (type === 'rollover') {
            const rolloverKeys = [...STANDARDS.t568b].reverse();
            diagramView.innerHTML = `
                <div class="cable-summary-box">
                    <strong>Kabel Rollover / Console</strong>
                    <p>Susunan pin dibalik sempurna: Pin 1 terhubung ke Pin 8, Pin 2 ke Pin 7, Pin 3 ke Pin 6, dst. Digunakan untuk menghubungkan port Serial PC ke port Console Router/Switch Cisco.</p>
                </div>
                <div class="cable-connectors-grid">
                    ${renderRj45ConnectorHtml('Ujung A (Konektor 1)', STANDARDS.t568b, 'Pin 1 s/d 8')}
                    ${renderRj45ConnectorHtml('Ujung B (Konektor 2)', rolloverKeys, 'Pin 8 s/d 1 (Terbalik)')}
                </div>
            `;
        }
    }

    select.addEventListener('change', updateCableDiagram);
    updateCableDiagram();

    // Quiz logic
    let quizMode = 't568b';
    let currentQuizPin = 1;
    let quizScore = 0;
    const totalQuizRounds = 8;
    let quizPinsQueue = [1, 2, 3, 4, 5, 6, 7, 8];

    const quizCard = container.querySelector('#wiring-quiz-card');
    const btnQuizB = container.querySelector('#btn-quiz-mode-b');
    const btnQuizA = container.querySelector('#btn-quiz-mode-a');

    btnQuizB.addEventListener('click', () => {
        quizMode = 't568b';
        btnQuizB.className = 'btn-primary';
        btnQuizA.className = 'btn-outline';
        startWiringQuiz();
    });

    btnQuizA.addEventListener('click', () => {
        quizMode = 't568a';
        btnQuizA.className = 'btn-primary';
        btnQuizB.className = 'btn-outline';
        startWiringQuiz();
    });

    function startWiringQuiz() {
        quizPinsQueue = [1, 2, 3, 4, 5, 6, 7, 8].sort(() => Math.random() - 0.5);
        quizScore = 0;
        nextQuizQuestion();
    }

    function nextQuizQuestion() {
        if (quizPinsQueue.length === 0) {
            renderQuizFinish();
            return;
        }

        currentQuizPin = quizPinsQueue.pop();
        const correctWireKey = STANDARDS[quizMode][currentQuizPin - 1];
        const correctWire = WIRE_COLORS[correctWireKey];

        // Buat 4 opsi jawaban acak
        const allKeys = Object.keys(WIRE_COLORS);
        const wrongKeys = allKeys.filter(k => k !== correctWireKey).sort(() => Math.random() - 0.5).slice(0, 3);
        const options = [correctWireKey, ...wrongKeys].sort(() => Math.random() - 0.5);

        quizCard.innerHTML = `
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.75rem;">
                <span style="font-size: 0.8rem; font-weight: 700; color: var(--primary-color); text-transform: uppercase;">
                    Standar ${quizMode.toUpperCase()}
                </span>
                <span style="font-size: 0.8rem; color: var(--text-secondary);">
                    Soal ke-${totalQuizRounds - quizPinsQueue.length} dari ${totalQuizRounds}
                </span>
            </div>

            <h3 style="margin-bottom: 0.85rem; font-size: 1.15rem;">
                Warna kabel apa yang berada pada <span style="color: var(--primary-color);">Pin ${currentQuizPin}</span>?
            </h3>

            <div class="quiz-options-grid">
                ${options.map(key => {
                    const item = WIRE_COLORS[key];
                    return `
                        <button type="button" class="btn-outline quiz-wire-btn" data-key="${key}">
                            <span class="quiz-wire-sample ${item.stripe ? 'wire-striped' : 'wire-solid'}" style="--wire-color: ${item.color};"></span>
                            <span>${item.name}</span>
                        </button>
                    `;
                }).join('')}
            </div>

            <div id="quiz-feedback-box" class="quiz-feedback-box hidden"></div>
        `;

        const feedbackBox = quizCard.querySelector('#quiz-feedback-box');
        const optionButtons = quizCard.querySelectorAll('.quiz-wire-btn');

        optionButtons.forEach(button => {
            button.addEventListener('click', () => {
                optionButtons.forEach(b => b.disabled = true);
                const selectedKey = button.dataset.key;

                if (selectedKey === correctWireKey) {
                    quizScore++;
                    button.classList.add('correct-choice');
                    feedbackBox.className = 'quiz-feedback-box feedback-correct';
                    feedbackBox.innerHTML = `✓ <strong>Tepat!</strong> Pin ${currentQuizPin} pada standar ${quizMode.toUpperCase()} adalah <strong>${correctWire.name}</strong>.`;
                } else {
                    button.classList.add('wrong-choice');
                    const correctBtn = quizCard.querySelector(`.quiz-wire-btn[data-key="${correctWireKey}"]`);
                    if (correctBtn) correctBtn.classList.add('correct-choice');
                    feedbackBox.className = 'quiz-feedback-box feedback-wrong';
                    feedbackBox.innerHTML = `✕ <strong>Kurang tepat.</strong> Pin ${currentQuizPin} pada ${quizMode.toUpperCase()} seharusnya adalah <strong>${correctWire.name}</strong>.`;
                }

                feedbackBox.classList.remove('hidden');

                setTimeout(() => {
                    nextQuizQuestion();
                }, 1600);
            });
        });
    }

    function renderQuizFinish() {
        const percentage = Math.round((quizScore / totalQuizRounds) * 100);
        quizCard.innerHTML = `
            <div style="text-align: center; padding: 1.5rem 0.5rem;">
                <p style="font-size: 2.2rem; margin-bottom: 0.5rem;" aria-hidden="true">
                    ${percentage >= 75 ? '🎉' : '📖'}
                </p>
                <h3>Hasil Latihan ${quizMode.toUpperCase()}</h3>
                <p style="font-size: 1.6rem; font-weight: 800; color: var(--primary-color); margin: 0.5rem 0;">
                    ${quizScore} / ${totalQuizRounds} Benar (${percentage}%)
                </p>
                <p style="color: var(--text-secondary); font-size: 0.9rem; max-width: 400px; margin: 0 auto 1.25rem;">
                    ${percentage === 100 
                        ? 'Luar biasa! Hafalan urutan warna kabel kamu sudah sempurna untuk praktikum crimping.' 
                        : 'Bagus! Terus ulangi latihan hingga kamu hafal ke-8 urutan warna di luar kepala.'}
                </p>
                <button type="button" id="btn-restart-wiring-quiz" class="btn-primary">
                    Ulangi Latihan
                </button>
            </div>
        `;

        quizCard.querySelector('#btn-restart-wiring-quiz').addEventListener('click', startWiringQuiz);
    }

    startWiringQuiz();
}
