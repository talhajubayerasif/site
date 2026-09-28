// Smooth scroll for in-page links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (!href || href === '#') return;

        const target = document.querySelector(href);
        if (!target) return;

        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
    });
});

// Scroll-spy: highlight the current section in the side nav / mobile nav
const navLinks = document.querySelectorAll('.side-nav a, .mobile-nav a');
const sections = Array.from(navLinks)
    .map(link => document.querySelector(link.getAttribute('href')))
    .filter(Boolean);

if ('IntersectionObserver' in window && sections.length) {
    const setActive = (id) => {
        navLinks.forEach(link => {
            link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
        });
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                setActive(entry.target.id);
            }
        });
    }, { rootMargin: '-45% 0px -45% 0px', threshold: 0 });

    sections.forEach(section => observer.observe(section));
}

// Back to Top Button
const backToTopButton = document.getElementById("backToTop");

window.addEventListener("scroll", () => {
    if (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300) {
        backToTopButton.classList.add("active");
    } else {
        backToTopButton.classList.remove("active");
    }
});

backToTopButton.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Reusable lightbox: wires up a grid of thumbnails to an overlay with
// prev/next/close controls and keyboard navigation. Used for both the
// Photography gallery and the Travel gallery below.
function initLightbox({ itemSelector, overlayId, imgId, closeId, prevId, nextId, captionId }) {
    const items = document.querySelectorAll(itemSelector);
    const overlay = document.getElementById(overlayId);
    if (!items.length || !overlay) return;

    const img = document.getElementById(imgId);
    const closeBtn = document.getElementById(closeId);
    const prevBtn = document.getElementById(prevId);
    const nextBtn = document.getElementById(nextId);
    const captionEl = captionId ? document.getElementById(captionId) : null;
    // Thumbnails are <img> (use src); other triggers, like certificate badges, carry data-src.
    const sources = Array.from(items).map(el => el.dataset.src || el.src);

    // Caption data can live on the image itself (data-loc/data-desc, used by
    // Travel) or on a wrapping element (data-caption, used by Photography).
    function readMeta(el) {
        if (el.dataset.loc || el.dataset.desc) return el.dataset;
        const holder = el.closest('[data-loc],[data-desc],[data-caption]');
        return holder ? holder.dataset : {};
    }
    const captions = Array.from(items).map(el => {
        const d = readMeta(el);
        return { loc: d.loc || '', desc: d.desc || d.caption || '' };
    });

    let currentIndex = 0;

    function render() {
        img.src = sources[currentIndex];
        img.alt = captions[currentIndex].loc || '';
        if (captionEl) {
            const { loc, desc } = captions[currentIndex];
            captionEl.innerHTML = (loc ? `<span class="cap-loc">${loc}</span>` : '')
                + (desc ? `<span class="cap-desc">${desc}</span>` : '');
        }
    }

    function open(index) {
        currentIndex = index;
        render();
        overlay.classList.add('active');
    }

    function close() {
        overlay.classList.remove('active');
    }

    function show(offset) {
        currentIndex = (currentIndex + offset + sources.length) % sources.length;
        render();
    }

    items.forEach((el, index) => {
        el.addEventListener('click', () => open(index));
    });

    closeBtn.addEventListener('click', close);
    prevBtn.addEventListener('click', () => show(-1));
    nextBtn.addEventListener('click', () => show(1));

    overlay.addEventListener('click', (e) => {
        if (e.target === overlay) close();
    });

    document.addEventListener('keydown', (e) => {
        if (!overlay.classList.contains('active')) return;
        if (e.key === 'Escape') close();
        if (e.key === 'ArrowLeft') show(-1);
        if (e.key === 'ArrowRight') show(1);
    });
}

// Photography gallery
initLightbox({
    itemSelector: '.gallery-item img',
    overlayId: 'lightbox',
    imgId: 'lightboxImg',
    closeId: 'lightboxClose',
    prevId: 'lightboxPrev',
    nextId: 'lightboxNext',
    captionId: 'lightboxCaption',
});

// On touch devices there's no hover, so the first tap reveals the on-photo
// caption instead of opening the lightbox; a second tap opens it.
if (window.matchMedia('(hover: none)').matches) {
    document.querySelectorAll('.gallery-item').forEach(item => {
        item.addEventListener('click', (e) => {
            if (!item.classList.contains('show-caption')) {
                e.preventDefault();
                e.stopImmediatePropagation();
                document.querySelectorAll('.gallery-item.show-caption')
                    .forEach(other => { if (other !== item) other.classList.remove('show-caption'); });
                item.classList.add('show-caption');
            }
        }, true);
    });
}

// Row-style slideshow controls: prev/next buttons scroll the strip by one item
function initCarousel(trackSelector, prevId, nextId) {
    const track = document.querySelector(trackSelector);
    const prevBtn = document.getElementById(prevId);
    const nextBtn = document.getElementById(nextId);
    if (!track || !prevBtn || !nextBtn) return;

    function step() {
        const item = track.firstElementChild;
        if (!item) return track.clientWidth;
        const style = window.getComputedStyle(track);
        const gap = parseFloat(style.columnGap || style.gap) || 0;
        return item.getBoundingClientRect().width + gap;
    }

    prevBtn.addEventListener('click', () => track.scrollBy({ left: -step(), behavior: 'smooth' }));
    nextBtn.addEventListener('click', () => track.scrollBy({ left: step(), behavior: 'smooth' }));
}

initCarousel('.gallery-grid', 'galleryPrev', 'galleryNext');
initCarousel('.travel-grid', 'travelPrev', 'travelNext');

// Travel gallery
initLightbox({
    itemSelector: '.travel-item img',
    overlayId: 'lightboxTravel',
    imgId: 'lightboxImgTravel',
    closeId: 'lightboxCloseTravel',
    prevId: 'lightboxPrevTravel',
    nextId: 'lightboxNextTravel',
    captionId: 'lightboxCaptionTravel',
});

// Certifications: clicking a badge opens the certificate image
initLightbox({
    itemSelector: '.cert-badge',
    overlayId: 'lightboxCert',
    imgId: 'lightboxImgCert',
    closeId: 'lightboxCloseCert',
    prevId: 'lightboxPrevCert',
    nextId: 'lightboxNextCert',
    captionId: 'lightboxCaptionCert',
});