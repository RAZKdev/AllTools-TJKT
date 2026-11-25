// Batas kapasitas dan kuota penyimpanan lokal Feedback
const FEEDBACK_LIMITS = {
    MAX_ENTRIES: 50,
    MAX_MESSAGE_LENGTH: 500,
    MAX_CONTACT_LENGTH: 80
};

// LocalStorage Management untuk Favorites, Recent Tools, Feedback, dan Settings
const StorageManager = {
    FEEDBACK_LIMITS,

    // Helper defensive parsing JSON array
    safeParseArray(key, fallback = []) {
        try {
            const raw = localStorage.getItem(key);
            if (!raw || typeof raw !== 'string') return fallback;
            const parsed = JSON.parse(raw);
            return Array.isArray(parsed) ? parsed : fallback;
        } catch {
            return fallback;
        }
    },

    // FAVORITES
    getFavorites() {
        return this.safeParseArray('alltools_favorites', []);
    },
    toggleFavorite(toolId) {
        if (!toolId || typeof toolId !== 'string') return this.getFavorites();
        let favorites = this.getFavorites();
        if (favorites.includes(toolId)) {
            favorites = favorites.filter(id => id !== toolId);
        } else {
            favorites.push(toolId);
        }
        try {
            localStorage.setItem('alltools_favorites', JSON.stringify(favorites));
        } catch (e) {
            console.warn('StorageManager: Gagal menyimpan favorit ke localStorage', e);
        }
        return favorites;
    },
    isFavorite(toolId) {
        if (!toolId || typeof toolId !== 'string') return false;
        return this.getFavorites().includes(toolId);
    },

    // RECENT TOOLS
    getRecent() {
        return this.safeParseArray('alltools_recent', []);
    },
    addRecent(toolId) {
        if (!toolId || typeof toolId !== 'string') return;
        let recent = this.getRecent();
        // Hapus jika sudah ada agar posisinya berpindah ke urutan paling atas
        recent = recent.filter(id => id !== toolId);
        recent.unshift(toolId);
        // Batasi maksimal 5 item terakhir
        if (recent.length > 5) recent = recent.slice(0, 5);
        try {
            localStorage.setItem('alltools_recent', JSON.stringify(recent));
        } catch (e) {
            console.warn('StorageManager: Gagal menyimpan recent ke localStorage', e);
        }
    },

    // FEEDBACK ITEMS (Defensive & Sanitized Model)
    getFeedback() {
        const rawList = this.safeParseArray('alltools_feedback', []);
        return rawList.map(item => this.sanitizeFeedback(item)).filter(Boolean);
    },
    saveFeedback(feedbackList) {
        if (!Array.isArray(feedbackList)) {
            return { success: false, error: 'Format data tidak valid.' };
        }
        try {
            // Batasi jumlah maksimal entri feedback (FIFO - potong jika > MAX_ENTRIES)
            const limitedList = feedbackList.slice(0, FEEDBACK_LIMITS.MAX_ENTRIES);
            localStorage.setItem('alltools_feedback', JSON.stringify(limitedList));
            return { success: true, count: limitedList.length };
        } catch (e) {
            console.warn('StorageManager: Gagal menyimpan feedback ke localStorage', e);
            const isQuota = Boolean(e && (e.name === 'QuotaExceededError' || e.code === 22 || e.code === 1014));
            return {
                success: false,
                quotaExceeded: isQuota,
                error: isQuota 
                    ? 'Penyimpanan lokal browser penuh (QuotaExceededError). Ekspor atau bersihkan masukan lama.' 
                    : 'Gagal menyimpan ke penyimpanan lokal browser.'
            };
        }
    },
    sanitizeFeedback(item) {
        if (!item || typeof item !== 'object') return null;
        return {
            id: typeof item.id === 'number' ? item.id : Date.now(),
            type: ['bug', 'suggestion', 'feedback'].includes(item.type) ? item.type : 'feedback',
            icon: typeof item.icon === 'string' ? item.icon.slice(0, 4) : '💬',
            label: typeof item.label === 'string' ? item.label.slice(0, 20) : 'Feedback',
            status: item.status === 'READ' ? 'READ' : 'NEW',
            sender: typeof item.sender === 'string' ? item.sender.trim().slice(0, FEEDBACK_LIMITS.MAX_CONTACT_LENGTH) : 'Pengunjung',
            title: typeof item.title === 'string' ? item.title.trim().slice(0, FEEDBACK_LIMITS.MAX_MESSAGE_LENGTH) : '',
            page: typeof item.page === 'string' ? item.page.slice(0, 30) : 'About',
            date: typeof item.date === 'string' ? item.date.slice(0, 30) : '-'
        };
    },

    // QUIZ PROGRESS HELPER
    getQuizProgress() {
        try {
            const raw = localStorage.getItem('alltools-tjkt-quiz-progress-v1');
            return raw ? JSON.parse(raw) : null;
        } catch {
            return null;
        }
    },

    // PREFERENCE HELPERS
    getTheme() {
        try {
            return localStorage.getItem('theme') || 'light';
        } catch {
            return 'light';
        }
    },

    getLang() {
        try {
            return localStorage.getItem('alltools_lang') || 'id';
        } catch {
            return 'id';
        }
    },

    createBackupSnapshot() {
        return {
            favorites: this.getFavorites(),
            recent: this.getRecent(),
            quizProgress: this.getQuizProgress(),
            theme: this.getTheme(),
            lang: this.getLang()
        };
    },

    hasSavedData() {
        try {
            const fav = this.getFavorites();
            if (fav && fav.length > 0) return true;
            const rec = this.getRecent();
            if (rec && rec.length > 0) return true;
            const qp = this.getQuizProgress();
            if (qp && (qp.sessions > 0 || (Array.isArray(qp.history) && qp.history.length > 0))) return true;
            return false;
        } catch {
            return false;
        }
    },

    applyBackupData(data) {
        if (!data || typeof data !== 'object') {
            return { success: false, error: 'Data tidak valid' };
        }

        const backup = {
            favorites: localStorage.getItem('alltools_favorites'),
            recent: localStorage.getItem('alltools_recent'),
            quizProgress: localStorage.getItem('alltools-tjkt-quiz-progress-v1'),
            theme: localStorage.getItem('theme'),
            lang: localStorage.getItem('alltools_lang')
        };

        try {
            if (Array.isArray(data.favorites)) {
                localStorage.setItem('alltools_favorites', JSON.stringify(data.favorites));
            }
            if (Array.isArray(data.recent)) {
                localStorage.setItem('alltools_recent', JSON.stringify(data.recent.slice(0, 5)));
            }
            if (data.quizProgress !== undefined && data.quizProgress !== null) {
                localStorage.setItem('alltools-tjkt-quiz-progress-v1', JSON.stringify(data.quizProgress));
            }
            if (typeof data.theme === 'string') {
                localStorage.setItem('theme', data.theme);
                document.documentElement.setAttribute('data-theme', data.theme);
                if (typeof updateThemeIcon === 'function') {
                    updateThemeIcon(data.theme);
                }
            }
            if (typeof data.lang === 'string') {
                localStorage.setItem('alltools_lang', data.lang);
                if (typeof I18n !== 'undefined' && typeof I18n.setLanguage === 'function') {
                    I18n.setLanguage(data.lang);
                }
            }
            return { success: true };
        } catch (err) {
            // Rollback jika terjadi error saat penulisan
            for (const [k, v] of Object.entries(backup)) {
                try {
                    if (v === null) localStorage.removeItem(k);
                    else localStorage.setItem(k, v);
                } catch (_) {}
            }
            return { success: false, error: err };
        }
    },

    // SETTINGS / RESET
    clearAll() {
        try {
            localStorage.removeItem('alltools_favorites');
            localStorage.removeItem('alltools_recent');
            localStorage.removeItem('theme');
        } catch (e) {
            console.warn('StorageManager: Gagal menghapus localStorage', e);
        }
    }
};

