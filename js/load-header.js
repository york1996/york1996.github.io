// Load header component dynamically
(function() {
    // Mobile menu toggle function
    window.mobileBtn = function() {
        var toggleMenu = document.getElementsByClassName("menu-toggle")[0];
        var mobileMenu = document.getElementById("mobile-menu");
        if (toggleMenu && mobileMenu) {
            if (toggleMenu.classList.contains("active")) {
                toggleMenu.classList.remove("active");
                mobileMenu.classList.remove("active");
            } else {
                toggleMenu.classList.add("active");
                mobileMenu.classList.add("active");
            }
        }
    };

    // Update mobile theme toggle text after header is loaded
    function updateMobileThemeToggle() {
        const currentTheme = window.localStorage && window.localStorage.getItem('theme') || '';
        const isDark = currentTheme === 'dark';
        const mobileToggleTheme = document.getElementById("mobile-toggle-theme");
        if (mobileToggleTheme) {
            mobileToggleTheme.innerText = isDark ? "· Dark" : "· Light";
        }
    }

    function loadHeader() {
        fetch('/components/header.html')
            .then(response => response.text())
            .then(html => {
                const headerContainer = document.getElementById('header-container');
                if (headerContainer) {
                    headerContainer.innerHTML = html;
                    
                    // Attach click event to menu toggle button
                    const menuToggle = headerContainer.querySelector('.menu-toggle');
                    if (menuToggle) {
                        menuToggle.addEventListener('click', window.mobileBtn);
                    }
                    
                    // Update mobile theme toggle text
                    updateMobileThemeToggle();
                }
            })
            .catch(error => {
                console.error('Error loading header:', error);
            });
    }

    // Load header when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', loadHeader);
    } else {
        loadHeader();
    }
})();
