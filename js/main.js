document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    initMobileMenu();
});

function initTheme() {
    const themeBtn = document.getElementById('theme-toggle');
    // Cek LocalStorage, default ke 'light'
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);

    themeBtn.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme); // Simpan preferensi
        updateThemeIcon(newTheme);
    });
}

function updateThemeIcon(theme) {
    const themeBtn = document.getElementById('theme-toggle');
    themeBtn.textContent = theme === 'light' ? '🌙' : '☀️';
}

function initMobileMenu() {
    const menuBtn = document.getElementById('mobile-menu-btn');
    const mainNav = document.getElementById('main-nav');

    menuBtn.addEventListener('click', () => {
        mainNav.classList.toggle('active');
    });
}

