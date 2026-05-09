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

// --- Theme Toggle Logic ---
const lightDumbbell = "https://res.cloudinary.com/dza5rdls6/image/upload/v1778261770/light_icon_pmojd5.png"; 
const darkDumbbell = "https://res.cloudinary.com/dza5rdls6/image/upload/v1778261749/dark_icon_dbyfjt.png";  

const themeBtn = document.querySelector('.theme-toggle');
const themeImg = document.querySelector('.theme-toggle img');
const body = document.body;

if (themeBtn && themeImg) {
    const updateIcon = () => {
        // If light-mode is active, show the DARK icon (to switch back)
        // Otherwise, show the LIGHT icon
        themeImg.src = body.classList.contains('light-mode') ? darkDumbbell : lightDumbbell;
    };

    // 1. Check for saved preference on load
    if (localStorage.getItem('theme') === 'light') {
    body.classList.add('light-mode');
}

// ALWAYS initialize the icon
updateIcon();

    // 2. Click Event
    themeBtn.addEventListener('click', () => {
        body.classList.toggle('light-mode');
        
        // Save the current state
        const isLight = body.classList.contains('light-mode');
        localStorage.setItem('theme', isLight ? 'light' : 'dark');
        
        // Swap the image
        updateIcon();

        // Optional: Refresh the nav slider position if colors changed
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
        e.preventDefault(); // Add this to keep the scroll smooth!
        document.body.classList.remove('programs-mode');
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}
});
