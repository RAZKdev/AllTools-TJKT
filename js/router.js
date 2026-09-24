document.addEventListener('DOMContentLoaded', () => {
    initRouter();
});

function initRouter() {
    const navLinks = document.querySelectorAll(
        'nav a, .category-card, .tool-card[data-route]'
    );

    const views = document.querySelectorAll('.view-section');
    const homeView = document.getElementById('home-view');
    const toolView = document.getElementById('tool-view');
    const backBtn = document.getElementById('back-btn');
    const logo = document.getElementById('nav-home-logo');
    const contentArea = document.getElementById('tool-content-area');

    const searchInput = document.getElementById('global-search');
    const searchResults = document.getElementById('search-results');
    const toolCards = document.querySelectorAll(
        '.tools-grid .tool-card[data-route]'
    );

    const favoriteBtn = document.getElementById('favorite-btn');

    const favoritesContainer =
        document.getElementById('favorites-container');

    const favoritesGrid =
        document.getElementById('favorites-grid');

    const recentContainer =
        document.getElementById('recent-container');

    const recentGrid =
        document.getElementById('recent-grid');

    let currentRoute = 'home';

    /*
     * ==========================================
     * TOOL METADATA
     * ==========================================
     */

    const toolInfo = {
        'ip-calculator': {
            title: 'IP Address Calculator',
            icon: '🌐',
            image: 'assets/images/ip-calculator.jpg',
            category: 'Networking'
        },

        'subnet-calculator': {
            title: 'Subnet Calculator',
            icon: '🔢',
            image: 'assets/images/subnet-calculator.jpg',
            category: 'Networking'
        },

        'mac-address': {
            title: 'MAC Address Tools',
            icon: '🔗',
            image: 'assets/images/mac-address.jpg',
            category: 'Networking'
        },

        'cable-wiring': {
            title: 'Kabel UTP & Crimping',
            icon: '🔌',
            image: 'assets/images/cable-wiring.jpg',
            category: 'Networking'
        },

        'bandwidth-calculator': {
            title: 'Bandwidth Calculator',
            icon: '📊',
            image: 'assets/images/bandwidth-calculator.jpg',
            category: 'Calculator'
        },

        'converters': {
            title: 'Data Unit & Base Converter',
            icon: '🔄',
            image: 'assets/images/converters.jpg',
            category: 'Converter'
        },

        'quiz': {
            title: 'Subnetting & Quiz',
            icon: '🧠',
            image: 'assets/images/quiz.jpg',
            category: 'TJKT Practice'
        },

        'network-reference': {
            title: 'Network Reference',
            icon: '📚',
            image: 'assets/images/network-reference.jpg',
            category: 'Reference'
        },

        'about': {
            title: 'About AllTools TJKT',
            icon: '👤',
            category: 'About'
        }
    };

    /*
     * ==========================================
     * DASHBOARD CARD
     * ==========================================
     */

    function createDashboardCard(toolId) {
        const info = toolInfo[toolId];

        if (!info) {
            return null;
        }

        const card = document.createElement('div');

        card.className = 'dashboard-tool-card';
        card.dataset.route = toolId;
        card.tabIndex = 0;
        card.setAttribute('role', 'button');

        card.innerHTML = `
            <div class="dashboard-tool-icon">
                ${info.image ? `<img src="${info.image}" alt="${info.title}" class="dashboard-tool-img">` : info.icon}
            </div>

            <div class="dashboard-tool-content">
                <span class="dashboard-tool-category">
                    ${info.category}
                </span>

                <h4>${info.title}</h4>
            </div>

            <span class="dashboard-tool-arrow">→</span>
        `;

        card.addEventListener('click', () => {
            navigateTo(toolId);
        });

        card.addEventListener('keydown', (event) => {
            if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                navigateTo(toolId);
            }
        });

        return card;
    }

    /*
     * ==========================================
     * CATEGORY TOOL CARD
     * ==========================================
     */

    function createCategoryToolCard(toolId) {
        const info = toolInfo[toolId];

        if (!info) {
            return null;
        }

        const card = document.createElement('div');

        card.className = 'tool-card active-card';
        card.dataset.route = toolId;
        card.tabIndex = 0;
        card.setAttribute('role', 'button');

        card.innerHTML = `
            <div class="card-visual">
                ${info.image ? `<img src="${info.image}" alt="${info.title}" class="card-img" loading="lazy">` : info.icon}
            </div>

            <div class="card-content">
                <span class="card-category">
                    ${info.category}
                </span>

                <h4>${info.title}</h4>

                <p>
                    Buka ${info.title} untuk menggunakan tool ini.
                </p>
            </div>

            <div class="card-footer">
                <span class="btn-link">Buka Tool →</span>
            </div>
        `;

        card.addEventListener('click', () => {
            navigateTo(toolId);
        });

        card.addEventListener('keydown', event => {
            if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                navigateTo(toolId);
            }
        });

        return card;
    }

    /*
     * ==========================================
     * RENDER DASHBOARD
     * ==========================================
     */

    function renderDashboard() {
        if (!favoritesGrid || !recentGrid) {
            return;
        }

        const favorites = StorageManager.getFavorites();
        const recent = StorageManager.getRecent();

        favoritesGrid.innerHTML = '';
        recentGrid.innerHTML = '';

        /*
         * FAVORITES
         */

        if (favorites.length > 0) {
            favoritesContainer.classList.remove('hidden');

            favorites.forEach(toolId => {
                const card = createDashboardCard(toolId);

                if (card) {
                    favoritesGrid.appendChild(card);
                }
            });
        } else {
            favoritesContainer.classList.add('hidden');
        }

        /*
         * RECENT
         */

        if (recent.length > 0) {
            recentContainer.classList.remove('hidden');

            recent.forEach(toolId => {
                const card = createDashboardCard(toolId);

                if (card) {
                    recentGrid.appendChild(card);
                }
            });
        } else {
            recentContainer.classList.add('hidden');
        }
    }

    /*
     * ==========================================
     * FAVORITE BUTTON
     * ==========================================
     */

    function updateFavoriteButton(route) {
        if (!favoriteBtn) {
            return;
        }

        if (route === 'home' || !toolInfo[route]) {
            favoriteBtn.textContent = '☆';
            favoriteBtn.classList.remove('favorite-active');
            favoriteBtn.setAttribute(
                'aria-label',
                'Tambah ke Favorit'
            );
            return;
        }

        const isFavorite = StorageManager.isFavorite(route);

        favoriteBtn.textContent = isFavorite ? '★' : '☆';

        favoriteBtn.classList.toggle(
            'favorite-active',
            isFavorite
        );

        favoriteBtn.setAttribute(
            'aria-label',
            isFavorite
                ? 'Hapus dari Favorit'
                : 'Tambah ke Favorit'
        );
    }

    /*
     * ==========================================
     * NAVIGATION
     * ==========================================
     */

    function initFeedback() {
        const feedbackButtons =
            document.querySelectorAll('.feedback-type');

        const feedbackMessage =
            document.getElementById('feedback-message');

        const feedbackContext =
            document.getElementById('feedback-context');

        const feedbackCounter =
            document.getElementById('feedback-counter');

        const feedbackSubmit =
            document.getElementById('feedback-submit');

        const feedbackStatus =
            document.getElementById('feedback-status');

        if (
            !feedbackButtons.length ||
            !feedbackMessage ||
            !feedbackContext ||
            !feedbackCounter ||
            !feedbackSubmit ||
            !feedbackStatus
        ) {
            console.warn('Feedback elements tidak lengkap.');
            return;
        }

        let selectedType = 'bug';

        const feedbackLabels = {
            bug: 'Bug',
            suggestion: 'Saran',
            feedback: 'Feedback'
        };

        function updateCounter() {
            const length = feedbackMessage.value.length;

            feedbackCounter.textContent =
                `${length} / 500`;
        }

        function updateContext() {
            feedbackContext.textContent =
                `Halaman: About • Jenis: ${feedbackLabels[selectedType]}`;
        }

        feedbackButtons.forEach(button => {
            button.addEventListener('click', () => {
                selectedType =
                    button.dataset.feedbackType;

                feedbackButtons.forEach(item => {
                    item.classList.remove('active');
                });

                button.classList.add('active');

                updateContext();
            });
        });

        feedbackMessage.addEventListener('input', () => {
            updateCounter();
        });

        feedbackSubmit.addEventListener('click', () => {
            const message =
                feedbackMessage.value.trim();

            if (!message) {
                feedbackStatus.textContent =
                    'Tulis pesan terlebih dahulu.';

                feedbackStatus.classList.remove('hidden');

                feedbackMessage.focus();
                return;
            }

            const existingFeedback =
                JSON.parse(
                    localStorage.getItem('alltools_feedback') || '[]'
                );

            const newFeedback = {
                id: Date.now(),
                type: selectedType,
                icon:
                    selectedType === 'bug'
                        ? '🐛'
                        : selectedType === 'suggestion'
                            ? '💡'
                            : '❤️',
                label: feedbackLabels[selectedType],
                status: 'NEW',
                title: message,
                page: 'About',
                date: new Date().toLocaleDateString(
                    'en-GB',
                    {
                        day: '2-digit',
                        month: 'short',
                        year: 'numeric'
                    }
                )
            };

            existingFeedback.unshift(newFeedback);

            localStorage.setItem(
                'alltools_feedback',
                JSON.stringify(existingFeedback)
            );

            const label = feedbackLabels[selectedType];
            const waText = encodeURIComponent(`Halo Rangga, ada masukan [${label}] untuk AllTools TJKT:\n\n"${message}"`);
            const mailSubject = encodeURIComponent(`[AllTools TJKT] Masukan ${label}`);
            const mailBody = encodeURIComponent(`Halo Rangga,\n\nAda masukan untuk AllTools TJKT:\nJenis: ${label}\nHalaman: About\nPesan:\n${message}\n\nTerima kasih.`);

            feedbackStatus.innerHTML = `
                <div style="margin-bottom: 0.5rem; font-weight: 600;">
                    ✓ Masukan ${label} berhasil dicatat! Terima kasih telah berkontribusi.
                </div>
                <div class="feedback-direct-options">
                    <p>📤 Ingin meneruskan langsung ke kontak Rangga (Pembuat)?</p>
                    <div style="display: flex; gap: 0.5rem; flex-wrap: wrap;">
                        <a href="https://wa.me/?text=${waText}" target="_blank" rel="noopener" class="btn-primary" style="font-size: 0.8rem; min-height: 34px; text-decoration: none; padding: 0.4rem 0.8rem;">
                            💬 Kirim ke WhatsApp Pembuat
                        </a>
                        <a href="mailto:?subject=${mailSubject}&body=${mailBody}" class="btn-outline" style="font-size: 0.8rem; min-height: 34px; text-decoration: none; padding: 0.4rem 0.8rem;">
                            📧 Kirim ke Email Pembuat
                        </a>
                    </div>
                </div>
            `;

            feedbackStatus.classList.remove('hidden');

            feedbackMessage.value = '';

            updateCounter();
        });

        updateCounter();
        updateContext();
    }

    function navigateTo(route) {
        currentRoute = route;

        views.forEach(view => {
            view.classList.remove('active');
            view.classList.add('hidden');
        });

        if (route === 'home') {
            homeView.classList.remove('hidden');
            homeView.classList.add('active');

            renderDashboard();
        } else {
            toolView.classList.remove('hidden');
            toolView.classList.add('active');

            contentArea.innerHTML = '';

            /*
             * Simpan sebagai Recently Used
             * Hanya untuk tool routes yang ada di toolInfo —
             * category routes dan 'feedback' tidak punya card di dashboard.
             */
            if (toolInfo[route]) {
                StorageManager.addRecent(route);
            }

            /*
             * Category routes
             */
            const categoryTools = {
                networking: [
                    'ip-calculator',
                    'subnet-calculator',
                    'mac-address',
                    'cable-wiring'
                ],

                calculator: [
                    'bandwidth-calculator'
                ],

                converter: [
                    'converters'
                ],

                practice: [
                    'quiz'
                ],

                reference: [
                    'network-reference'
                ]
            };

            /*
             * Render category
             */
            if (categoryTools[route]) {
                const tools = categoryTools[route];

                contentArea.innerHTML = `
                    <div class="category-view">
                        <div class="category-view-header">
                            <span class="category-view-label">
                                AllTools TJKT
                            </span>

                            <h2>${route
                                .replace(/-/g, ' ')
                                .replace(/\b\w/g, char => char.toUpperCase())}</h2>

                            <p>
                                Pilih tool yang ingin digunakan.
                            </p>
                        </div>

                        <div class="tools-grid category-tools-grid"></div>
                    </div>
                `;

                const categoryGrid =
                    contentArea.querySelector('.category-tools-grid');

                tools.forEach(toolId => {
                    const card = createCategoryToolCard(toolId);

                    if (card) {
                        categoryGrid.appendChild(card);
                    }
                });

            /*
             * Render individual tool
             */
             } else if (route === 'feedback') {
                const CREATOR_PIN_KEY = 'alltools_creator_pin';
                const CREATOR_SESSION_KEY = 'alltools_creator_session';
                const DEFAULT_CREATOR_PIN = '2026';

                function getCreatorPin() {
                    return localStorage.getItem(CREATOR_PIN_KEY) || DEFAULT_CREATOR_PIN;
                }

                function isCreatorAuthenticated() {
                    return sessionStorage.getItem(CREATOR_SESSION_KEY) === 'true';
                }

                // Jika belum terautentikasi sebagai pembuat, tampilkan layar verifikasi PIN
                if (!isCreatorAuthenticated()) {
                    contentArea.innerHTML = `
                        <div class="creator-gate-view">
                            <div class="creator-gate-icon">🔒</div>
                            <h3>Verifikasi Pembuat (Creator Only)</h3>
                            <p>
                                Kotak masuk masukan ini bersifat privat dan hanya dapat dibuka oleh pembuat AllTools TJKT untuk meninjau laporan bug dan saran dari pengguna.
                            </p>

                            <div class="form-group" style="margin-bottom: 0.85rem; text-align: left;">
                                <label for="creator-pin-input" style="font-size: 0.82rem; color: var(--text-secondary); margin-bottom: 0.35rem; display: block;">
                                    Masukkan PIN Pengembang:
                                </label>
                                <input type="password" id="creator-pin-input" class="creator-pin-input" placeholder="••••" maxlength="16" autocomplete="off" autofocus>
                            </div>

                            <div style="display: flex; gap: 0.5rem; justify-content: center; margin-top: 1.25rem;">
                                <button type="button" id="btn-unlock-inbox" class="btn-primary" style="min-height: 42px; padding: 0.65rem 1.4rem;">
                                    Buka Inbox
                                </button>
                                <button type="button" id="btn-cancel-gate" class="btn-outline" style="min-height: 42px; padding: 0.65rem 1.2rem;">
                                    ← Kembali
                                </button>
                            </div>

                            <div id="creator-pin-error" class="creator-gate-error hidden"></div>
                            
                            <p style="margin-top: 1.5rem; margin-bottom: 0; font-size: 0.76rem; color: var(--text-secondary); opacity: 0.8;">
                                PIN Default: <code>2026</code> (dapat diubah setelah masuk)
                            </p>
                        </div>
                    `;

                    const pinInput = document.getElementById('creator-pin-input');
                    const unlockBtn = document.getElementById('btn-unlock-inbox');
                    const cancelBtn = document.getElementById('btn-cancel-gate');
                    const pinError = document.getElementById('creator-pin-error');

                    function handleUnlock() {
                        const enteredPin = pinInput.value.trim();
                        if (enteredPin === getCreatorPin()) {
                            sessionStorage.setItem(CREATOR_SESSION_KEY, 'true');
                            navigateTo('feedback');
                        } else {
                            pinError.textContent = '❌ PIN salah! Akses ditolak. Hanya pembuat yang berhak membuka inbox ini.';
                            pinError.classList.remove('hidden');
                            pinInput.value = '';
                            pinInput.focus();
                        }
                    }

                    unlockBtn.addEventListener('click', handleUnlock);
                    pinInput.addEventListener('keydown', (e) => {
                        if (e.key === 'Enter') {
                            e.preventDefault();
                            handleUnlock();
                        }
                    });

                    cancelBtn.addEventListener('click', () => {
                        navigateTo('about');
                    });

                    return;
                }

                // JIKA TERAUTENTIKASI: Tampilkan Feedback Inbox Lengkap
                let feedbackData = JSON.parse(
                    localStorage.getItem('alltools_feedback') || '[]'
                );

                contentArea.innerHTML = `
                    <div class="feedback-inbox-view">
                        <div class="feedback-inbox-toolbar">
                            <div style="display: flex; gap: 0.5rem; flex-wrap: wrap;">
                                <button type="button" id="btn-lock-inbox" class="btn-outline" style="font-size: 0.8rem; min-height: 34px;">
                                    🔒 Kunci & Keluar Mode Pembuat
                                </button>
                                <button type="button" id="btn-change-pin" class="btn-outline" style="font-size: 0.8rem; min-height: 34px;">
                                    🔑 Ganti PIN
                                </button>
                            </div>
                            <div style="display: flex; gap: 0.5rem; flex-wrap: wrap;">
                                <button type="button" id="btn-export-feedback" class="btn-primary" style="font-size: 0.8rem; min-height: 34px;">
                                    📥 Ekspor JSON
                                </button>
                                <button type="button" id="btn-clear-feedback" class="btn-outline" style="font-size: 0.8rem; min-height: 34px; color: var(--error-color);">
                                    🗑️ Hapus Semua
                                </button>
                            </div>
                        </div>

                        <div class="feedback-inbox-header">
                            <h2>📬 Feedback Inbox (Area Pembuat)</h2>
                            <p>
                                Seluruh masukan dan laporan bug yang dikirim oleh pengguna pada aplikasi ini.
                            </p>
                        </div>

                        <div class="feedback-filter" role="group" aria-label="Filter feedback">
                            <button type="button" class="active" data-feedback-filter="all">Semua</button>
                            <button type="button" data-feedback-filter="bug">🐛 Bug</button>
                            <button type="button" data-feedback-filter="suggestion">💡 Saran</button>
                            <button type="button" data-feedback-filter="feedback">❤️ Feedback</button>
                        </div>

                        <div class="feedback-inbox-count" id="feedback-inbox-count">
                            ${feedbackData.length} feedback
                        </div>

                        <div class="feedback-card-list" id="feedback-card-list"></div>
                    </div>
                `;

                const feedbackCardList = document.getElementById('feedback-card-list');
                const feedbackCount = document.getElementById('feedback-inbox-count');
                const feedbackFilters = document.querySelectorAll('[data-feedback-filter]');

                function escapeHtml(str) {
                    return String(str)
                        .replace(/&/g, '&amp;')
                        .replace(/</g, '&lt;')
                        .replace(/>/g, '&gt;')
                        .replace(/"/g, '&quot;')
                        .replace(/'/g, '&#39;');
                }

                function saveFeedbackData() {
                    localStorage.setItem('alltools_feedback', JSON.stringify(feedbackData));
                }

                let currentFilter = 'all';

                function renderFeedbackCards(filter = currentFilter) {
                    currentFilter = filter;
                    const filteredFeedback = filter === 'all'
                        ? feedbackData
                        : feedbackData.filter(item => item.type === filter);

                    feedbackCount.textContent = `${filteredFeedback.length} feedback`;

                    if (!filteredFeedback.length) {
                        feedbackCardList.innerHTML = `
                            <div class="about-section" style="text-align: center; padding: 2rem 1rem;">
                                <p style="color: var(--text-secondary); margin: 0;">
                                    Belum ada masukan pada kategori ini.
                                </p>
                            </div>
                        `;
                        return;
                    }

                    feedbackCardList.innerHTML = filteredFeedback.map(item => `
                        <article class="feedback-card" data-id="${item.id}">
                            <div class="feedback-card-header">
                                <span class="feedback-card-type">
                                    ${escapeHtml(item.icon)} ${escapeHtml(item.label)}
                                </span>

                                <div style="display: flex; align-items: center; gap: 0.5rem;">
                                    <button type="button" class="btn-toggle-status feedback-status-badge" data-id="${item.id}" style="cursor: pointer; border: 1px solid var(--border-color);" title="Klik untuk mengubah status">
                                        ${item.status === 'NEW' ? '🆕 NEW' : '✓ READ'}
                                    </button>
                                    <button type="button" class="btn-delete-item" data-id="${item.id}" style="cursor: pointer; padding: 0.2rem 0.5rem; font-size: 0.8rem; color: var(--error-color); border-radius: 6px; border: 1px solid var(--border-color); background: var(--bg-color);" title="Hapus masukan ini">
                                        ✕
                                    </button>
                                </div>
                            </div>

                            <div class="feedback-card-title">
                                ${escapeHtml(item.title)}
                            </div>

                            <div class="feedback-card-meta">
                                <span>Halaman: ${escapeHtml(item.page || 'About')}</span>
                                <span>${escapeHtml(item.date || '-')}</span>
                            </div>
                        </article>
                    `).join('');

                    // Event toggle status
                    feedbackCardList.querySelectorAll('.btn-toggle-status').forEach(btn => {
                        btn.addEventListener('click', () => {
                            const id = btn.dataset.id;
                            const target = feedbackData.find(f => String(f.id) === String(id));
                            if (target) {
                                target.status = target.status === 'NEW' ? 'READ' : 'NEW';
                                saveFeedbackData();
                                renderFeedbackCards();
                            }
                        });
                    });

                    // Event delete item
                    feedbackCardList.querySelectorAll('.btn-delete-item').forEach(btn => {
                        btn.addEventListener('click', () => {
                            const id = btn.dataset.id;
                            if (confirm('Hapus pesan feedback ini?')) {
                                feedbackData = feedbackData.filter(f => String(f.id) !== String(id));
                                saveFeedbackData();
                                renderFeedbackCards();
                            }
                        });
                    });
                }

                feedbackFilters.forEach(button => {
                    button.addEventListener('click', () => {
                        feedbackFilters.forEach(item => item.classList.remove('active'));
                        button.classList.add('active');
                        renderFeedbackCards(button.dataset.feedbackFilter);
                    });
                });

                // Toolbar Actions
                document.getElementById('btn-lock-inbox').addEventListener('click', () => {
                    sessionStorage.removeItem(CREATOR_SESSION_KEY);
                    navigateTo('about');
                });

                document.getElementById('btn-change-pin').addEventListener('click', () => {
                    const currentPin = prompt('Masukkan PIN saat ini:');
                    if (currentPin !== getCreatorPin()) {
                        alert('PIN saat ini salah!');
                        return;
                    }
                    const newPin = prompt('Masukkan PIN baru (minimal 4 digit):');
                    if (!newPin || newPin.trim().length < 4) {
                        alert('PIN baru tidak valid! Minimal 4 digit.');
                        return;
                    }
                    localStorage.setItem(CREATOR_PIN_KEY, newPin.trim());
                    alert('✓ PIN Pengembang berhasil diperbarui!');
                });

                document.getElementById('btn-export-feedback').addEventListener('click', () => {
                    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(feedbackData, null, 2));
                    const downloadAnchor = document.createElement('a');
                    downloadAnchor.setAttribute("href", dataStr);
                    downloadAnchor.setAttribute("download", `alltools_feedback_${Date.now()}.json`);
                    document.body.appendChild(downloadAnchor);
                    downloadAnchor.click();
                    downloadAnchor.remove();
                });

                document.getElementById('btn-clear-feedback').addEventListener('click', () => {
                    if (confirm('Yakin ingin menghapus seluruh data feedback? Tindakan ini tidak dapat dibatalkan.')) {
                        feedbackData = [];
                        saveFeedbackData();
                        renderFeedbackCards();
                    }
                });

                renderFeedbackCards();

} else if (route === 'about') {
                contentArea.innerHTML = `
                    <div class="about-view">

                        <div class="about-hero">
                            <div class="about-avatar" aria-hidden="true">
                                👨‍💻
                            </div>

                            <span class="about-label">
                                ABOUT THE PROJECT
                            </span>

                            <h2>AllTools TJKT</h2>

                            <p>
                                Dibuat oleh Rangga, pelajar TJKT yang sedang
                                belajar membangun teknologi dari nol.
                            </p>
                        </div>

                        <div class="about-section">
                            <h3>🎯 Kenapa AllTools TJKT dibuat?</h3>

                            <p>
                                AllTools TJKT dibuat untuk mengumpulkan berbagai
                                tools yang berguna dalam proses belajar TJKT
                                ke dalam satu tempat yang sederhana, cepat,
                                dan mudah digunakan.
                            </p>

                            <p>
                                Project ini juga menjadi bagian dari perjalanan
                                belajar membangun website menggunakan HTML,
                                CSS, JavaScript, Git, dan teknologi web lainnya.
                            </p>
                        </div>

                        <div class="about-section">
                            <h3>🛠️ Status Project</h3>

                            <div class="about-status">
                                <strong>Active Development</strong>
                                <span>AllTools TJKT terus dikembangkan dan diperbaiki.</span>
                            </div>
                        </div>

                        <div class="about-section feedback-section">
                            <h3>💬 Ceritain masalah atau idemu</h3>

                            <p>
                                Ada bug, punya saran, atau sekadar mau kasih feedback?
                                Ceritain aja seperti ngobrol dengan developer.
                            </p>

                            <div class="feedback-type-group"
                                 role="group"
                                 aria-label="Jenis feedback">

                                <button type="button"
                                        class="feedback-type active"
                                        data-feedback-type="bug">
                                    🐛 Bug
                                </button>

                                <button type="button"
                                        class="feedback-type"
                                        data-feedback-type="suggestion">
                                    💡 Saran
                                </button>

                                <button type="button"
                                        class="feedback-type"
                                        data-feedback-type="feedback">
                                    ❤️ Feedback
                                </button>

                            </div>

                            <textarea
                                id="feedback-message"
                                class="feedback-input"
                                maxlength="500"
                                placeholder="Contoh: Woi dev, search lu ngaco tuh 😂"
                                aria-label="Tulis feedback"></textarea>

                            <div class="feedback-meta">
                                <span id="feedback-context">
                                    Halaman: About
                                </span>

                                <span id="feedback-counter">
                                    0 / 500
                                </span>
                            </div>

                            <button type="button"
                                    id="feedback-submit"
                                    class="feedback-submit">
                                🚀 Kirim Feedback
                            </button>

                            <div id="feedback-status"
                                 class="feedback-status hidden"
                                 role="status"
                                 aria-live="polite"></div>

                            <button type="button"
                                    id="feedback-inbox-btn"
                                    class="btn-outline"
                                    style="width: 100%; margin-top: 1.25rem; font-size: 0.84rem; border-style: dashed; padding: 0.6rem 0.85rem;">
                                🔒 Buka Inbox Masukan (Khusus Pembuat)
                            </button>
                        </div>

</div>

                    </div>
                `;

                initFeedback();

                const feedbackInboxBtn =
                    document.getElementById('feedback-inbox-btn');

                if (feedbackInboxBtn) {
                    feedbackInboxBtn.addEventListener('click', () => {
                        navigateTo('feedback');
                    });
                }

            /*
             * Render individual tool
             */
            } else if (route === 'ip-calculator') {
                renderIpCalculator(contentArea);

            } else if (route === 'subnet-calculator') {
                renderSubnetCalculator(contentArea);

            } else if (route === 'mac-address') {
                renderMacAddressTools(contentArea);

            } else if (route === 'bandwidth-calculator') {
                renderBandwidthCalculator(contentArea);

            } else if (route === 'converters') {
                renderConverters(contentArea);

            } else if (route === 'quiz') {
                renderQuizModule(contentArea);

            } else if (route === 'network-reference') {
                renderNetworkReference(contentArea);

            } else if (route === 'cable-wiring') {
                renderCableWiring(contentArea);

            } else {
                contentArea.innerHTML = `
                    <div style="
                        padding: 2rem;
                        text-align: center;
                    ">
                        <h2>Kategori: ${route.toUpperCase()}</h2>

                        <p style="
                            color: var(--text-secondary);
                            margin-top: 1rem;
                        ">
                            Modul belum tersedia.
                        </p>
                    </div>
                `;
            }

            updateFavoriteButton(route);
        }

        /*
         * Update active navigation
         */
        document.querySelectorAll('nav a').forEach(link => {
            link.classList.remove('active');

            if (
                link.getAttribute('data-route') === route
            ) {
                link.classList.add('active');
            }
        });

        /*
         * Mobile menu
         */
        const mainNav =
            document.getElementById('main-nav');

        if (
            mainNav &&
            mainNav.classList.contains('active')
        ) {
            mainNav.classList.remove('active');
        }
    }

    /*
     * ==========================================
     * GLOBAL SEARCH
     * ==========================================
     */

    if (searchInput) {
        searchInput.addEventListener('input', () => {
            const query = searchInput.value.trim().toLowerCase();

            const keywords = query
                .split(/\s+/)
                .filter(Boolean);

            toolCards.forEach(card => {
                const title =
                    card.querySelector('h4')?.textContent.toLowerCase() || '';

                const category =
                    card.querySelector('.card-category')?.textContent.toLowerCase() || '';

                const description =
                    card.querySelector('p')?.textContent.toLowerCase() || '';

                const searchableText =
                    `${title} ${category} ${description}`;

                const matches =
                    keywords.length === 0 ||
                    keywords.every(keyword =>
                        searchableText.includes(keyword)
                    );

                card.style.display = matches ? '' : 'none';
            });
        });
    }

    /*
     * ==========================================
     * NAVIGATION EVENTS
     * ==========================================
     */

    navLinks.forEach(link => {
        link.addEventListener('click', event => {
            event.preventDefault();

            const route =
                link.getAttribute('data-route') ||
                link.closest('[data-route]')?.getAttribute(
                    'data-route'
                );

            if (route) {
                navigateTo(route);
            }
        });
    });

    /*
     * ==========================================
     * BACK BUTTON
     * ==========================================
     */

    if (backBtn) {
        backBtn.addEventListener('click', () => {
            navigateTo('home');
        });
    }

    /*
     * ==========================================
     * LOGO
     * ==========================================
     */

    if (logo) {
        logo.addEventListener('click', event => {
            event.preventDefault();
            navigateTo('home');
        });
    }

    /*
     * ==========================================
     * FAVORITE CLICK
     * ==========================================
     */

    if (favoriteBtn) {
        favoriteBtn.addEventListener('click', () => {
            if (
                currentRoute === 'home' ||
                !toolInfo[currentRoute]
            ) {
                return;
            }

            StorageManager.toggleFavorite(currentRoute);

            updateFavoriteButton(currentRoute);

            /*
             * Langsung refresh dashboard
             * supaya perubahan tersimpan di UI.
             */
            renderDashboard();
        });
    }

    /*
     * ==========================================
     * INITIAL STATE
     * ==========================================
     */

    updateFavoriteButton('home');
    renderDashboard();
}
