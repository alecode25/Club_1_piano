// ===== INIZIALIZZAZIONE AL CARICAMENTO PAGINA =====
document.addEventListener('DOMContentLoaded', function () {
    // Riferimenti agli elementi
    const btnPrimary = document.querySelector('.btn-primary');
    const btnSecondary = document.querySelector('.btn-secondary');
    const menuLink = document.querySelector('.menu-link');
    const content = document.querySelector('.content');
    const menuSection = document.querySelector('.menu-section');

    // ===== GESTIONE BOTTONI HERO =====
    if (btnPrimary) {
        btnPrimary.addEventListener('click', function () {
            const prenotaSection = document.getElementById('prenota');
            if (prenotaSection) {
                prenotaSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    }

    if (btnSecondary) {
        btnSecondary.addEventListener('click', function () {
            const eventiSection = document.getElementById('eventi');
            if (eventiSection) {
                eventiSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    }

    // ===== SCROLL SMOOTH AL MENU =====
    if (menuLink) {
        menuLink.addEventListener('click', function (e) {
            e.preventDefault();
            const menu = document.getElementById('menu');
            if (menu) {
                menu.scrollIntoView({ behavior: 'smooth' });
            }
        });
    }

    // ===== ANIMAZIONE FADE-IN HERO =====
    if (content) {
        content.style.opacity = '0';
        content.style.transform = 'translateY(20px)';

        setTimeout(function () {
            content.style.transition = 'all 0.8s ease';
            content.style.opacity = '1';
            content.style.transform = 'translateY(0)';
        }, 100);
    }

    // ===== ANIMAZIONE MENU SECTION =====
    if (menuSection) {
        const observer = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, { threshold: 0.1 });

        menuSection.style.opacity = '0';
        menuSection.style.transform = 'translateY(30px)';
        menuSection.style.transition = 'all 0.8s ease';

        observer.observe(menuSection);
    }
});

// ===== CAROUSEL DRINKS =====
let currentSlide = 0;
const slides = document.querySelectorAll('.drink-card');
const dots = document.querySelectorAll('.dot');
const wrapper = document.querySelector('.carousel-wrapper');
const container = document.querySelector('.carousel-container');
const totalSlides = slides.length;

function goToSlide(index) {
    currentSlide = index;
    if (wrapper && container) {
        // Calcola il padding del container in base alla larghezza dello schermo
        const containerPadding = window.innerWidth >= 768 ? 40 : 10; // 10px per mobile, 40px per desktop
        const containerWidth = container.offsetWidth - containerPadding;
        const gap = window.innerWidth >= 768 ? 20 : 10; // 10px per mobile, 20px per desktop
        const offset = (containerWidth + gap) * currentSlide;
        wrapper.style.transform = `translateX(-${offset}px)`;
    }

    dots.forEach((dot, i) => {
        dot.classList.toggle('active', i === currentSlide);
    });
}

function nextSlide() {
    currentSlide = (currentSlide + 1) % totalSlides;
    goToSlide(currentSlide);
}

// Auto scroll ogni 5 secondi
if (totalSlides > 0) {
    setInterval(nextSlide, 5000);

    // Ricalcola la posizione quando la finestra viene ridimensionata
    window.addEventListener('resize', () => goToSlide(currentSlide));
}

// Click sui dots
dots.forEach((dot, index) => {
    dot.addEventListener('click', () => goToSlide(index));
});

// ===== CAROUSEL EVENTI =====
let currentEventSlide = 0;
const eventSlides = document.querySelectorAll('.event-card');
const eventDots = document.querySelectorAll('.event-dot');
const eventWrapper = document.querySelector('.event-slider-wrapper');
const eventContainer = document.querySelector('.event-slider');
const totalEventSlides = eventSlides.length;

function goToEventSlide(index) {
    currentEventSlide = index;
    if (eventWrapper && eventContainer) {
        const containerPadding = window.innerWidth >= 768 ? 40 : 10;
        const containerWidth = eventContainer.offsetWidth - containerPadding;
        const gap = window.innerWidth >= 768 ? 20 : 10;
        const offset = (containerWidth + gap) * currentEventSlide;
        eventWrapper.style.transform = `translateX(-${offset}px)`;
    }

    eventDots.forEach((dot, i) => {
        dot.classList.toggle('active', i === currentEventSlide);
    });
}

function nextEventSlide() {
    currentEventSlide = (currentEventSlide + 1) % totalEventSlides;
    goToEventSlide(currentEventSlide);
}

// Auto scroll eventi ogni 5 secondi
if (totalEventSlides > 0) {
    setInterval(nextEventSlide, 5000);

    // Ricalcola la posizione quando la finestra viene ridimensionata
    window.addEventListener('resize', () => goToEventSlide(currentEventSlide));
}

// Click sui dots degli eventi
eventDots.forEach((dot, index) => {
    dot.addEventListener('click', () => goToEventSlide(index));
});

// ===== CONTATORE PERSONE =====
function changeQty(val) {
    const el = document.getElementById('numPersone');
    if (el) {
        let current = parseInt(el.innerText);
        if (current + val >= 1) {
            el.innerText = current + val;
        }
    }
}
const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbz7Pzxrvi1eEXLbIHfmW8w19ZgP2U2sEqInDeVPNikw8GlTl-D4JGNT1wJ3HAYLclbvtg/exec'; // <-- tuo URL

document.getElementById('bookingForm').addEventListener('submit', async function (e) {
    e.preventDefault();

    const submitBtn = document.querySelector('.btn-submit');
    submitBtn.disabled = true;
    submitBtn.textContent = 'Invio...';

    const dateStr = document.getElementById('data').value;        // es. 2025-12-21
    const timeStr = document.getElementById('ora').value;         // es. 20:00
    const name = document.getElementById('nome').value.trim();
    const phone = document.getElementById('telefono').value.trim();
    const people = Number(document.getElementById('numPersone').textContent);

    // Oggetto che verrà letto da doPost(e) in Apps Script
    const payload = {
        action: 'creaPrenotazione',
        dateStr,
        timeStr,
        name,
        phone,
        people
    };

    try {
        const res = await fetch(SCRIPT_URL, {
            method: 'POST',
            redirect: 'follow',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        });

        console.log('HTTP status:', res.status, res.statusText);

        const text = await res.text();
        console.log('Raw response text:', text);

        let data;
        try {
            data = JSON.parse(text);
        } catch (e) {
            throw new Error('Risposta non JSON: ' + text);
        }

        alert(data.message || 'Risposta ricevuta');

    } catch (err) {
        console.error('Fetch error:', err);
        alert('Errore di connessione: ' + err.message);
    }

});
