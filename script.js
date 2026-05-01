document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.card');
    const ctaBtn = document.querySelector('.cta-btn');

    // 1. Reveal Elements on Scroll
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

    // Initial styles for the reveal effect
    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'all 0.6s ease-out';
    });

    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll(); // Run once on load

    // 2. Interactive CTA Button Effect
    ctaBtn.addEventListener('mouseover', () => {
        ctaBtn.style.letterSpacing = '3px';
    });

    ctaBtn.addEventListener('mouseout', () => {
        ctaBtn.style.letterSpacing = 'normal';
    });

    // 3. Simple Smooth Scroll for Nav Links
    document.querySelectorAll('.nav-links a').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
});
