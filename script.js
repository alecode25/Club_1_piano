// Gestione click bottoni
document.addEventListener('DOMContentLoaded', function() {
    const btnPrimary = document.querySelector('.btn-primary');
    const btnSecondary = document.querySelector('.btn-secondary');
    const menuLink = document.querySelector('.menu-link');
    const categoryBtns = document.querySelectorAll('.category-btn');
    const orderBtn = document.querySelector('.order-btn');
    const navItems = document.querySelectorAll('.nav-item');

    // Click bottone prenotazione
    if (btnPrimary) {
        btnPrimary.addEventListener('click', function() {
            console.log('Prenotazione tavolo richiesta');
            alert('Funzionalità di prenotazione in arrivo!');
        });
    }

    // Click bottone eventi
    if (btnSecondary) {
        btnSecondary.addEventListener('click', function() {
            console.log('Visualizza prossimo evento');
            alert('Scopri i nostri eventi!');
        });
    }

    // Click link menù - scroll smooth alla sezione menu
    if (menuLink) {
        menuLink.addEventListener('click', function(e) {
            e.preventDefault();
            const menuSection = document.getElementById('menu');
            if (menuSection) {
                menuSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    }

    // Click categorie cibo
    categoryBtns.forEach(function(btn) {
        btn.addEventListener('click', function() {
            const category = this.closest('.category-card').querySelector('.category-title').textContent;
            console.log('Categoria selezionata:', category);
            alert('Visualizzazione categoria: ' + category);
        });
    });

    // Click bottone ordina drink
    if (orderBtn) {
        orderBtn.addEventListener('click', function() {
            console.log('Prenota drink');
            alert('Aggiungi al carrello!');
        });
    }

    // Navigazione bottom nav
    navItems.forEach(function(item) {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            navItems.forEach(function(nav) {
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
        
        setTimeout(function() {
            content.style.transition = 'all 0.8s ease';
            content.style.opacity = '1';
            content.style.transform = 'translateY(0)';
        }, 100);
    }

    // Animazione menu section quando entra in viewport
    const menuSection = document.querySelector('.menu-section');
    if (menuSection) {
        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(function(entry) {
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