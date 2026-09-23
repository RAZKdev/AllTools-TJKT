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
            category: 'Networking'
        },

        'subnet-calculator': {
            title: 'Subnet Calculator',
            icon: '🔢',
            category: 'Networking'
        },

        'mac-address': {
            title: 'MAC Address Tools',
            icon: '🔗',
            category: 'Networking'
        },

        'bandwidth-calculator': {
            title: 'Bandwidth Calculator',
            icon: '📊',
            category: 'Calculator'
        },

        'converters': {
            title: 'Data Unit & Base Converter',
            icon: '🔄',
            category: 'Converter'
        },

        'quiz': {
            title: 'Subnetting & Quiz',
            icon: '🧠',
            category: 'TJKT Practice'
        },

        'network-reference': {
            title: 'Network Reference',
            icon: '📚',
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
                ${info.icon}
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
            <div class="card-visual" aria-hidden="true">
                ${info.icon}
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

            feedbackStatus.textContent =
                `Feedback ${feedbackLabels[selectedType]} berhasil diterima. Terima kasih!`;

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
                    'mac-address'
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
                const defaultFeedback = [
                    {
                        id: 'demo-1',
                        type: 'bug',
                        icon: '🐛',
                        label: 'Bug',
                        status: 'NEW',
                        title: 'Search tidak bekerja',
                        page: 'Home',
                        date: '10 Aug 2026'
                    },
                    {
                        id: 'demo-2',
                        type: 'suggestion',
                        icon: '💡',
                        label: 'Saran',
                        status: 'NEW',
                        title: 'Tambahkan dark mode',
                        page: 'Settings',
                        date: '10 Aug 2026'
                    },
                    {
                        id: 'demo-3',
                        type: 'feedback',
                        icon: '❤️',
                        label: 'Feedback',
                        status: 'READ',
                        title: 'Website-nya keren',
                        page: 'Home',
                        date: '9 Aug 2026'
                    }
                ];

                let feedbackData =
                    JSON.parse(
                        localStorage.getItem('alltools_feedback') || 'null'
                    );

                if (!Array.isArray(feedbackData)) {
                    feedbackData = defaultFeedback;

                    localStorage.setItem(
                        'alltools_feedback',
                        JSON.stringify(feedbackData)
                    );
                }

                contentArea.innerHTML = `
                    <div class="feedback-inbox-view">

                        <div class="feedback-inbox-header">
                            <h2>📬 Feedback Inbox</h2>
                            <p>
                                Kelola feedback yang masuk dari pengguna.
                            </p>
                        </div>

                        <div class="feedback-filter"
                             role="group"
                             aria-label="Filter feedback">

                            <button type="button"
                                    class="active"
                                    data-feedback-filter="all">
                                Semua
                            </button>

                            <button type="button"
                                    data-feedback-filter="bug">
                                🐛 Bug
                            </button>

                            <button type="button"
                                    data-feedback-filter="suggestion">
                                💡 Saran
                            </button>

                            <button type="button"
                                    data-feedback-filter="feedback">
                                ❤️ Feedback
                            </button>

                        </div>

                        <div class="feedback-inbox-count"
                             id="feedback-inbox-count">
                            3 feedback
                        </div>

                        <div class="feedback-card-list"
                             id="feedback-card-list">
                        </div>

                    </div>
                `;

                const feedbackCardList =
                    document.getElementById('feedback-card-list');

                const feedbackCount =
                    document.getElementById('feedback-inbox-count');

                const feedbackFilters =
                    document.querySelectorAll('[data-feedback-filter]');

                function escapeHtml(str) {
                    return String(str)
                        .replace(/&/g, '&amp;')
                        .replace(/</g, '&lt;')
                        .replace(/>/g, '&gt;')
                        .replace(/"/g, '&quot;')
                        .replace(/'/g, '&#39;');
                }

                function renderFeedbackCards(filter = 'all') {
                    const filteredFeedback =
                        filter === 'all'
                            ? feedbackData
                            : feedbackData.filter(item => item.type === filter);

                    feedbackCount.textContent =
                        `${filteredFeedback.length} feedback`;

                    if (!filteredFeedback.length) {
                        feedbackCardList.innerHTML = `
                            <div class="about-section">
                                <p>
                                    Belum ada feedback pada kategori ini.
                                </p>
                            </div>
                        `;
                        return;
                    }

                    feedbackCardList.innerHTML =
                        filteredFeedback.map(item => `
                            <article class="feedback-card">

                                <div class="feedback-card-header">
                                    <span class="feedback-card-type">
                                        ${escapeHtml(item.icon)} ${escapeHtml(item.label)}
                                    </span>

                                    <span class="feedback-status-badge">
                                        ${item.status === 'NEW' ? '🆕 NEW' : '✓ READ'}
                                    </span>
                                </div>

                                <div class="feedback-card-title">
                                    ${escapeHtml(item.title)}
                                </div>

                                <div class="feedback-card-meta">
                                    <span>Halaman: ${escapeHtml(item.page)}</span>
                                    <span>${escapeHtml(item.date)}</span>
                                </div>

                            </article>
                        `).join('');
                }

                feedbackFilters.forEach(button => {
                    button.addEventListener('click', () => {
                        feedbackFilters.forEach(item => {
                            item.classList.remove('active');
                        });

                        button.classList.add('active');

                        renderFeedbackCards(
                            button.dataset.feedbackFilter
                        );
                    });
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
                                    class="feedback-inbox-btn">
                                📬 Feedback Inbox
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