// ==========================================
// PURE BACKUP / EXPORT / IMPORT FUNCTIONS
// ==========================================

function buildBackupPayload(snapshot, exportedAtIso = null) {
    const isoDate = exportedAtIso || new Date().toISOString();
    const snap = snapshot || {};

    return {
        app: 'alltools-tjkt',
        schemaVersion: 1,
        exportedAt: isoDate,
        data: {
            favorites: Array.isArray(snap.favorites) ? snap.favorites : [],
            recent: Array.isArray(snap.recent) ? snap.recent.slice(0, 5) : [],
            quizProgress: (snap.quizProgress && typeof snap.quizProgress === 'object' && !Array.isArray(snap.quizProgress)) ? snap.quizProgress : null,
            theme: typeof snap.theme === 'string' ? snap.theme : null,
            lang: typeof snap.lang === 'string' ? snap.lang : null
        }
    };
}

function parseBackupPayload(text) {
    if (typeof text !== 'string') {
        return { ok: false, error: 'invalid_json' };
    }

    const byteLen = typeof Buffer !== 'undefined'
        ? Buffer.byteLength(text, 'utf8')
        : (new TextEncoder().encode(text)).length;

    // 1. Lebih dari 1.048.576 byte -> error too_big
    if (byteLen > 1048576) {
        return { ok: false, error: 'too_big' };
    }

    // 2. Bukan JSON -> error invalid_json
    let parsed;
    try {
        parsed = JSON.parse(text);
    } catch {
        return { ok: false, error: 'invalid_json' };
    }

    if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) {
        return { ok: false, error: 'invalid_json' };
    }

    // 3. app bukan "alltools-tjkt" -> error wrong_app
    if (parsed.app !== 'alltools-tjkt') {
        return { ok: false, error: 'wrong_app' };
    }

    // 4. schemaVersion bukan 1 -> error unknown_version
    if (parsed.schemaVersion !== 1) {
        return { ok: false, error: 'unknown_version' };
    }

    // 5. Tipe salah di satu field -> tolak seluruh berkas, error invalid_field
    if (!parsed.data || typeof parsed.data !== 'object' || Array.isArray(parsed.data)) {
        return { ok: false, error: 'invalid_field' };
    }

    // 6. Kunci "__proto__", "constructor", atau "prototype" di mana pun -> error invalid_field
    if (/"(?:__proto__|constructor|prototype)"\s*:/i.test(text)) {
        return { ok: false, error: 'invalid_field' };
    }

    function hasDangerousKeys(obj) {
        if (!obj || typeof obj !== 'object') return false;
        for (const key of Object.getOwnPropertyNames(obj)) {
            if (key === '__proto__' || key === 'constructor' || key === 'prototype') {
                return true;
            }
            if (typeof obj[key] === 'object' && obj[key] !== null && hasDangerousKeys(obj[key])) {
                return true;
            }
        }
        return false;
    }

    if (hasDangerousKeys(parsed)) {
        return { ok: false, error: 'invalid_field' };
    }

    const d = parsed.data;

    // Validasi tipe field favorites
    if (d.favorites !== undefined && d.favorites !== null) {
        if (!Array.isArray(d.favorites) || !d.favorites.every(item => typeof item === 'string')) {
            return { ok: false, error: 'invalid_field' };
        }
    }

    // Validasi tipe field recent
    if (d.recent !== undefined && d.recent !== null) {
        if (!Array.isArray(d.recent) || !d.recent.every(item => typeof item === 'string')) {
            return { ok: false, error: 'invalid_field' };
        }
    }

    // Validasi tipe field quizProgress
    if (d.quizProgress !== undefined && d.quizProgress !== null) {
        if (typeof d.quizProgress !== 'object' || Array.isArray(d.quizProgress)) {
            return { ok: false, error: 'invalid_field' };
        }
        const qp = d.quizProgress;
        const numFields = ['sessions', 'totalQuestions', 'totalCorrect', 'totalTimeouts', 'bestPercentage', 'bestScore', 'bestTotal', 'totalDurationSeconds'];
        for (const k of numFields) {
            if (qp[k] !== undefined && typeof qp[k] !== 'number') {
                return { ok: false, error: 'invalid_field' };
            }
        }
        if (qp.categories !== undefined && (typeof qp.categories !== 'object' || Array.isArray(qp.categories) || qp.categories === null)) {
            return { ok: false, error: 'invalid_field' };
        }
        if (qp.history !== undefined && !Array.isArray(qp.history)) {
            return { ok: false, error: 'invalid_field' };
        }
    }

    // Validasi nilai field theme: hanya null, "light", atau "dark"
    if (d.theme !== undefined && d.theme !== null) {
        if (typeof d.theme !== 'string' || (d.theme !== 'light' && d.theme !== 'dark')) {
            return { ok: false, error: 'invalid_field' };
        }
    }

    // Validasi nilai field lang: hanya null, "id", atau "en"
    if (d.lang !== undefined && d.lang !== null) {
        if (typeof d.lang !== 'string' || (d.lang !== 'id' && d.lang !== 'en')) {
            return { ok: false, error: 'invalid_field' };
        }
    }

    // 7. Kunci lain yang tidak dikenal diabaikan dan tidak ditulis
    const cleanData = {
        favorites: Array.isArray(d.favorites) ? d.favorites : [],
        recent: Array.isArray(d.recent) ? d.recent.slice(0, 5) : [],
        quizProgress: (d.quizProgress && typeof d.quizProgress === 'object' && !Array.isArray(d.quizProgress)) ? d.quizProgress : null,
        theme: typeof d.theme === 'string' ? d.theme : null,
        lang: typeof d.lang === 'string' ? d.lang : null
    };

    return {
        ok: true,
        data: cleanData
    };
}

if (typeof window !== 'undefined') {
    window.StorageManager = StorageManager;
    window.buildBackupPayload = buildBackupPayload;
    window.parseBackupPayload = parseBackupPayload;
}

// Ekspor untuk pengujian unit di Node.js
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        StorageManager,
        buildBackupPayload,
        parseBackupPayload
    };
}
