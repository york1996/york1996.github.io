// Head configuration for all pages
(function() {
    const defaultConfig = {
        charset: 'UTF-8',
        viewport: 'width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0',
        author: '张新宇',
        subtitle: 'York1996',
        generator: 'Hexo 6.3.0',
        icon: '/favicon.ico',
        stylesheets: [
            '/css/style.css'
        ],
        scripts: [
            '/js/script.js',
            '/js/tocbot.min.js',
            '/js/load-header.js'
        ]
    };

    // Initialize head configuration
    function initHead(config) {
        config = Object.assign({}, defaultConfig, config || {});
        
        // Set charset if not already set
        if (!document.querySelector('meta[charset]')) {
            const charsetMeta = document.createElement('meta');
            charsetMeta.setAttribute('charset', config.charset);
            document.head.insertBefore(charsetMeta, document.head.firstChild);
        }

        // Set viewport if not already set
        if (!document.querySelector('meta[name="viewport"]')) {
            const viewportMeta = document.createElement('meta');
            viewportMeta.setAttribute('name', 'viewport');
            viewportMeta.setAttribute('content', config.viewport);
            document.head.appendChild(viewportMeta);
        }

        // Set other meta tags
        setMetaTag('author', config.author);
        setMetaTag('subtitle', config.subtitle);
        if (config.description) {
            setMetaTag('description', config.description);
        }
        setMetaTag('generator', config.generator);

        // Set favicon
        if (!document.querySelector('link[rel="icon"]')) {
            const favicon = document.createElement('link');
            favicon.setAttribute('rel', 'icon');
            favicon.setAttribute('href', config.icon);
            document.head.appendChild(favicon);
        }

        // Load stylesheets
        config.stylesheets.forEach(href => {
            if (!document.querySelector(`link[href="${href}"]`)) {
                const link = document.createElement('link');
                link.setAttribute('rel', 'stylesheet');
                link.setAttribute('href', href);
                document.head.appendChild(link);
            }
        });

        // Load scripts
        config.scripts.forEach(src => {
            if (!document.querySelector(`script[src="${src}"]`)) {
                const script = document.createElement('script');
                script.setAttribute('src', src);
                document.head.appendChild(script);
            }
        });
    }

    function setMetaTag(name, content) {
        let meta = document.querySelector(`meta[name="${name}"]`);
        if (!meta) {
            meta = document.createElement('meta');
            meta.setAttribute('name', name);
            document.head.appendChild(meta);
        }
        meta.setAttribute('content', content);
    }

    // Export for use in pages
    window.HeadConfig = {
        init: initHead
    };
})();
