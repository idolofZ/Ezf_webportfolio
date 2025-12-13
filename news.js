const refreshCursorTriggers = () => {
    if (typeof cursor === 'undefined') return;
    const triggers = document.querySelectorAll('.hover-trigger');
    // It's good practice to have named functions for listeners to remove them properly
    const onEnter = () => cursor.classList.add('active');
    const onLeave = () => cursor.classList.remove('active');

    triggers.forEach(trigger => {
        // A simple way to avoid duplicate listeners is to just re-add them,
        // but for robustness, you'd ideally remove the old ones first if they could be duplicated.
        trigger.addEventListener('mouseenter', onEnter);
        trigger.addEventListener('mouseleave', onLeave);
    });
};

const newsItems = [
    { 
        date: '2025.01.XX', 
        category: 'RELEASE', 
        title_en: 'DROPPED MIXTAPE "REIGEN -2026"',
        title_ja: 'MIXTAPE "REIGEN -2026" をドロップ'
    },
    { 
        date: '2025.12.13', 
        category: 'RELEASE', 
        title_en: 'Published "Nietzsche AI" on Note.',
        title_ja: 'note「ニーチェAI」公開',
        url: 'https://note.com/chunibyost4r/n/nb6275cba2922?sub_rt=share_pw'
    },
    { 
      date: '2025.12.13', 
      category: 'UPDATE', 
      title_en: 'Finally launched my portfolio site',
      title_ja: 'ポートフォリオサイトを公開'  
    },
    // { 
    //     date: '2025.02.28', 
    //     category: 'SYSTEM', 
    //     title_en: 'WEBSITE RENEWAL COMPLETE. WELCOME TO THE CHAOS.',
    //     title_ja: 'ウェブサイトリニューアル完了。カオスへようこそ。'
    // },
];


// Render News
const renderNews = () => {
    const container = document.getElementById('news-container');
    if(!container) return;
    container.innerHTML = ''; 

    newsItems.forEach((item, index) => {
        const title = currentLang === 'en' ? item.title_en : item.title_ja;
        
        // CRITICAL TAG LOGIC
        let criticalTag = '';
        if(item.critical) {
            criticalTag = `<span class="alert-tag text-neon-pink font-black mr-2">[ CRITICAL ]</span>`;
        }

        // LINK LOGIC (NEW!) 🔗
        // If item.url exists, use 'a' tag. If not, use 'div'.
        const tagType = item.url ? 'a' : 'div';
        const hrefAttr = item.url ? `href="${item.url}" target="_blank" rel="noopener noreferrer"` : '';
        
        // Added 'block' to class to ensure the link covers the whole area
        const itemHTML = `
        <${tagType} ${hrefAttr} class="block group relative border-b border-gray-800 py-6 md:py-8 transition-colors duration-300 hover:bg-white/10 hover:text-white cursor-none hover-trigger gs-reveal">
            <div class="flex flex-col md:flex-row md:items-center gap-4 md:gap-12 relative z-10">
                <div class="font-mono text-[#00FFFF] text-sm md:text-base group-hover:text-[#FF00FF] transition-colors w-32 shrink-0">
                    ${item.date}
                </div>
                <div class="w-fit px-3 py-1 border border-[#FF00FF] text-[#FF00FF] text-xs font-bold tracking-widest group-hover:border-[#00FFFF] group-hover:text-[#00FFFF] transition-colors shrink-0 font-display">
                    ${item.category}
                </div>
                <div class="text-lg md:text-xl font-bold font-sans tracking-tight grow group-hover:translate-x-2 transition-transform duration-300">
                    ${criticalTag}${title}
                </div>
                <div class="hidden md:block opacity-0 group-hover:opacity-100 -translate-x-4 group-hover:translate-x-0 transition-all duration-300 text-[#00FFFF]">
                    →
                </div>
            </div>
            <div class="absolute inset-0 bg-white opacity-0 group-hover:opacity-5 mix-blend-overlay pointer-events-none transition-opacity duration-100"></div>
        </${tagType}>
        `;
        container.innerHTML += itemHTML;
    });
    refreshCursorTriggers();
};

// --- RENDER NEWS ---
// const renderNews = (lang) => {
//     const container = document.getElementById('news-container');
//     if(!container) return;
//     container.innerHTML = ''; // Clear existing

//     newsItems.forEach((item, index) => {
//         const title = lang === 'ja' ? item.title_ja : item.title_en;
        
//         const itemHTML = `
//         <div class="group relative border-b border-gray-800 py-6 md:py-8 transition-colors duration-300 hover:bg-white/10 hover:text-white cursor-none hover-trigger gs-reveal">
//             <div class="flex flex-col md:flex-row md:items-center gap-4 md:gap-12 relative z-10">
//                 <!-- Date -->
//                 <div class="font-mono text-[#00FFFF] text-sm md:text-base group-hover:text-[#FF00FF] transition-colors w-32 shrink-0">
//                     ${item.date}
//                 </div>

//                 <!-- Category Badge -->
//                 <div class="w-fit px-3 py-1 border border-[#FF00FF] text-[#FF00FF] text-xs font-bold tracking-widest group-hover:border-[#00FFFF] group-hover:text-[#00FFFF] transition-colors shrink-0 font-display">
//                     ${item.category}
//                 </div>

//                 <!-- Title -->
//                 <div class="text-lg md:text-xl font-bold font-sans tracking-tight grow group-hover:translate-x-2 transition-transform duration-300">
//                     ${title}
//                 </div>

//                 <!-- Arrow Icon -->
//                 <div class="hidden md:block opacity-0 group-hover:opacity-100 -translate-x-4 group-hover:translate-x-0 transition-all duration-300 text-[#00FFFF]">
//                     →
//                 </div>
//             </div>
            
//             <div class="absolute inset-0 bg-white opacity-0 group-hover:opacity-5 mix-blend-overlay pointer-events-none transition-opacity duration-100"></div>
//         </div>
//         `;
//         container.innerHTML += itemHTML;
//     });
    
//     // Re-initialize GSAP animations for the newly added elements
//     if (typeof gsap !== 'undefined') {
//         const revealElements = container.querySelectorAll('.gs-reveal');
//         revealElements.forEach(el => {
//             gsap.fromTo(el, 
//                 { y: 50, opacity: 0 },
//                 {
//                     y: 0,
//                     opacity: 1,
//                     duration: 1,
//                     ease: 'power3.out',
//                     scrollTrigger: {
//                         trigger: el,
//                         start: 'top 85%',
//                     }
//                 }
//             );
//         });
//     }

//     // Refresh cursor after dynamic content injection
//     // Note: This relies on a global 'cursor' variable and might need to be more robust.
//     // For now, we assume 'cursor' is defined in the main HTML file before this script.
//     if (typeof refreshCursorTriggers === 'function') {
//         refreshCursorTriggers();
//     }
// };

