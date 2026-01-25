// Declaration of document.ready() function
(function () {
    var ie = !!(window.attachEvent && !window.opera);
    var wk = /webkit\/(\d+)/i.test(navigator.userAgent) && (RegExp.$1 < 525);
    var fn = [];
    var run = function () {
        for (var i = 0; i < fn.length; i++) {
            fn[i]();
        }
    };
    var d = document;
    d.ready = function (f) {
        if (!ie && !wk && d.addEventListener) {
            return d.addEventListener('DOMContentLoaded', f, false);
        }
        if (fn.push(f) > 1) {
            return;
        }
        if (ie) {
            (function () {
                try {
                    d.documentElement.doScroll('left');
                    run();
                } catch (err) {
                    setTimeout(arguments.callee, 0);
                }
            })();
        } else if (wk) {
            var t = setInterval(function () {
                if (/^(loaded|complete)$/.test(d.readyState)) {
                    clearInterval(t);
                    run();
                }
            }, 0);
        }
    };
})();

document.ready(() => {
    var _Blog = window._Blog || {};
    const currentTheme = window.localStorage && window.localStorage.getItem('theme');
    const isDark = currentTheme === 'dark';
    const pagebody = document.getElementsByTagName('body')[0];
    const switchDefault = document.getElementById("switch_default");
    const mobileToggleTheme = document.getElementById("mobile-toggle-theme");
    const toggleBtn = document.getElementsByClassName('toggleBtn')[0];

    // Initialize theme state
    if (switchDefault) {
        switchDefault.checked = isDark;
    }
    if (mobileToggleTheme) {
        mobileToggleTheme.innerText = isDark ? "· Dark" : "· Light";
    }

    // Toggle theme function
    function updateTheme(isDarkMode) {
        if (isDarkMode) {
            pagebody.classList.add('dark-theme');
        } else {
            pagebody.classList.remove('dark-theme');
        }
        if (mobileToggleTheme) {
            mobileToggleTheme.innerText = isDarkMode ? "· Dark" : "· Light";
        }
        if (window.localStorage) {
            window.localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
        }
    }

    _Blog.toggleTheme = function () {
        // Desktop toggle button
        if (toggleBtn) {
            toggleBtn.addEventListener('click', () => {
                const isCurrentlyDark = pagebody.classList.contains('dark-theme');
                updateTheme(!isCurrentlyDark);
            });
        }

        // Mobile toggle button
        if (mobileToggleTheme) {
            mobileToggleTheme.addEventListener('click', () => {
                const isCurrentlyDark = pagebody.classList.contains('dark-theme');
                updateTheme(!isCurrentlyDark);
            });
        }
    };

    _Blog.toggleTheme();
});