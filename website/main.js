document.addEventListener('DOMContentLoaded', () => {
    const navItems = document.querySelectorAll('.nav-item');
    const pages = document.querySelectorAll('.page');
    const sidebar = document.querySelector('aside');
    const menuToggle = document.getElementById('menu-toggle');
    const closeMenu = document.getElementById('close-menu');

    // Navigation logic
    function navigateTo(pageId) {
        // Update URL hash
        history.pushState(null, null, `#${pageId}`);

        // Update Nav UI
        navItems.forEach(item => {
            if (item.dataset.page === pageId) {
                item.classList.add('active');
            } else {
                item.classList.remove('active');
            }
        });

        // Update Pages
        pages.forEach(page => {
            if (page.id === pageId) {
                page.classList.add('active');
            } else {
                page.classList.remove('active');
            }
        });

        // Reset scroll position in main content
        const main = document.querySelector('main');
        if (main) main.scrollTo({ top: 0, behavior: 'smooth' });

        // Close sidebar on mobile after navigation
        if (window.innerWidth <= 1024) {
            sidebar.classList.remove('active');
        }
    }

    // Attach click listeners to nav items
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            const pageId = item.dataset.page;
            navigateTo(pageId);
        });
    });

    // Mobile Menu Toggle logic
    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            sidebar.classList.add('active');
        });
    }

    if (closeMenu) {
        closeMenu.addEventListener('click', () => {
            sidebar.classList.remove('active');
        });
    }

    // Close sidebar when clicking outside
    document.addEventListener('click', (e) => {
        if (window.innerWidth <= 1024 &&
            sidebar.classList.contains('active') &&
            !sidebar.contains(e.target) &&
            !menuToggle.contains(e.target)) {
            sidebar.classList.remove('active');
        }
    });

    // Expose navigateTo to window
    window.navTo = navigateTo;

    // Handle initial hash
    const initialHash = window.location.hash.substring(1);
    const validPages = ['home', 'features', 'downloads'];
    if (initialHash && validPages.includes(initialHash)) {
        navigateTo(initialHash);
    } else {
        navigateTo('home');
    }

    // Handle browser back/forward
    window.addEventListener('popstate', () => {
        const hash = window.location.hash.substring(1);
        if (hash && validPages.includes(hash)) {
            navigateTo(hash);
        } else {
            navigateTo('home');
        }
    });

    // Feature card hover effects
    const glassCards = document.querySelectorAll('.glass-card');
    glassCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            const icon = card.querySelector('.feature-icon');
            if (icon) {
                icon.style.transform = 'scale(1.1) rotate(5deg)';
                icon.style.transition = 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
            }
        });
        card.addEventListener('mouseleave', () => {
            const icon = card.querySelector('.feature-icon');
            if (icon) {
                icon.style.transform = 'scale(1) rotate(0deg)';
            }
        });
    });

    // Download Logic
    const alphaBtn = document.getElementById('download-alpha-btn');
    const DOWNLOAD_URL = "https://github.com/Clebmb/MediaHoard_Alpha";

    if (alphaBtn) {
        alphaBtn.addEventListener('click', () => {
            window.open(DOWNLOAD_URL, '_blank');
        });
    }
});
