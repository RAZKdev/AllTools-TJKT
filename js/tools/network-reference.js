// Modul Network Reference

function renderNetworkReference(container) {
    container.innerHTML = `
        <div class="tool-card">
            <h2>Network Reference</h2>
            <p class="tool-desc">
                Referensi cepat OSI Model, TCP/IP, port, dan protokol jaringan.
            </p>

            <div class="converter-tabs reference-tabs"
                 style="display:flex; gap:0.5rem; margin-bottom:1.5rem; flex-wrap:wrap;">

                <button class="btn-outline reference-tab-btn active"
                        data-target="reference-osi">
                    OSI Model
                </button>

                <button class="btn-outline reference-tab-btn"
                        data-target="reference-tcpip">
                    TCP/IP
                </button>

                <button class="btn-outline reference-tab-btn"
                        data-target="reference-ports">
                    Ports
                </button>

                <button class="btn-outline reference-tab-btn"
                        data-target="reference-protocols">
                    Protocols
                </button>
            </div>

            <div id="reference-osi" class="reference-panel">
                <h3>OSI Model</h3>

                <table class="result-table">
                    <tr>
                        <th>Layer</th>
                        <th>Nama</th>
                        <th>Fungsi</th>
                    </tr>
                    <tr>
                        <td>7</td>
                        <td>Application</td>
                        <td>Layanan jaringan untuk aplikasi pengguna.</td>
                    </tr>
                    <tr>
                        <td>6</td>
                        <td>Presentation</td>
                        <td>Format data, enkripsi, dan kompresi.</td>
                    </tr>
                    <tr>
                        <td>5</td>
                        <td>Session</td>
                        <td>Mengelola sesi komunikasi.</td>
                    </tr>
                    <tr>
                        <td>4</td>
                        <td>Transport</td>
                        <td>Komunikasi end-to-end dan pengiriman data.</td>
                    </tr>
                    <tr>
                        <td>3</td>
                        <td>Network</td>
                        <td>Routing dan pengalamatan IP.</td>
                    </tr>
                    <tr>
                        <td>2</td>
                        <td>Data Link</td>
                        <td>Frame dan MAC Address.</td>
                    </tr>
                    <tr>
                        <td>1</td>
                        <td>Physical</td>
                        <td>Pengiriman bit melalui media fisik.</td>
                    </tr>
                </table>
            </div>

            <div id="reference-tcpip" class="reference-panel hidden">
                <h3>TCP/IP Model</h3>

                <table class="result-table">
                    <tr>
                        <th>Layer</th>
                        <th>Fungsi</th>
                    </tr>
                    <tr>
                        <td>Application</td>
                        <td>Layanan aplikasi dan protokol tingkat aplikasi.</td>
                    </tr>
                    <tr>
                        <td>Transport</td>
                        <td>Komunikasi end-to-end menggunakan TCP/UDP.</td>
                    </tr>
                    <tr>
                        <td>Internet</td>
                        <td>Pengalamatan dan routing menggunakan IP.</td>
                    </tr>
                    <tr>
                        <td>Network Access</td>
                        <td>Pengiriman frame dan akses ke media jaringan.</td>
                    </tr>
                </table>
            </div>

            <div id="reference-ports" class="reference-panel hidden">
                <h3>Common Network Ports</h3>
                <div id="reference-port-list"></div>
            </div>

            <div id="reference-protocols" class="reference-panel hidden">
                <h3>Network Protocols</h3>
                <div id="reference-protocol-list"></div>
            </div>
        </div>
    `;

    setupReferenceTabs(container);
    renderReferencePorts(container);
    renderReferenceProtocols(container);
}

function setupReferenceTabs(container) {
    const buttons = container.querySelectorAll('.reference-tab-btn');

    buttons.forEach(button => {
        button.addEventListener('click', () => {
            buttons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            const target = button.getAttribute('data-target');

            container.querySelectorAll('.reference-panel').forEach(panel => {
                panel.classList.add('hidden');
            });

            const targetPanel = container.querySelector(`#${target}`);

            if (targetPanel) {
                targetPanel.classList.remove('hidden');
            }
        });
    });
}

function renderReferencePorts(container) {
    const target = container.querySelector('#reference-port-list');

    if (!target) return;

    if (typeof networkPorts === 'undefined' || !Array.isArray(networkPorts)) {
        target.innerHTML = `
            <p class="error-msg">
                Data port belum tersedia.
            </p>
        `;
        return;
    }

    target.innerHTML = `
        <table class="result-table">
            <tr>
                <th>Port</th>
                <th>Protocol</th>
                <th>Service</th>
                <th>Description</th>
            </tr>

            ${networkPorts.map(item => `
                <tr>
                    <td>${item.port}</td>
                    <td>${item.protocol}</td>
                    <td>${item.service}</td>
                    <td>${item.description}</td>
                </tr>
            `).join('')}
        </table>
    `;
}

function renderReferenceProtocols(container) {
    const target = container.querySelector('#reference-protocol-list');

    if (!target) return;

    if (typeof networkProtocols === 'undefined' || !Array.isArray(networkProtocols)) {
        target.innerHTML = `
            <p class="error-msg">
                Data protokol belum tersedia.
            </p>
        `;
        return;
    }

    target.innerHTML = `
        <table class="result-table">
            <tr>
                <th>Protocol</th>
                <th>Layer</th>
                <th>Description</th>
            </tr>

            ${networkProtocols.map(item => `
                <tr>
                    <td>${item.name}</td>
                    <td>${item.layer}</td>
                    <td>${item.desc}</td>
                </tr>
            `).join('')}
        </table>
    `;
}
