document.addEventListener('DOMContentLoaded', () => {

    // --- 1. Reveal Cards on Scroll ---
    const cards = document.querySelectorAll('.card');
    const ctaBtn = document.querySelector('.cta-btn');

    const revealOnScroll = () => {
        const triggerBottom = window.innerHeight / 5 * 4;
        cards.forEach(card => {
            const cardTop = card.getBoundingClientRect().top;
            if (cardTop < triggerBottom) {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }
        });
    };

    // Initial state for cards
    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'all 0.6s ease-out';
    });

    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll();

    // --- 2. Button Hover Effect ---
    if (ctaBtn) {
        ctaBtn.addEventListener('mouseover', () => { ctaBtn.style.letterSpacing = '3px'; });
        ctaBtn.addEventListener('mouseout', () => { ctaBtn.style.letterSpacing = 'normal'; });
    }

    // --- 3. Smooth Navigation ---
    document.querySelectorAll('.nav-links a').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId.startsWith('#')) {
                e.preventDefault();
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    targetElement.scrollIntoView({ behavior: 'smooth' });
                }
            }
        });
    });
}); // This closing bracket matches the one we added at the top!

const themeImg = document.querySelector('.theme-toggle img');
const themeBtn = document.querySelector('.theme-toggle');
const body = document.body;

// Using the 'raw' links ensures they load correctly
const darkIcon = "https://raw.githubusercontent.com/selammengistu0005-ai/Power_fitness/main/7c7bc638-ea36-40e4-a6df-79f49afe917f.png";
const lightIcon = "https://raw.githubusercontent.com/selammengistu0005-ai/Power_fitness/main/998bff92-e1fd-4e51-9501-bb58cb15e2b9.png";

themeBtn.addEventListener('click', () => {
    // 1. Flip the background colors
    body.classList.toggle('light-mode');

    // 2. Flip the image icon
    if (body.classList.contains('light-mode')) {
        themeImg.src = lightIcon;
    } else {
        themeImg.src = darkIcon;
    }
});
