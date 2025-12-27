const scriptMap = [
    { name: 'navbar-functions', pathRoot: 'components/navbar/' },
    { name: 'navbar', pathRoot: 'components/navbar/' },
    { name: 'footer', pathRoot: 'components/footer/' }
];

const styles = [
    { href: 'style.css', rel: 'stylesheet' },
    { href: 'plugins/fontawesome-free-7.1.0-web/css/all.min.css', rel: 'stylesheet' },
    { href: 'https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&family=Montserrat:wght@400;600;700&display=swap', rel: 'stylesheet' }
];

const sharedScripts = [
    // 'shared/config.js',
    'shared/data.js',
    'shared/utils.js',
    'shared/auth.js',
    'shared/router.js',
    // 'shared/emailjs.js',
    // 'shared/googledrive.js',
    // 'shared/socialauth.js',
    // 'shared/logger.js'
];

// Calculate prefix based on page depth
function getPrefix() {
    const path = window.location.pathname;
    const depth = path.split('/').filter(Boolean).length; // ignore empty
    return depth > 1 ? '../'.repeat(depth - 1) : '';
}

// Inject scripts dynamically
function injectScripts() {
    const prefix = getPrefix();

    scriptMap.forEach(script => {
        const s = document.createElement('script');
        s.src = prefix + script.pathRoot + script.name + '.js';
        s.type = 'module';
        s.defer = true;
        document.body.appendChild(s);
    });
}

// Inject shared scripts and styles
function injectShared() {
    const prefix = getPrefix();

    styles.forEach(s => {
        if (!document.querySelector(`link[href="${s.href}"]`)) {
            const link = document.createElement('link');
            link.rel = s.rel;
            link.href = prefix + s.href;
            document.head.appendChild(link);
        }
    });

    sharedScripts.forEach(src => {
        const fullSrc = prefix + src;
        if (!document.querySelector(`script[src="${fullSrc}"]`)) {
            const s = document.createElement('script');
            s.src = fullSrc;
            s.type = 'module';
            s.defer = true;
            document.head.appendChild(s);
        }
    });
}

// Execute
injectShared();
injectScripts();
