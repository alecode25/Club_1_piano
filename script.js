// Gestione click bottoni
document.addEventListener('DOMContentLoaded', function () {
    const btnPrimary = document.querySelector('.btn-primary');
    const btnSecondary = document.querySelector('.btn-secondary');
    const menuLink = document.querySelector('.menu-link');
    const categoryBtns = document.querySelectorAll('.category-btn');
    const orderBtn = document.querySelector('.order-btn');
    const navItems = document.querySelectorAll('.nav-item');

    // Click bottone prenotazione
    if (btnPrimary) {
        btnPrimary.addEventListener('click', function () {
            console.log('Prenotazione tavolo richiesta');
            alert('Funzionalità di prenotazione in arrivo!');
        });
    }

    // Click bottone eventi
    if (btnSecondary) {
        btnSecondary.addEventListener('click', function () {
            console.log('Visualizza prossimo evento');
            alert('Scopri i nostri eventi!');
        });
    }

    // Click link menù - scroll smooth alla sezione menu
    if (menuLink) {
        menuLink.addEventListener('click', function (e) {
            e.preventDefault();
            const menuSection = document.getElementById('menu');
            if (menuSection) {
                menuSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    }


    // Navigazione bottom nav
    navItems.forEach(function (item) {
        item.addEventListener('click', function (e) {
            e.preventDefault();
            navItems.forEach(function (nav) {
                nav.classList.remove('active');
            });
            this.classList.add('active');

            const section = this.querySelector('span').textContent;
            console.log('Navigazione a:', section);
        });
    });

    // Animazione fade-in al caricamento
    const content = document.querySelector('.content');
    if (content) {
        content.style.opacity = '0';
        content.style.transform = 'translateY(20px)';

        setTimeout(function () {
            content.style.transition = 'all 0.8s ease';
            content.style.opacity = '1';
            content.style.transform = 'translateY(0)';
        }, 100);
    }

    // Animazione menu section quando entra in viewport
    const menuSection = document.querySelector('.menu-section');
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

let currentSlide = 0;
const slides = document.querySelectorAll('.drink-card');
const dots = document.querySelectorAll('.dot');
const wrapper = document.querySelector('.carousel-wrapper');
const totalSlides = slides.length;

function goToSlide(index) {
    currentSlide = index;
    wrapper.style.transform = `translateX(-${currentSlide * 100}%)`;

    dots.forEach((dot, i) => {
        dot.classList.toggle('active', i === currentSlide);
    });
}

function nextSlide() {
    currentSlide = (currentSlide + 1) % totalSlides;
    goToSlide(currentSlide);
}

// Auto scroll ogni 5 secondi
setInterval(nextSlide, 5000);

// Click sui dots
dots.forEach((dot, index) => {
    dot.addEventListener('click', () => goToSlide(index));
});

// --- 1. LOGICA DELLO SLIDER (SCORRIMENTO) ---
const slider = document.querySelector('.event-slider');
let isDown = false;
let startX;
let scrollLeft;

// Supporto per il trascinamento con il Mouse (per PC)
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
    const walk = (x - startX) * 2; // Velocità di scorrimento
    slider.scrollLeft = scrollLeft - walk;
});

// --- 2. GESTIONE CONTATORE PERSONE ---
function changeQty(val) {
    const el = document.getElementById('numPersone');
    let current = parseInt(el.innerText);
    if (current + val >= 1) {
        el.innerText = current + val;
    }
}

// --- 3. INVIO DATI A GOOGLE SHEETS ---
document.getElementById('bookingForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const btn = e.target.querySelector('button');
    btn.innerText = "Invio in corso...";
    btn.disabled = true;

    const dati = {
        nome: document.getElementById('nome').value,
        telefono: document.getElementById('telefono').value,
        dataPrenotazione: document.getElementById('data').value,
        ora: document.getElementById('ora').value,
        persone: document.getElementById('numPersone').innerText
    };

    // Sostituisci con il tuo URL dell'App Web di Google Sheets
    const scriptURL = 'IL_TUO_URL_DI_GOOGLE_APPS_SCRIPT_QUI';

    fetch(scriptURL, {
        method: 'POST',
        mode: 'no-cors', 
        cache: 'no-cache',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dati)
    })
    .then(() => {
        alert("Prenotazione inviata! Controlla il foglio Google.");
        document.getElementById('bookingForm').reset();
        document.getElementById('numPersone').innerText = "2";
        btn.innerText = "Conferma Prenotazione";
        btn.disabled = false;
    })
    .catch(error => {
        console.error('Errore:', error);
        alert("Errore nell'invio. Riprova.");
        btn.disabled = false;
    });
});

// Gestione invio form prenotazione a Google Sheets

document.getElementById('bookingForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const btn = e.target.querySelector('button');
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

    // URL dell'App Web di Google Sheets (INCOLLA QUI IL TUO URL)
    const scriptURL = 'IL_TUO_URL_DI_GOOGLE_APPS_SCRIPT_QUI';

    fetch(scriptURL, {
        method: 'POST',
        mode: 'no-cors', // Necessario per Google Apps Script
        cache: 'no-cache',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dati)
    })
    .then(() => {
        alert("Prenotazione ricevuta! Ti aspettiamo al Club 1 Piano.");
        document.getElementById('bookingForm').reset();
        document.getElementById('numPersone').innerText = "2";
        btn.innerText = "Conferma Prenotazione";
        btn.disabled = false;
    })
    .catch(error => {
        console.error('Errore:', error);
        alert("Si è verificato un errore. Riprova più tardi.");
        btn.disabled = false;
    });
});