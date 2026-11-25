function initMain() {
    initI18n();
    initTheme();
    initMobileMenu();
    initSettings();
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initMain);
} else {
    initMain();
}

/* ===========================================
   LOCALIZATION (I18N)
   =========================================== */
function initI18n() {
    if (typeof I18n !== 'undefined' && typeof I18N_DICTIONARY !== 'undefined') {
        I18n.init(I18N_DICTIONARY, {
            storageKey: 'alltools_lang',
            defaultLang: 'id'
        });
    }

    const langBtn = document.getElementById('lang-toggle');
    if (!langBtn) return;

    function updateLangBtn() {
        if (typeof I18n === 'undefined') return;
        const current = I18n.currentLang;
        if (current === 'id') {
            langBtn.textContent = '🌐 EN';
            langBtn.setAttribute('aria-label', I18n.t('common.langToggleAria'));
            langBtn.title = I18n.t('common.langToggleTitle');
        } else {
            langBtn.textContent = '🌐 ID';
            langBtn.setAttribute('aria-label', I18n.t('common.langToggleAria'));
            langBtn.title = I18n.t('common.langToggleTitle');
        }
    }

    langBtn.addEventListener('click', () => {
        if (typeof I18n !== 'undefined') {
            I18n.toggle();
            updateLangBtn();
        }
    });

    window.addEventListener('languagechange', () => {
        updateLangBtn();
    });

    updateLangBtn();
}

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

    const t = (path, params) => typeof I18n !== 'undefined' ? I18n.t(path, params) : path;
    const currentLang = typeof I18n !== 'undefined' ? I18n.currentLang : 'id';

    const overlay = document.createElement('div');
    overlay.id    = 'settings-modal';
    overlay.className = 'settings-overlay';
    overlay.setAttribute('role', 'dialog');
    overlay.setAttribute('aria-modal', 'true');
    overlay.setAttribute('aria-label', t('settings.modalTitle'));

    overlay.innerHTML = `
        <div class="settings-dialog">
            <div class="settings-dialog-header">
                <h2 class="settings-dialog-title" data-i18n="settings.modalTitle">${t('settings.modalTitle')}</h2>
                <button
                    id="settings-close-btn"
                    class="settings-close-btn"
                    aria-label="${t('settings.closeAria')}"
                    data-i18n-aria="settings.closeAria"
                >✕</button>
            </div>

            <p class="settings-dialog-desc" data-i18n="settings.modalDesc">
                ${t('settings.modalDesc')}
            </p>

            <div class="settings-action-list">

                <!-- Pengaturan Bahasa -->
                <div class="settings-action-item">
                    <div class="settings-action-info">
                        <strong data-i18n="settings.languageLabel">${t('settings.languageLabel')}</strong>
                        <span data-i18n="settings.languageDesc">${t('settings.languageDesc')}</span>
                    </div>
                    <select id="settings-lang-select" style="padding: 0.4rem 0.65rem; border-radius: var(--radius); border: 1px solid var(--border-color); background: var(--bg-color); color: var(--text-color); font-weight: 600; cursor: pointer;">
                        <option value="id" ${currentLang === 'id' ? 'selected' : ''}>🇮🇩 Bahasa Indonesia</option>
                        <option value="en" ${currentLang === 'en' ? 'selected' : ''}>🇬🇧 English</option>
                    </select>
                </div>

                <!-- Ekspor Progres Belajar -->
                <div class="settings-action-item">
                    <div class="settings-action-info">
                        <strong data-i18n="settings.exportLabel">${t('settings.exportLabel')}</strong>
                        <span data-i18n="settings.exportDesc">${t('settings.exportDesc')}</span>
                    </div>
                    <button
                        id="settings-export-btn"
                        class="btn-primary settings-action-btn"
                        data-i18n="settings.exportBtn"
                    >
                        ${t('settings.exportBtn')}
                    </button>
                </div>

                <!-- Impor Progres Belajar -->
                <div class="settings-action-item">
                    <div class="settings-action-info">
                        <strong data-i18n="settings.importLabel">${t('settings.importLabel')}</strong>
                        <span data-i18n="settings.importDesc">${t('settings.importDesc')}</span>
                    </div>
                    <button
                        id="settings-import-btn"
                        class="btn-primary settings-action-btn"
                        data-i18n="settings.importBtn"
                    >
                        ${t('settings.importBtn')}
                    </button>
                    <input type="file" id="settings-import-file" accept=".json" class="hidden" style="display: none;">
                </div>

                <div class="settings-action-item">
                    <div class="settings-action-info">
                        <strong data-i18n="settings.favoritesLabel">${t('settings.favoritesLabel')}</strong>
                        <span data-i18n="settings.favoritesDesc">${t('settings.favoritesDesc')}</span>
                    </div>
                    <button
                        class="btn-outline settings-action-btn"
                        data-settings-action="clear-favorites"
                        data-i18n="settings.clearBtn"
                    >
                        ${t('settings.clearBtn')}
                    </button>
                </div>

                <div class="settings-action-item">
                    <div class="settings-action-info">
                        <strong data-i18n="settings.recentLabel">${t('settings.recentLabel')}</strong>
                        <span data-i18n="settings.recentDesc">${t('settings.recentDesc')}</span>
                    </div>
                    <button
                        class="btn-outline settings-action-btn"
                        data-settings-action="clear-recent"
                        data-i18n="settings.clearBtn"
                    >
                        ${t('settings.clearBtn')}
                    </button>
                </div>

                <div class="settings-action-item">
                    <div class="settings-action-info">
                        <strong data-i18n="settings.quizLabel">${t('settings.quizLabel')}</strong>
                        <span data-i18n="settings.quizDesc">${t('settings.quizDesc')}</span>
                    </div>
                    <button
                        class="btn-outline settings-action-btn"
                        data-settings-action="clear-quiz"
                        data-i18n="settings.clearBtn"
                    >
                        ${t('settings.clearBtn')}
                    </button>
                </div>

                <div class="settings-action-item">
                    <div class="settings-action-info">
                        <strong data-i18n="settings.feedbackLabel">${t('settings.feedbackLabel')}</strong>
                        <span data-i18n="settings.feedbackDesc">${t('settings.feedbackDesc')}</span>
                    </div>
                    <button
                        class="btn-outline settings-action-btn"
                        data-settings-action="clear-feedback"
                        data-i18n="settings.clearBtn"
                    >
                        ${t('settings.clearBtn')}
                    </button>
                </div>

            </div>

            <div id="settings-confirm-area" class="settings-confirm-area hidden">
                <p id="settings-confirm-msg" class="settings-confirm-msg"></p>
                <div class="settings-confirm-actions">
                    <button id="settings-confirm-yes" class="btn-primary">Ya / Confirm</button>
                    <button id="settings-confirm-no"  class="btn-outline">Batal / Cancel</button>
                </div>
            </div>

            <div id="settings-status" class="settings-status hidden" role="status" aria-live="polite"></div>

        </div>
    `;

    document.body.appendChild(overlay);

    /* Event listener ganti bahasa dari modal */
    const langSelect = document.getElementById('settings-lang-select');
    if (langSelect && typeof I18n !== 'undefined') {
        langSelect.addEventListener('change', (e) => {
            I18n.setLanguage(e.target.value);
            I18n.translateDOM(overlay);
        });
    }

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

    let pendingAction = null;
    let pendingImportData = null;

    const confirmArea  = document.getElementById('settings-confirm-area');
    const confirmMsg   = document.getElementById('settings-confirm-msg');
    const confirmYes   = document.getElementById('settings-confirm-yes');
    const confirmNo    = document.getElementById('settings-confirm-no');
    const statusEl     = document.getElementById('settings-status');

    function getActionLabel(action) {
        switch (action) {
            case 'clear-favorites': return t('settings.confirmFavorites');
            case 'clear-recent':    return t('settings.confirmRecent');
            case 'clear-quiz':      return t('settings.confirmQuiz');
            case 'clear-feedback':  return t('settings.confirmFeedback');
            case 'import':          return t('settings.confirmImport');
            default: return 'Konfirmasi tindakan?';
        }
    }

    function showConfirm(action, importData = null) {
        pendingAction = action;
        pendingImportData = importData;
        confirmMsg.textContent = getActionLabel(action);
        confirmArea.classList.remove('hidden');
        statusEl.classList.add('hidden');
        confirmYes.focus();
    }

    function hideConfirm() {
        pendingAction = null;
        pendingImportData = null;
        confirmArea.classList.add('hidden');
    }

    function showStatus(msg) {
        statusEl.textContent = msg;
        statusEl.classList.remove('hidden');
    }

    overlay.querySelectorAll('.settings-action-btn[data-settings-action]').forEach(btn => {
        btn.addEventListener('click', () => {
            showConfirm(btn.dataset.settingsAction);
        });
    });

    /* Ekspor progres belajar (JSON) */
    const exportBtn = document.getElementById('settings-export-btn');
    if (exportBtn) {
        exportBtn.addEventListener('click', () => {
            try {
                if (typeof StorageManager === 'undefined' || typeof buildBackupPayload !== 'function') {
                    showStatus('Error: Storage backup is unavailable.');
                    return;
                }
                const snap = StorageManager.createBackupSnapshot();
                const payload = buildBackupPayload(snap);
                const jsonStr = JSON.stringify(payload, null, 2);
                const blob = new Blob([jsonStr], { type: 'application/json' });
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = `alltools_progres_${Date.now()}.json`;
                document.body.appendChild(a);
                a.click();
                a.remove();
                URL.revokeObjectURL(url);
            } catch (err) {
                showStatus('Error: ' + err.message);
            }
        });
    }

    /* Impor progres belajar (JSON) */
    const importBtn = document.getElementById('settings-import-btn');
    const importFileInput = document.getElementById('settings-import-file');
    if (importBtn && importFileInput) {
        importBtn.addEventListener('click', () => {
            importFileInput.value = '';
            importFileInput.click();
        });

        importFileInput.addEventListener('change', (e) => {
            const file = e.target.files && e.target.files[0];
            if (!file) return;

            // Tolak berkas > 1 MB sebelum membaca isinya
            if (file.size > 1048576) {
                showStatus(t('settings.importError') + t('settings.errTooBig'));
                importFileInput.value = '';
                return;
            }

            const reader = new FileReader();
            reader.onload = (evt) => {
                const text = evt.target.result;
                if (typeof parseBackupPayload !== 'function') {
                    showStatus(t('settings.importError') + 'Parser unavailable');
                    return;
                }
                const res = parseBackupPayload(text);
                if (!res.ok) {
                    let errText = '';
                    switch (res.error) {
                        case 'too_big':
                            errText = t('settings.errTooBig');
                            break;
                        case 'invalid_json':
                            errText = t('settings.errInvalidJson');
                            break;
                        case 'wrong_app':
                            errText = t('settings.errWrongApp');
                            break;
                        case 'unknown_version':
                            errText = t('settings.errUnknownVersion');
                            break;
                        case 'invalid_field':
                        default:
                            errText = t('settings.errInvalidField');
                            break;
                    }
                    showStatus(t('settings.importError') + errText);
                    return;
                }

                if (typeof StorageManager !== 'undefined' && StorageManager.hasSavedData()) {
                    showConfirm('import', res.data);
                } else {
                    if (typeof StorageManager !== 'undefined') {
                        StorageManager.applyBackupData(res.data);
                    }
                    showStatus(t('settings.importSuccess'));
                    if (langSelect && typeof StorageManager !== 'undefined') {
                        langSelect.value = StorageManager.getLang();
                    }
                }
            };
            reader.onerror = () => {
                showStatus(t('settings.importError') + t('settings.errInvalidJson'));
            };
            reader.readAsText(file);
        });
    }

    confirmNo.addEventListener('click', hideConfirm);

    confirmYes.addEventListener('click', () => {
        if (!pendingAction) return;

        if (pendingAction === 'import') {
            if (pendingImportData && typeof StorageManager !== 'undefined') {
                StorageManager.applyBackupData(pendingImportData);
                showStatus(t('settings.importSuccess'));
                if (langSelect) {
                    langSelect.value = StorageManager.getLang();
                }
            }
            hideConfirm();
            return;
        }

        switch (pendingAction) {
            case 'clear-favorites':
                localStorage.removeItem('alltools_favorites');
                showStatus(t('settings.clearedAlert'));
                break;
            case 'clear-recent':
                localStorage.removeItem('alltools_recent');
                showStatus(t('settings.clearedAlert'));
                break;
            case 'clear-quiz':
                localStorage.removeItem('alltools-tjkt-quiz-progress-v1');
                showStatus(t('settings.clearedAlert'));
                break;
            case 'clear-feedback':
                localStorage.removeItem('alltools_feedback');
                showStatus(t('settings.clearedAlert'));
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
