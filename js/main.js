document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    initMobileMenu();
    initSettings();
});

/* ===========================================
   THEME
   =========================================== */
function initTheme() {
    const themeBtn = document.getElementById('theme-toggle');
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);

    themeBtn.addEventListener('click', () => {
        const currentTheme =
            document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeIcon(newTheme);
    });
}

function updateThemeIcon(theme) {
    const themeBtn = document.getElementById('theme-toggle');
    themeBtn.textContent = theme === 'light' ? '🌙' : '☀️';
}

/* ===========================================
   MOBILE MENU
   =========================================== */
function initMobileMenu() {
    const menuBtn  = document.getElementById('mobile-menu-btn');
    const mainNav  = document.getElementById('main-nav');

    menuBtn.addEventListener('click', () => {
        mainNav.classList.toggle('active');
    });
}

/* ===========================================
   SETTINGS MODAL
   =========================================== */
function initSettings() {
    const settingsBtn = document.getElementById('settings-btn');
    if (!settingsBtn) return;

    settingsBtn.addEventListener('click', openSettingsModal);
}

function openSettingsModal() {
    /* Jangan buat modal duplikat */
    if (document.getElementById('settings-modal')) return;

    const overlay = document.createElement('div');
    overlay.id    = 'settings-modal';
    overlay.className = 'settings-overlay';
    overlay.setAttribute('role', 'dialog');
    overlay.setAttribute('aria-modal', 'true');
    overlay.setAttribute('aria-label', 'Pengaturan Data');

    overlay.innerHTML = `
        <div class="settings-dialog">
            <div class="settings-dialog-header">
                <h2 class="settings-dialog-title">⚙️ Pengaturan Data</h2>
                <button
                    id="settings-close-btn"
                    class="settings-close-btn"
                    aria-label="Tutup pengaturan"
                >✕</button>
            </div>

            <p class="settings-dialog-desc">
                Kelola data yang tersimpan di browser ini.<br>
                Data hanya ada di perangkat ini dan tidak tersinkron ke perangkat lain.
            </p>

            <div class="settings-action-list">

                <div class="settings-action-item">
                    <div class="settings-action-info">
                        <strong>⭐ Favorit</strong>
                        <span>Daftar tool yang kamu tandai sebagai favorit.</span>
                    </div>
                    <button
                        class="btn-outline settings-action-btn"
                        data-settings-action="clear-favorites"
                    >
                        Hapus
                    </button>
                </div>

                <div class="settings-action-item">
                    <div class="settings-action-info">
                        <strong>🕒 Riwayat</strong>
                        <span>Tool yang terakhir kamu buka (max 5 item).</span>
                    </div>
                    <button
                        class="btn-outline settings-action-btn"
                        data-settings-action="clear-recent"
                    >
                        Hapus
                    </button>
                </div>

                <div class="settings-action-item">
                    <div class="settings-action-info">
                        <strong>📊 Progress Kuis</strong>
                        <span>Statistik dan riwayat sesi kuis.</span>
                    </div>
                    <button
                        class="btn-outline settings-action-btn"
                        data-settings-action="clear-quiz"
                    >
                        Hapus
                    </button>
                </div>

                <div class="settings-action-item">
                    <div class="settings-action-info">
                        <strong>💬 Feedback</strong>
                        <span>Feedback yang tersimpan di browser ini.</span>
                    </div>
                    <button
                        class="btn-outline settings-action-btn"
                        data-settings-action="clear-feedback"
                    >
                        Hapus
                    </button>
                </div>

            </div>

            <div id="settings-confirm-area" class="settings-confirm-area hidden">
                <p id="settings-confirm-msg" class="settings-confirm-msg"></p>
                <div class="settings-confirm-actions">
                    <button id="settings-confirm-yes" class="btn-primary">Ya, Hapus</button>
                    <button id="settings-confirm-no"  class="btn-outline">Batal</button>
                </div>
            </div>

            <div id="settings-status" class="settings-status hidden" role="status" aria-live="polite"></div>

        </div>
    `;

    document.body.appendChild(overlay);

    /* Tutup saat klik overlay (luar dialog) */
    overlay.addEventListener('click', (e) => {
        if (e.target === overlay) closeSettingsModal();
    });

    document.getElementById('settings-close-btn')
        .addEventListener('click', closeSettingsModal);

    /* Trap Escape */
    overlay._escHandler = (e) => {
        if (e.key === 'Escape') closeSettingsModal();
    };
    document.addEventListener('keydown', overlay._escHandler);

    /* Action buttons */
    const actionLabels = {
        'clear-favorites': 'Hapus semua data Favorit?',
        'clear-recent':    'Hapus semua Riwayat akses?',
        'clear-quiz':      'Hapus semua Progress Kuis? Statistik dan riwayat sesi akan hilang.',
        'clear-feedback':  'Hapus semua data Feedback di browser ini?'
    };

    let pendingAction = null;

    const confirmArea  = document.getElementById('settings-confirm-area');
    const confirmMsg   = document.getElementById('settings-confirm-msg');
    const confirmYes   = document.getElementById('settings-confirm-yes');
    const confirmNo    = document.getElementById('settings-confirm-no');
    const statusEl     = document.getElementById('settings-status');

    function showConfirm(action) {
        pendingAction = action;
        confirmMsg.textContent = actionLabels[action];
        confirmArea.classList.remove('hidden');
        statusEl.classList.add('hidden');
        confirmYes.focus();
    }

    function hideConfirm() {
        pendingAction = null;
        confirmArea.classList.add('hidden');
    }

    function showStatus(msg) {
        statusEl.textContent = msg;
        statusEl.classList.remove('hidden');
    }

    overlay.querySelectorAll('.settings-action-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            showConfirm(btn.dataset.settingsAction);
        });
    });

    confirmNo.addEventListener('click', hideConfirm);

    confirmYes.addEventListener('click', () => {
        if (!pendingAction) return;

        switch (pendingAction) {
            case 'clear-favorites':
                localStorage.removeItem('alltools_favorites');
                showStatus('✓ Favorit berhasil dihapus.');
                break;
            case 'clear-recent':
                localStorage.removeItem('alltools_recent');
                showStatus('✓ Riwayat berhasil dihapus.');
                break;
            case 'clear-quiz':
                localStorage.removeItem('alltools-tjkt-quiz-progress-v1');
                showStatus('✓ Progress kuis berhasil dihapus.');
                break;
            case 'clear-feedback':
                localStorage.removeItem('alltools_feedback');
                showStatus('✓ Data feedback berhasil dihapus.');
                break;
        }

        hideConfirm();
    });

    /* Focus ke close button saat modal dibuka */
    document.getElementById('settings-close-btn').focus();
}

function closeSettingsModal() {
    const overlay = document.getElementById('settings-modal');
    if (!overlay) return;

    document.removeEventListener('keydown', overlay._escHandler);
    overlay.remove();

    /* Kembalikan fokus ke settings-btn */
    const settingsBtn = document.getElementById('settings-btn');
    if (settingsBtn) settingsBtn.focus();
}
