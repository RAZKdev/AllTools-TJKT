/**
 * AllTools TJKT — Vanilla I18n Engine
 * Lightweight, zero-dependency localization manager.
 * Supports Indonesian ('id') and English ('en') with nested dictionary resolution,
 * fallback protection, parameter interpolation, and DOM auto-binding.
 */

(function (global) {
    'use strict';

    const I18n = {
        currentLang: 'id',
        defaultLang: 'id',
        supportedLangs: ['id', 'en'],
        dictionary: {},
        storageKey: 'alltools_lang',

        /**
         * Inisialisasi engine dengan kamus terjemahan
         * @param {Object} dictionary - Objek kamus ('id' dan 'en')
         * @param {Object} options - Pengaturan tambahan
         */
        init(dictionary, options = {}) {
            this.dictionary = dictionary || {};
            if (options.defaultLang && this.supportedLangs.includes(options.defaultLang)) {
                this.defaultLang = options.defaultLang;
            }
            if (options.storageKey) {
                this.storageKey = options.storageKey;
            }

            // Ambil preferensi tersimpan atau gunakan defaultLang ('id')
            let initialLang = this.defaultLang;
            try {
                if (typeof localStorage !== 'undefined') {
                    const saved = localStorage.getItem(this.storageKey);
                    if (saved && this.supportedLangs.includes(saved)) {
                        initialLang = saved;
                    }
                }
            } catch (e) {
                console.warn('[I18n] Storage access warning:', e);
            }

            this.setLanguage(initialLang);
        },

        /**
         * Mengubah bahasa aktif dan menerjemahkan ulang elemen DOM
         * @param {string} lang - 'id' atau 'en'
         */
        setLanguage(lang) {
            if (!this.supportedLangs.includes(lang)) return;
            this.currentLang = lang;

            try {
                if (typeof localStorage !== 'undefined') {
                    localStorage.setItem(this.storageKey, lang);
                }
            } catch (e) {
                console.warn('[I18n] Failed to persist language:', e);
            }

            if (typeof document !== 'undefined') {
                if (document.documentElement) {
                    document.documentElement.lang = lang;
                    document.documentElement.setAttribute('data-lang', lang);
                }
                this.translateDOM(document);
            }

            // Trigger custom event untuk modul yang perlu refresh dinamis
            if (typeof window !== 'undefined' && typeof window.dispatchEvent === 'function') {
                window.dispatchEvent(new CustomEvent('languagechange', {
                    detail: { lang, i18n: this }
                }));
            }
        },

        /**
         * Berganti antara 'id' dan 'en'
         * @returns {string} Bahasa baru yang aktif
         */
        toggle() {
            const next = this.currentLang === 'id' ? 'en' : 'id';
            this.setLanguage(next);
            return next;
        },

        /**
         * Mengambil teks terjemahan berdasarkan path dot (contoh: 'common.calculate')
         * @param {string} path - Path kunci terjemahan
         * @param {Object} params - Parameter interpolasi {nama: nilai}
         * @returns {string} String terjemahan atau fallback
         */
        t(path, params = {}) {
            if (!path || typeof path !== 'string') return '';

            let val = this._resolve(this.dictionary[this.currentLang], path);
            if (val === undefined && this.currentLang !== this.defaultLang) {
                val = this._resolve(this.dictionary[this.defaultLang], path);
            }
            if (val === undefined) {
                return path; // Fallback ke path jika kunci tidak ditemukan
            }

            if (typeof val === 'string' && Object.keys(params).length > 0) {
                return val.replace(/\{(\w+)\}/g, (match, key) => {
                    return params[key] !== undefined ? params[key] : match;
                });
            }
            return val;
        },

        _resolve(obj, path) {
            if (!obj || !path) return undefined;
            return path.split('.').reduce((acc, part) => {
                return acc && acc[part] !== undefined ? acc[part] : undefined;
            }, obj);
        },

        /**
         * Menerjemahkan elemen di dalam container target berdasarkan atribut data-i18n
         * @param {HTMLElement|Document} root - Elemen root untuk query
         */
        translateDOM(root = (typeof document !== 'undefined' ? document : null)) {
            if (!root || !root.querySelectorAll) return;

            // 1. Text content
            root.querySelectorAll('[data-i18n]').forEach(el => {
                const key = el.getAttribute('data-i18n');
                if (key) {
                    const val = this.t(key);
                    if (val !== key) el.textContent = val;
                }
            });

            // 2. Placeholder
            root.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
                const key = el.getAttribute('data-i18n-placeholder');
                if (key) el.setAttribute('placeholder', this.t(key));
            });

            // 3. ARIA Label
            root.querySelectorAll('[data-i18n-aria]').forEach(el => {
                const key = el.getAttribute('data-i18n-aria');
                if (key) el.setAttribute('aria-label', this.t(key));
            });

            // 4. Tooltip / Title
            root.querySelectorAll('[data-i18n-title]').forEach(el => {
                const key = el.getAttribute('data-i18n-title');
                if (key) el.setAttribute('title', this.t(key));
            });

            // 5. Image Alt
            root.querySelectorAll('[data-i18n-alt]').forEach(el => {
                const key = el.getAttribute('data-i18n-alt');
                if (key) el.setAttribute('alt', this.t(key));
            });
        }
    };

    // Ekspor CommonJS untuk pengujian unit Node.js atau browser global
    if (typeof module !== 'undefined' && module.exports) {
        module.exports = { I18n };
    } else {
        global.I18n = I18n;
    }
})(typeof window !== 'undefined' ? window : (typeof globalThis !== 'undefined' ? globalThis : this));
