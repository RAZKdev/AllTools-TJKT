// LocalStorage Management untuk Favorites, Recent Tools, dan Settings
const StorageManager = {
    // FAVORITES
    getFavorites() {
        try {
            return JSON.parse(localStorage.getItem('alltools_favorites')) || [];
        } catch {
            return [];
        }
    },
    toggleFavorite(toolId) {
        let favorites = this.getFavorites();
        if (favorites.includes(toolId)) {
            favorites = favorites.filter(id => id !== toolId);
        } else {
            favorites.push(toolId);
        }
        localStorage.setItem('alltools_favorites', JSON.stringify(favorites));
        return favorites;
    },
    isFavorite(toolId) {
        return this.getFavorites().includes(toolId);
    },

    // RECENT TOOLS
    getRecent() {
        try {
            return JSON.parse(localStorage.getItem('alltools_recent')) || [];
        } catch {
            return [];
        }
    },
    addRecent(toolId) {
        let recent = this.getRecent();
        // Hapus jika sudah ada agar posisinya berpindah ke urutan paling atas
        recent = recent.filter(id => id !== toolId);
        recent.unshift(toolId);
        // Batasi maksimal 5 item terakhir
        if (recent.length > 5) recent.pop();
        localStorage.setItem('alltools_recent', JSON.stringify(recent));
    },

    // SETTINGS / RESET
    clearAll() {
        localStorage.removeItem('alltools_favorites');
        localStorage.removeItem('alltools_recent');
        localStorage.removeItem('theme');
    }
};

