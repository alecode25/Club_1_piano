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
        const containerPadding = window.innerWidth >= 768 ? 40 : 20; // 20px per mobile, 40px per desktop
        const containerWidth = container.offsetWidth - containerPadding;
        const gap = window.innerWidth >= 768 ? 20 : 15; // 15px per mobile, 20px per desktop
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

// ===== SLIDER EVENTI (DRAG TO SCROLL) =====
const slider = document.querySelector('.event-slider');

if (slider) {
    let isDown = false;
    let startX;
    let scrollLeft;

    // Mouse events
    slider.addEventListener('mousedown', (e) => {
        isDown = true;
        slider.style.cursor = 'grabbing';
        startX = e.pageX - slider.offsetLeft;
        scrollLeft = slider.scrollLeft;
    });

    slider.addEventListener('mouseleave', () => {
        isDown = false;
        slider.style.cursor = 'grab';
    });

    slider.addEventListener('mouseup', () => {
        isDown = false;
        slider.style.cursor = 'grab';
    });

    slider.addEventListener('mousemove', (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - slider.offsetLeft;
        const walk = (x - startX) * 2;
        slider.scrollLeft = scrollLeft - walk;
    });
}

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

// ===== FORM PRENOTAZIONE =====
const bookingForm = document.getElementById('bookingForm');

if (bookingForm) {
    bookingForm.addEventListener('submit', function(e) {
        e.preventDefault();

        const btn = e.target.querySelector('button[type="submit"]');
        const originalText = btn.innerText;
        btn.innerText = "Invio in corso...";
        btn.disabled = true;

        // Raccolta dati
        const dati = {
            nome: document.getElementById('nome').value,
            telefono: document.getElementById('telefono').value,
            dataPrenotazione: document.getElementById('data').value,
            ora: document.getElementById('ora').value,
            persone: document.getElementById('numPersone').innerText
        };

        // URL dell'App Web di Google Sheets (SOSTITUISCI CON IL TUO)
        const scriptURL = 'IL_TUO_URL_DI_GOOGLE_APPS_SCRIPT_QUI';

        // Se non hai ancora configurato Google Sheets, mostra un alert
        if (scriptURL === 'IL_TUO_URL_DI_GOOGLE_APPS_SCRIPT_QUI') {
            console.log('Prenotazione ricevuta:', dati);
            alert(`Prenotazione ricevuta!\n\nNome: ${dati.nome}\nTelefono: ${dati.telefono}\nData: ${dati.dataPrenotazione}\nOra: ${dati.ora}\nPersone: ${dati.persone}\n\nConfigura Google Sheets per salvare i dati.`);
            
            bookingForm.reset();
            document.getElementById('numPersone').innerText = "2";
            btn.innerText = originalText;
            btn.disabled = false;
            return;
        }

        // Invio a Google Sheets
        fetch(scriptURL, {
            method: 'POST',
            mode: 'no-cors',
            cache: 'no-cache',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(dati)
        })
        .then(() => {
            alert("Prenotazione ricevuta! Ti aspettiamo al Club 1 Piano.");
            bookingForm.reset();
            document.getElementById('numPersone').innerText = "2";
            btn.innerText = originalText;
            btn.disabled = false;
        })
        .catch(error => {
            console.error('Errore:', error);
            alert("Si è verificato un errore. Riprova più tardi.");
            btn.innerText = originalText;
            btn.disabled = false;
        });
    });
}