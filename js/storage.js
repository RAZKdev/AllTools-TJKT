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
