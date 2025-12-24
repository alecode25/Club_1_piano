document.addEventListener('DOMContentLoaded', function () {
    // ===== SISTEMA DI NOTIFICHE (SOLO DESIGN) =====
    function createNotificationSystem() {
        const container = document.createElement('div');
        container.id = 'notification-container';
        container.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            z-index: 10000;
            display: flex;
            flex-direction: column;
            gap: 10px;
            max-width: 400px;
            width: calc(100% - 40px);
        `;
        document.body.appendChild(container);
        return container;
    }

    function showNotification(message, type = 'info', duration = 5000) {
        let container = document.getElementById('notification-container');
        if (!container) {
            container = createNotificationSystem();
        }

        const notification = document.createElement('div');

        const icons = {
            success: '✅',
            error: '❌',
            warning: '⚠️',
            info: 'ℹ️'
        };

        const colors = {
            success: { bg: '#10b981', border: '#059669' },
            error: { bg: '#ef4444', border: '#dc2626' },
            warning: { bg: '#f59e0b', border: '#d97706' },
            info: { bg: '#3b82f6', border: '#2563eb' }
        };

        const color = colors[type] || colors.info;
        const icon = icons[type] || icons.info;

        notification.style.cssText = `
            background: ${color.bg};
            color: white;
            padding: 16px 20px;
            border-radius: 12px;
            border-left: 4px solid ${color.border};
            box-shadow: 0 10px 25px rgba(0,0,0,0.3);
            display: flex;
            align-items: flex-start;
            gap: 12px;
            animation: slideIn 0.3s ease-out;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            font-size: 15px;
            line-height: 1.5;
            cursor: pointer;
            transition: transform 0.2s, opacity 0.2s;
        `;

        notification.innerHTML = `
            <span style="font-size: 24px; flex-shrink: 0;">${icon}</span>
            <div style="flex: 1;">
                <div style="font-weight: 600; margin-bottom: 4px;">${type === 'success' ? 'Successo' : type === 'error' ? 'Errore' : type === 'warning' ? 'Attenzione' : 'Info'}</div>
                <div style="opacity: 0.95; white-space: pre-line;">${message}</div>
            </div>
            <button style="
                background: rgba(255,255,255,0.2);
                border: none;
                color: white;
                width: 24px;
                height: 24px;
                border-radius: 50%;
                cursor: pointer;
                font-size: 16px;
                display: flex;
                align-items: center;
                justify-content: center;
                flex-shrink: 0;
                transition: background 0.2s;
            " onmouseover="this.style.background='rgba(255,255,255,0.3)'" onmouseout="this.style.background='rgba(255,255,255,0.2)'">×</button>
        `;

        if (!document.getElementById('notification-styles')) {
            const style = document.createElement('style');
            style.id = 'notification-styles';
            style.textContent = `
                @keyframes slideIn {
                    from {
                        transform: translateX(400px);
                        opacity: 0;
                    }
                    to {
                        transform: translateX(0);
                        opacity: 1;
                    }
                }
                @keyframes slideOut {
                    from {
                        transform: translateX(0);
                        opacity: 1;
                    }
                    to {
                        transform: translateX(400px);
                        opacity: 0;
                    }
                }
                @media (max-width: 640px) {
                    #notification-container {
                        top: 10px !important;
                        right: 10px !important;
                        left: 10px !important;
                        width: auto !important;
                        max-width: none !important;
                    }
                }
            `;
            document.head.appendChild(style);
        }

        const closeBtn = notification.querySelector('button');
        const closeNotification = () => {
            notification.style.animation = 'slideOut 0.3s ease-out';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        };

        closeBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            closeNotification();
        });

        notification.addEventListener('click', closeNotification);

        container.appendChild(notification);

        if (duration > 0) {
            setTimeout(closeNotification, duration);
        }
    }

    // ===== URL APPS SCRIPT =====
    const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbxmYdNsXkR_IoVYBhyVSEwBQPu8P6A57Ujbl98CB-8FCFlZmW4zTUBmK5lEHkysaixMvw/exec';

    // ===== Riferimenti base =====
    const btnPrimary = document.querySelector('.btn-primary');
    const btnSecondary = document.querySelector('.btn-secondary');
    const menuLink = document.querySelector('.menu-link');
    const content = document.querySelector('.content');
    const menuSection = document.querySelector('.menu-section');

    if (btnPrimary) {
        btnPrimary.addEventListener('click', function () {
            const prenotaSection = document.getElementById('Prenotazioni');
            if (prenotaSection) prenotaSection.scrollIntoView({ behavior: 'smooth' });
        });
    }
    if (btnSecondary) {
        btnSecondary.addEventListener('click', function () {
            const eventiSection = document.getElementById('eventi');
            if (eventiSection) eventiSection.scrollIntoView({ behavior: 'smooth' });
        });
    }
    if (menuLink) {
        menuLink.addEventListener('click', function (e) {
            e.preventDefault();
            const menu = document.getElementById('menu');
            if (menu) menu.scrollIntoView({ behavior: 'smooth' });
        });
    }

    if (content) {
        content.style.opacity = '0';
        content.style.transform = 'translateY(20px)';
        setTimeout(function () {
            content.style.transition = 'all 0.8s ease';
            content.style.opacity = '1';
            content.style.transform = 'translateY(0)';
        }, 100);
    }

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

    // ===== CONFIGURAZIONE RISTORANTE =====
    const CONFIG = {
        giorniChiusiSempre: [1],//chiuso ogni lunedì (0=Dom,1=Lun,2=Mar,...6=Sab)
        giorniChiusiSpecifici: [//chiuso in queste date specifiche(YYYY-MM-DD)
            '2025-12-24',
            '2025-12-25',
            '2025-12-26',
            '2025-12-31',
            '2026-01-01',
            '2026-01-06',
            '2026-08-15',
        ],
        capienzaMax: 140,//capienza massima giornaliera
        prenotazioni: []//prenotazioni esistenti
    };

    // ===== CONTATORE PERSONE =====
    let numPersone = 2;
    window.changeQty = function (delta) {
        numPersone = Math.max(1, Math.min(20, numPersone + delta));
        const el = document.getElementById('numPersone');
        if (el) el.textContent = numPersone;
    };

    // ===== VALIDAZIONE DATA =====
    const dataInput = document.getElementById('data');
    if (dataInput) {
        dataInput.addEventListener('change', function () {
            const dataSelezionata = new Date(this.value + 'T00:00:00');
            const oggi = new Date();
            oggi.setHours(0, 0, 0, 0);
            const dataStr = this.value;

            if (dataSelezionata < oggi) {
                showNotification('Non puoi prenotare una data passata.', 'error');
                this.value = '';
                return;
            }

            const giorno = dataSelezionata.getDay();
            if (CONFIG.giorniChiusiSempre.includes(giorno)) {
                const nomi = ['Domenica', 'Lunedì', 'Martedì', 'Mercoledì', 'Giovedì', 'Venerdì', 'Sabato'];
                showNotification('Il ristorante è chiuso di ' + nomi[giorno] + '.', 'warning');
                this.value = '';
                return;
            }

            if (CONFIG.giorniChiusiSpecifici.includes(dataStr)) {
                showNotification('Il ristorante è chiuso il ' + dataStr + '.', 'warning');
                this.value = '';
                return;
            }

            const prenotazioniGiorno = CONFIG.prenotazioni.filter(p => p.data === dataStr);
            const totali = prenotazioniGiorno.reduce((s, p) => s + p.persone, 0);
            const disponibili = CONFIG.capienzaMax - totali;

            if (disponibili < numPersone) {
                showNotification(dataStr + ' è pieno (' + totali + '/' + CONFIG.capienzaMax + ' posti occupati).', 'error');
                this.value = '';
                return;
            }
        });
    }

    // ===== SUBMIT FORM =====
    const bookingForm = document.getElementById('bookingForm');
    if (!bookingForm) return;

    bookingForm.addEventListener('submit', async function (e) {
        e.preventDefault();

        const submitBtn = document.querySelector('.btn-submit');
        if (submitBtn) {
            submitBtn.disabled = true;
            submitBtn.textContent = 'Invio...';
        }

        const dateStr = document.getElementById('data').value;
        const timeStr = document.getElementById('ora').value;
        const name = document.getElementById('nome').value.trim();
        const phone = document.getElementById('telefono').value.trim();
        const people = numPersone;

        if (!name || !phone || !dateStr || !timeStr) {
            showNotification('Compila tutti i campi.', 'warning');
            if (submitBtn) {
                submitBtn.disabled = false;
                submitBtn.textContent = 'Conferma Prenotazione';
            }
            return;
        }

        const dup = CONFIG.prenotazioni.find(p => p.telefono === phone && p.data === dateStr);
        if (dup) {
            showNotification('Hai già una prenotazione il ' + dateStr + ' con questo numero.', 'warning');
            if (submitBtn) {
                submitBtn.disabled = false;
                submitBtn.textContent = 'Conferma Prenotazione';
            }
            return;
        }

        const formData = new URLSearchParams();
        formData.append('data', dateStr);
        formData.append('ora', timeStr);
        formData.append('nome', name);
        formData.append('telefono', phone);
        formData.append('persone', String(people));

        try {
            console.log('📤 Invio dati:', {
                data: dateStr,
                ora: timeStr,
                nome: name,
                telefono: phone,
                persone: people
            });

            const res = await fetch(SCRIPT_URL, {
                method: 'POST',
                body: formData
            });

            console.log('📥 Status:', res.status, res.statusText);

            const text = await res.text();
            console.log('📄 Risposta completa:', text);

            let risposta;
            try {
                risposta = JSON.parse(text);
                console.log('✓ JSON parsed:', risposta);
            } catch (e) {
                console.warn('⚠️ Risposta non è JSON:', text);
                if (text.includes('success')) {
                    risposta = { result: 'success' };
                } else {
                    risposta = { result: 'error', message: text };
                }
            }

            if (risposta.result === 'success') {
                showNotification('Prenotazione confermata!\n\n' + name + ' - ' + people + ' persone\n' + dateStr + ' alle ' + timeStr + '\n\nPer disdire o modificare la prenotazione, contattaci direttamente al numero: 123456789.', 'success', 7000);

                CONFIG.prenotazioni.push({
                    data: dateStr,
                    ora: timeStr,
                    nome: name,
                    telefono: phone,
                    persone: people
                });

                bookingForm.reset();
                const el = document.getElementById('numPersone');
                numPersone = 2;
                if (el) el.textContent = '2';
            } else {
                showNotification('Errore durante il salvataggio. Riprova.', 'error');
            }

        } catch (err) {
            console.error('Fetch error:', err);
            showNotification('Errore di connessione: ' + err.message, 'error');
        } finally {
            if (submitBtn) {
                submitBtn.disabled = false;
                submitBtn.textContent = 'Conferma Prenotazione';
            }
        }
    });
});
// ===== CAROUSEL AUTOMATICO DRINKS =====
const drinkCarouselContainer = document.querySelector('.carousel-container');
const drinkCarousel = document.querySelector('.carousel-wrapper');
const drinkDots = document.querySelectorAll('.carousel-dots .dot');
let currentDrinkIndex = 0;
let drinkInterval;

function updateDrinkCarousel() {
    if (!drinkCarousel || !drinkCarouselContainer || drinkDots.length === 0) return;

    const containerWidth = drinkCarouselContainer.offsetWidth;
    const scrollAmount = containerWidth * currentDrinkIndex;

    drinkCarousel.style.transform = `translateX(-${scrollAmount}px)`;

    drinkDots.forEach((dot, index) => {
        dot.classList.toggle('active', index === currentDrinkIndex);
    });
}

function nextDrink() {
    if (!drinkCarousel) return;
    const totalCards = drinkCarousel.querySelectorAll('.drink-card').length;
    currentDrinkIndex = (currentDrinkIndex + 1) % totalCards;
    updateDrinkCarousel();
}

function startDrinkCarousel() {
    drinkInterval = setInterval(nextDrink, 7000);
}

function stopDrinkCarousel() {
    clearInterval(drinkInterval);
}

if (drinkCarousel && drinkCarouselContainer) {
    // Imposta overflow hidden sul container
    drinkCarouselContainer.style.overflow = 'hidden';
    drinkCarouselContainer.style.position = 'relative';

    // Imposta lo stile del carousel wrapper
    drinkCarousel.style.transition = 'transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
    drinkCarousel.style.display = 'flex';
    drinkCarousel.style.width = '100%';

    // Imposta ogni card per occupare l'intera larghezza del container
    const drinkCards = drinkCarousel.querySelectorAll('.drink-card');
    drinkCards.forEach(card => {
        card.style.minWidth = '100%';
        card.style.maxWidth = '100%';
        card.style.flexShrink = '0';
        card.style.flexGrow = '0';
    });

    startDrinkCarousel();

    drinkCarouselContainer.addEventListener('mouseenter', stopDrinkCarousel);
    drinkCarouselContainer.addEventListener('mouseleave', startDrinkCarousel);

    drinkDots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            currentDrinkIndex = index;
            updateDrinkCarousel();
            stopDrinkCarousel();
            startDrinkCarousel();
        });
    });

    // Ricalcola al resize della finestra
    window.addEventListener('resize', updateDrinkCarousel);
}

// ===== CAROUSEL AUTOMATICO EVENTI =====
const eventSliderContainer = document.querySelector('.event-slider');
const eventSlider = document.querySelector('.event-slider-wrapper');
const eventDots = document.querySelectorAll('.event-dots .event-dot');
let currentEventIndex = 0;
let eventInterval;

function updateEventCarousel() {
    if (!eventSlider || !eventSliderContainer || eventDots.length === 0) return;

    const containerWidth = eventSliderContainer.offsetWidth;
    const scrollAmount = containerWidth * currentEventIndex;

    eventSlider.style.transform = `translateX(-${scrollAmount}px)`;

    eventDots.forEach((dot, index) => {
        dot.classList.toggle('active', index === currentEventIndex);
    });
}

function nextEvent() {
    if (!eventSlider) return;
    const totalCards = eventSlider.querySelectorAll('.event-card').length;
    currentEventIndex = (currentEventIndex + 1) % totalCards;
    updateEventCarousel();
}

function startEventCarousel() {
    eventInterval = setInterval(nextEvent, 7000);
}

function stopEventCarousel() {
    clearInterval(eventInterval);
}

if (eventSlider && eventSliderContainer) {
    // Imposta overflow hidden sul container
    eventSliderContainer.style.overflow = 'hidden';
    eventSliderContainer.style.position = 'relative';

    // Imposta lo stile del carousel wrapper
    eventSlider.style.transition = 'transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
    eventSlider.style.display = 'flex';
    eventSlider.style.width = '100%';

    // Imposta ogni card per occupare l'intera larghezza del container
    const eventCards = eventSlider.querySelectorAll('.event-card');
    eventCards.forEach(card => {
        card.style.minWidth = '100%';
        card.style.maxWidth = '100%';
        card.style.flexShrink = '0';
        card.style.flexGrow = '0';
    });

    startEventCarousel();

    eventSliderContainer.addEventListener('mouseenter', stopEventCarousel);
    eventSliderContainer.addEventListener('mouseleave', startEventCarousel);

    eventDots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            currentEventIndex = index;
            updateEventCarousel();
            stopEventCarousel();
            startEventCarousel();
        });
    });

    // Ricalcola al resize della finestra
    window.addEventListener('resize', updateEventCarousel);
}