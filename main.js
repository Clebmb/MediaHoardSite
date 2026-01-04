document.addEventListener('DOMContentLoaded', () => {
    const navItems = document.querySelectorAll('.nav-item');
    const pages = document.querySelectorAll('.page');
    const sidebar = document.querySelector('aside');

    // Simple navigation logic
    function navigateTo(pageId) {
        // Update URL hash without jumping
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

        // Reset scroll position
        const main = document.querySelector('main');
        if (main) main.scrollTo({ top: 0, behavior: 'smooth' });
    }

    // Attach click listeners to nav items
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            const pageId = item.dataset.page;
            navigateTo(pageId);
        });
    });

    // Expose navigateTo to window for inline calls
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

    // Hover effect for feature cards (subtle scale shift for children)
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

    // Password Modal Logic for Alpha Download
    const alphaBtn = document.getElementById('download-alpha-btn');
    const modal = document.getElementById('password-modal');
    const cancelBtn = document.getElementById('cancel-password');
    const submitBtn = document.getElementById('submit-password');
    const passwordInput = document.getElementById('password-input');
    const passwordError = document.getElementById('password-error');

    // Obfuscated key check to prevent source searching
    const _0x1a2b = ["TUhBLTAxMjAyNi1USFg="];
    const DOWNLOAD_URL = "https://github.com/Clebmb/MediaHoard_Alpha";

    if (alphaBtn) {
        alphaBtn.addEventListener('click', () => {
            modal.classList.add('active');
            passwordInput.value = '';
            passwordError.style.display = 'none';
            setTimeout(() => passwordInput.focus(), 100);
        });
    }

    if (cancelBtn) {
        cancelBtn.addEventListener('click', () => {
            modal.classList.remove('active');
        });
    }

    const verifyAccess = () => {
        try {
            if (btoa(passwordInput.value) === _0x1a2b[0]) {
                window.open(DOWNLOAD_URL, '_blank');
                modal.classList.remove('active');
            } else {
                passwordError.style.display = 'block';
                passwordInput.value = '';
                passwordInput.focus();

                // Shake effect on error
                const content = modal.querySelector('.modal-content');
                if (content) {
                    content.style.animation = 'none';
                    content.offsetHeight; // trigger reflow
                    content.style.animation = 'shake 0.4s cubic-bezier(.36,.07,.19,.97) both';
                }
            }
        } catch (e) {
            passwordError.style.display = 'block';
        }
    };

    if (submitBtn) {
        submitBtn.addEventListener('click', verifyAccess);
    }

    if (passwordInput) {
        passwordInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') verifyAccess();
        });
    }
});
