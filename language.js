// --- TRANSLATION DATA ---
const translations = {
    en: {
        "latest": "I have published my Graduation Project Process Document. Please take a look. I welcome any comments or feedback.",
        "hero.subwarning": "This is the \"Itasa\" (cringe) you were looking for.",
        "hero.scroll": "SCROLL DOWN",
        "news.archive": "VIEW ARCHIVE [+ চোখ]",
        "concepts.1": "Chunibyo",
        "concepts.1.desc": "Generally used as a derogatory term to describe someone with delusions of grandeur or excessive confidence, I reinterpret this word through the context of Japanese culture, modern society, and Generation Z, presenting it as a new guiding principle for living in this era. This is rooted in a strong obsession with my own 'way of living' and the 'value, meaning, and significance of life,' derived from my personal life experiences.",
        "concepts.2": "Itai",
        "concepts.2.desc": "People who believe in themselves excessively are viewed with a gaze of 'Itasa' (cringe) by others, becoming targets of ridicule and sneers. I aim to actively accept this 'Itasa,' maintain that stance, and encourage it. For me, this 'Itasa' is also a survival strategy. I am hated by the world. That is precisely why, by continuing to believe in myself—even excessively—I harbor the desire to become an existence that is necessary to the world. I find the current state of society, where cynical people who take pleasure in mocking others hold sway, to be truly painful. In such a world, I want to take the lead in confronting the fear of being thought of as 'Itai' by others, and present the act of believing in oneself—that very 'Itasa'—as a new proposal.",
        "life.more": "OBSERVE PROPHECY [+]",
        "mp.2025": "The beginning of the end. I won't stop anymore. I have a reason to do my best.",
        "mp.2026": "Carve my name into the world. Art, music, entertainment—I will become an undeniable presence in every scene.",
        "mp.2030": "Earth is too small. Installing art on the moon. Elon Musk will be my assistant."
    },
    ja: {
        "latest": "卒業制作プロセスドキュメントを公開。ご一読下さい。コメントもお待ちしております。",
        "hero.subwarning": "あなたが探していた「イタさ」はここにある。",
        "hero.scroll": "スクロール",
        "news.archive": "アーカイブを見る [+ চোখ]",
        "concepts.1": "中二病",
        "concepts.1.desc": "一般的には揶揄として使われ、誇大な妄想や過度な自信を持った人を指すこの言葉を、日本の文化や現代社会、Z世代の文脈を通して再解釈し、この時代に新たな生き方の指針として提示する。これには自分の人生経験を通した自分の「生き方」や「生きる価値・意味・意義」への強い執着が元にある。",
        "concepts.2": "イタい",
        "concepts.2.desc": "自分を過剰に信じる人は他者から「イタい」という視線で見られ、嘲笑や冷笑の対象になる。私はこのイタさを積極的に受け入れ、その姿勢を貫き奨励していく事を目指す。他者から「イタい」と思われる恐怖に立ち向かい、自分を信じること、そんなイタさを提示したい。",
        "life.more": "予言を観測する [+]",
        "mp.2025": "始まりの終わり。もう立ち止まらない。頑張る理由がある。",
        "mp.2026": "世界にオレの名を刻む。アートも音楽も芸能も、全てのシーンで無視できない存在になる。",
        "mp.2030": "地球は狭すぎる。月面に作品を設置。"       
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