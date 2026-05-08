document.addEventListener('DOMContentLoaded', () => {
    const navLinksContainer = document.querySelector('.nav-links');
    const navItems = document.querySelectorAll('.nav-links a');
    navLinksContainer.classList.add('visible');

function moveSlider(element) {
    if (!element) return; // Safety check

    // This gets the exact size and position of the link
    const rect = element.getBoundingClientRect();
    const parentRect = navLinksContainer.getBoundingClientRect();
    
    // The "Left" position must subtract the container's left position
    const leftPosition = rect.left - parentRect.left;
    const width = rect.width;
    if (width > 0) {
        navLinksContainer.style.setProperty('--slider-left', `${leftPosition}px`);
        navLinksContainer.style.setProperty('--slider-width', `${width}px`);
    }
    
    navItems.forEach(link => link.classList.remove('active'));
    element.classList.add('active');
}

setTimeout(() => {
    if(navItems.length > 0) {
        moveSlider(navItems[0]);
    }
}, 100);

// Add the click trigger to every link
navItems.forEach(item => {
    item.addEventListener('click', function() {
        moveSlider(this);
    });
});

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
        }); // Added the missing }); here!
    });

// --- 4. Theme Toggle ---
// --- 4. Theme Toggle ---
const themeBtn = document.querySelector('.theme-toggle');
const themeImg = document.querySelector('.theme-toggle img');
const body = document.body;

// URL 1: The Gym Icon (For Dark Mode)
const darkThemeIcon = "https://res.cloudinary.com/dza5rdls6/image/upload/f_auto,q_auto/v1778065691/7c7bc638-ea36-40e4-a6df-79f49afe917f_1_vhc8gz.png";

// URL 2: The Moon/Toggle Icon (For Light Mode)
const lightThemeIcon = "https://res.cloudinary.com/dza5rdls6/image/upload/f_auto,q_auto/v1778066476/998bff92-e1fd-4e51-9501-bb58cb15e2b9_1_fujrnz.png";

if (themeBtn && themeImg) {
    // Logic: If body HAS 'light-mode', show Moon. Otherwise, show Gym icon.
    const updateIcon = () => {
        if (body.classList.contains('light-mode')) {
            themeImg.src = lightThemeIcon;
        } else {
            themeImg.src = darkThemeIcon;
        }
    };

    // Run once on load to set the default
    updateIcon();

    themeBtn.addEventListener('click', () => {
        body.classList.toggle('light-mode');
        updateIcon();

        // Sync your nav slider
        const activeLink = document.querySelector('.nav-links a.active');
        if (activeLink && typeof moveSlider === 'function') {
            moveSlider(activeLink);
        }
    });
}

    // --- 5. Programs View State Toggle ---
const programsLink = document.querySelector('a[href="#programs"]');
const homeLink = document.querySelector('a[href="#home"]');

if (programsLink) {
    programsLink.addEventListener('click', (e) => {
        e.preventDefault();
        document.body.classList.add('programs-mode');
        // REMOVED: document.body.classList.add('light-mode'); 
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

if (homeLink) {
    homeLink.addEventListener('click', (e) => {
        // 1. Remove the Programs view
        document.body.classList.remove('programs-mode');
        
        // 2. THE FIX: Do NOT remove light-mode here. 
        // This allows the user to stay in the theme they manually picked.

        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

}); // THIS IS THE FINAL CLOSING FOR DOMContentLoaded
