// --- TRANSLATION DATA ---
const translations = {
    en: {
        "hero.warning": "Entering a high-voltage zone of ego and art.",
        "hero.subwarning": "This is the \"Itasa\" (cringe) you were looking for.",
        "hero.scroll": "SCROLL DOWN",
        "news.archive": "VIEW ARCHIVE [+]",
        "concepts.1.desc": "We embrace the cringe. If they laugh, we are winning.",
        "concepts.more": "Read more... [→]",
        "life.more": "OBSERVE PROPHECY [+]"
    },
    ja: {
        "hero.warning": "エゴとアートの高電圧地帯へようこそ。",
        "hero.subwarning": "あなたが探していた「イタさ」はここにある。",
        "hero.scroll": "スクロール",
        "news.archive": "アーカイブを見る [+]",
        "concepts.1.desc": "「イタい」と言われることを恐れるな。それは他人の理解を超えた証拠だ。笑われるなら、俺たちの勝ちだ。",
        "concepts.more": "続きを読む... [→]",
        "life.more": "予言を観測する [+]"
    }
};

let currentLang = 'en'; // Default language

// --- TRANSLATION LOGIC ---
const updateLanguage = (lang) => {
    currentLang = lang;
    document.documentElement.lang = lang;
    
    // 1. Update simple text elements
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        // If a translation exists for this key, replace the text
        if(translations[lang][key]) {
            el.innerHTML = translations[lang][key];
        }
    });

    // 2. Re-render News (because News is dynamic!)
    if (typeof renderNews === 'function') {
        renderNews(lang);
    }
};

// Toggle Button Event Listener
const langBtn = document.getElementById('lang-toggle');
if(langBtn){
    langBtn.addEventListener('click', () => {
        // If current is EN, switch to JA. Otherwise, switch to EN.
        const newLang = currentLang === 'en' ? 'ja' : 'en';
        updateLanguage(newLang);
    });
}

// Initial Call based on HTML lang attribute
const initialLang = document.documentElement.lang || 'en';
updateLanguage(initialLang);