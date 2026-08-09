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
             */
            StorageManager.addRecent(route);

            /*
             * Render tool
             */
            if (route === 'ip-calculator') {
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
                            Modul ini akan diimplementasikan
                            pada phase berikutnya.
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
