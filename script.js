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
                    from { transform: translateX(400px); opacity: 0; }
                    to { transform: translateX(0); opacity: 1; }
                }
                @keyframes slideOut {
                    from { transform: translateX(0); opacity: 1; }
                    to { transform: translateX(400px); opacity: 0; }
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
    const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbyr01cl0SaNZxVGC75-6VkTu3h7XPxJ9zL7YZXv9LwIFleSlqlnCAYm55xtUVTOpPU6qg/exec';

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
        giorniChiusiSempre: [1], // Lunedì e Martedì chiusi
        giorniChiusiSpecifici: [
            '2026-02-10', 
        ],
        capienzaMax: 140,
        prenotazioni: []
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


    // ===== SUBMIT BOOKING FORM =====
    const bookingForm = document.getElementById('bookingForm');
    if (bookingForm) {
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

            const formData = new URLSearchParams();
            formData.append('data', dateStr);
            formData.append('ora', timeStr);
            formData.append('nome', name);
            formData.append('telefono', phone);
            formData.append('persone', String(people));

            try {
                const res = await fetch(SCRIPT_URL, { method: 'POST', body: formData });
                const text = await res.text();
                let risposta;
                try { risposta = JSON.parse(text); } catch (e) { risposta = text.includes('success') ? { result: 'success' } : { result: 'error' }; }

                if (risposta.result === 'success') {
                    showNotification('Prenotazione confermata!\n per disdire la prenotazione contattare il numero: 0541 1890589', 'success', 7000);
                    CONFIG.prenotazioni.push({ data: dateStr, ora: timeStr, nome: name, telefono: phone, persone: people });
                    bookingForm.reset();
                    document.getElementById('numPersone').textContent = '2';
                    numPersone = 2;
                } else {
                    showNotification('Errore durante il salvataggio.', 'error');
                }
            } catch (err) {
                showNotification('Errore di connessione.', 'error');
            } finally {
                if (submitBtn) {
                    submitBtn.disabled = false;
                    submitBtn.textContent = 'Conferma Prenotazione';
                }
            }
        });
    }
});

// ===== CAROUSEL AUTOMATICO DRINKS =====
function setupDrinkCarousel() {
    const drinkCarouselContainer = document.querySelector('.carousel-container');
    const drinkCarousel = document.querySelector('.carousel-wrapper');
    const drinkDots = document.querySelectorAll('.carousel-dots .dot');
    if (!drinkCarousel || !drinkCarouselContainer) return;

    let currentDrinkIndex = 0;
    let drinkInterval;

    function updateDrinkCarousel() {
        const containerWidth = drinkCarouselContainer.offsetWidth;
        drinkCarousel.style.transform = `translateX(-${containerWidth * currentDrinkIndex}px)`;
        drinkDots.forEach((dot, index) => dot.classList.toggle('active', index === currentDrinkIndex));
    }

    function nextDrink() {
        const totalCards = drinkCarousel.querySelectorAll('.drink-card').length;
        currentDrinkIndex = (currentDrinkIndex + 1) % totalCards;
        updateDrinkCarousel();
    }

    drinkInterval = setInterval(nextDrink, 7000);
    drinkDots.forEach((dot, index) => {
        dot.addEventListener('click', () => { currentDrinkIndex = index; updateDrinkCarousel(); });
    });
    window.addEventListener('resize', updateDrinkCarousel);
}
setupDrinkCarousel();

// ===== CAROUSEL AUTOMATICO EVENTI =====
function setupEventCarousel() {
    const eventSliderContainer = document.querySelector('.event-slider');
    const eventSlider = document.querySelector('.event-slider-wrapper');
    const eventDots = document.querySelectorAll('.event-dots .event-dot');
    if (!eventSlider || !eventSliderContainer) return;

    let currentEventIndex = 0;
    let eventInterval;

    function updateEventCarousel() {
        const containerWidth = eventSliderContainer.offsetWidth;
        eventSlider.style.transform = `translateX(-${containerWidth * currentEventIndex}px)`;
        eventDots.forEach((dot, index) => dot.classList.toggle('active', index === currentEventIndex));
    }

    function nextEvent() {
        const totalCards = eventSlider.querySelectorAll('.event-card').length;
        currentEventIndex = (currentEventIndex + 1) % totalCards;
        updateEventCarousel();
    }

    eventInterval = setInterval(nextEvent, 7000);
    eventDots.forEach((dot, index) => {
        dot.addEventListener('click', () => { currentEventIndex = index; updateEventCarousel(); });
    });
    window.addEventListener('resize', updateEventCarousel);
}
setupEventCarousel();

// ===== COOKIE BANNER =====
(function () {
    const banner = document.getElementById('cookie-banner');
    if (!banner) return;
    const ACCEPT_KEY = 'cookie_consent_club1piano';
    if (!localStorage.getItem(ACCEPT_KEY)) banner.style.display = 'block';

    document.getElementById('cookie-accept')?.addEventListener('click', () => {
        localStorage.setItem(ACCEPT_KEY, 'accepted');
        banner.style.display = 'none';
    });
    document.getElementById('cookie-decline')?.addEventListener('click', () => {
        localStorage.setItem(ACCEPT_KEY, 'declined');
        banner.style.display = 'none';
    });
})();