// =============================================
// MOTOREP - JavaScript Interactivo
// =============================================

// Esperar a que el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', function() {
    
    // =============================================
    // CARRUSEL DE IMÁGENES
    // =============================================
    const slides = document.querySelectorAll('.carousel-slide');
    const indicators = document.querySelectorAll('.indicator');
    const prevBtn = document.getElementById('carouselPrev');
    const nextBtn = document.getElementById('carouselNext');
    let currentSlide = 0;
    let autoplayInterval;

    function showSlide(index) {
        // Remover clase active de todos
        slides.forEach(slide => slide.classList.remove('active'));
        indicators.forEach(indicator => indicator.classList.remove('active'));
        
        // Normalizar índice (circular)
        if (index >= slides.length) {
            currentSlide = 0;
        } else if (index < 0) {
            currentSlide = slides.length - 1;
        } else {
            currentSlide = index;
        }
        
        // Activar slide e indicador actual
        slides[currentSlide].classList.add('active');
        indicators[currentSlide].classList.add('active');
    }

    function nextSlide() {
        showSlide(currentSlide + 1);
    }

    function prevSlide() {
        showSlide(currentSlide - 1);
    }

    // Event listeners para controles
    if (nextBtn) {
        nextBtn.addEventListener('click', function() {
            nextSlide();
            resetAutoplay();
        });
    }

    if (prevBtn) {
        prevBtn.addEventListener('click', function() {
            prevSlide();
            resetAutoplay();
        });
    }

    // Event listeners para indicadores
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', function() {
            showSlide(index);
            resetAutoplay();
        });
    });

    // Autoplay del carrusel
    function startAutoplay() {
        autoplayInterval = setInterval(nextSlide, 5000); // Cambiar cada 5 segundos
    }

    function stopAutoplay() {
        clearInterval(autoplayInterval);
    }

    function resetAutoplay() {
        stopAutoplay();
        startAutoplay();
    }

    // Pausar autoplay al hover
    const carouselContainer = document.querySelector('.hero-carousel');
    if (carouselContainer) {
        carouselContainer.addEventListener('mouseenter', stopAutoplay);
        carouselContainer.addEventListener('mouseleave', startAutoplay);
        
        // Iniciar autoplay
        startAutoplay();
    }

    // Soporte para teclado (flechas izquierda/derecha)
    document.addEventListener('keydown', function(e) {
        if (e.key === 'ArrowLeft') {
            prevSlide();
            resetAutoplay();
        } else if (e.key === 'ArrowRight') {
            nextSlide();
            resetAutoplay();
        }
    });

    // Soporte para gestos táctiles (swipe)
    let touchStartX = 0;
    let touchEndX = 0;

    if (carouselContainer) {
        carouselContainer.addEventListener('touchstart', function(e) {
            touchStartX = e.changedTouches[0].screenX;
        });

        carouselContainer.addEventListener('touchend', function(e) {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
        });
    }

    function handleSwipe() {
        const swipeThreshold = 50;
        if (touchEndX < touchStartX - swipeThreshold) {
            // Swipe izquierda - siguiente
            nextSlide();
            resetAutoplay();
        } else if (touchEndX > touchStartX + swipeThreshold) {
            // Swipe derecha - anterior
            prevSlide();
            resetAutoplay();
        }
    }
    
    // =============================================
    // MENÚ DE NAVEGACIÓN MÓVIL
    // =============================================
    const menuToggle = document.getElementById('menuToggle');
    const navMenu = document.getElementById('navMenu');
    
    // Toggle del menú hamburguesa
    menuToggle.addEventListener('click', function() {
        this.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
    
    // Cerrar menú al hacer clic en un enlace
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            menuToggle.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
    
    // =============================================
    // NAVEGACIÓN ACTIVA AL HACER SCROLL
    // =============================================
    const sections = document.querySelectorAll('section[id]');
    
    function setActiveNavLink() {
        const scrollY = window.pageYOffset;
        
        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 100;
            const sectionId = section.getAttribute('id');
            const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
            
            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navLinks.forEach(link => link.classList.remove('active'));
                if (navLink) navLink.classList.add('active');
            }
        });
    }
    
    window.addEventListener('scroll', setActiveNavLink);
    
    // =============================================
    // NAVBAR CON EFECTO AL HACER SCROLL
    // =============================================
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    
    // =============================================
    // FILTRO DE PRODUCTOS POR CATEGORÍA
    // =============================================
    const categoryPills = document.querySelectorAll('.category-pill');
    const productCards = document.querySelectorAll('.product-card');
    
    categoryPills.forEach(pill => {
        pill.addEventListener('click', function() {
            const category = this.getAttribute('data-category');
            
            // Actualizar categoría activa
            categoryPills.forEach(p => p.classList.remove('active'));
            this.classList.add('active');
            
            // Filtrar productos con animación
            productCards.forEach((card, index) => {
                const cardCategory = card.getAttribute('data-category');
                
                if (category === 'todos' || cardCategory === category) {
                    // Mostrar producto con delay escalonado
                    setTimeout(() => {
                        card.style.display = 'block';
                        card.style.animation = 'fadeIn 0.6s ease forwards';
                    }, index * 50);
                } else {
                    // Ocultar producto
                    card.style.animation = 'fadeOut 0.3s ease forwards';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
            
            // Scroll suave a la sección de productos
            document.getElementById('productos').scrollIntoView({ 
                behavior: 'smooth',
                block: 'start'
            });
        });
    });
    
    // Animación de fadeOut (agregar a CSS dinámicamente)
    const style = document.createElement('style');
    style.textContent = `
        @keyframes fadeOut {
            from {
                opacity: 1;
                transform: scale(1);
            }
            to {
                opacity: 0;
                transform: scale(0.95);
            }
        }
    `;
    document.head.appendChild(style);
    
    // =============================================
    // ANIMACIÓN DE APARICIÓN DE PRODUCTOS AL SCROLL
    // =============================================
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'fadeIn 0.6s ease forwards';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    productCards.forEach(card => {
        observer.observe(card);
    });
    
    // =============================================
    // BOTÓN FLOTANTE DE WHATSAPP - MOSTRAR/OCULTAR
    // =============================================
    const whatsappFloat = document.getElementById('whatsappFloat');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            whatsappFloat.style.opacity = '1';
            whatsappFloat.style.visibility = 'visible';
        } else {
            whatsappFloat.style.opacity = '0';
            whatsappFloat.style.visibility = 'hidden';
        }
    });
    
    // Inicialmente oculto
    whatsappFloat.style.opacity = '0';
    whatsappFloat.style.visibility = 'hidden';
    whatsappFloat.style.transition = 'opacity 0.3s ease, visibility 0.3s ease';
    
    // =============================================
    // VISTA RÁPIDA DE PRODUCTOS (Modal simple)
    // =============================================
    const quickViewButtons = document.querySelectorAll('.quick-view');
    
    quickViewButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const productCard = this.closest('.product-card');
            const productName = productCard.querySelector('.product-name').textContent;
            const productPrice = productCard.querySelector('.product-price').textContent;
            const productCategory = productCard.querySelector('.product-category').textContent;
            
            // Crear mensaje para WhatsApp
            const message = `Hola! Me interesa el producto: ${productName} (${productCategory}) - Precio: ${productPrice}`;
            const whatsappUrl = `https://wa.me/573001234567?text=${encodeURIComponent(message)}`;
            
            // Abrir WhatsApp en nueva pestaña
            window.open(whatsappUrl, '_blank');
        });
    });
    
    // =============================================
    // SMOOTH SCROLL PARA TODOS LOS ENLACES INTERNOS
    // =============================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            
            // Verificar si el href no es solo "#"
            if (href !== '#' && href.length > 1) {
                e.preventDefault();
                const target = document.querySelector(href);
                
                if (target) {
                    const offsetTop = target.offsetTop - 80; // Ajuste por el navbar fijo
                    
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
    
    // =============================================
    // CONTADOR DE PRODUCTOS VISIBLES
    // =============================================
    function updateProductCount() {
        const visibleProducts = document.querySelectorAll('.product-card[style*="display: block"], .product-card:not([style*="display: none"])').length;
        console.log(`Productos visibles: ${visibleProducts}`);
    }
    
    // Actualizar contador cuando cambia la categoría
    categoryPills.forEach(pill => {
        pill.addEventListener('click', function() {
            setTimeout(updateProductCount, 500);
        });
    });
    
    // =============================================
    // EFECTOS DE HOVER EN CARDS CON PARALLAX SUAVE
    // =============================================
    productCards.forEach(card => {
        card.addEventListener('mousemove', function(e) {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
        });
        
        card.addEventListener('mouseleave', function() {
            card.style.transform = '';
        });
    });
    
    // =============================================
    // ANIMACIÓN DE NÚMEROS EN PRECIOS (opcional)
    // =============================================
    const prices = document.querySelectorAll('.product-price');
    
    function animatePrice(element) {
        const text = element.textContent;
        const number = parseInt(text.replace(/\D/g, ''));
        
        if (!isNaN(number)) {
            let current = 0;
            const increment = number / 30;
            const timer = setInterval(() => {
                current += increment;
                if (current >= number) {
                    element.textContent = text;
                    clearInterval(timer);
                } else {
                    element.textContent = '$' + Math.floor(current).toLocaleString('es-CO');
                }
            }, 20);
        }
    }
    
    // Observer para animar precios cuando son visibles
    const priceObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.dataset.animated) {
                animatePrice(entry.target);
                entry.target.dataset.animated = 'true';
            }
        });
    }, { threshold: 0.5 });
    
    prices.forEach(price => priceObserver.observe(price));
    
    // =============================================
    // MENSAJE DE BIENVENIDA EN CONSOLA
    // =============================================
    console.log('%c🏍️ MOTOREP - Repuestos para Motos', 'font-size: 20px; font-weight: bold; color: #E31E24;');
    console.log('%cWeb desarrollada con JavaScript Vanilla', 'font-size: 12px; color: #FFC700;');
    
    // =============================================
    // LAZY LOADING PARA IMÁGENES (Optimización)
    // =============================================
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.removeAttribute('data-src');
                    }
                    imageObserver.unobserve(img);
                }
            });
        });
        
        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }
    
    // =============================================
    // BÚSQUEDA RÁPIDA (Funcionalidad adicional)
    // =============================================
    // Se puede agregar un input de búsqueda más adelante
    function searchProducts(query) {
        query = query.toLowerCase();
        
        productCards.forEach(card => {
            const productName = card.querySelector('.product-name').textContent.toLowerCase();
            const productCategory = card.querySelector('.product-category').textContent.toLowerCase();
            
            if (productName.includes(query) || productCategory.includes(query)) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    }
    
    // Exponer función de búsqueda globalmente
    window.searchProducts = searchProducts;
    
    // =============================================
    // ESTADÍSTICAS DE INTERACCIÓN (Analytics básico)
    // =============================================
    let interactions = {
        categoryClicks: 0,
        productViews: 0,
        whatsappClicks: 0
    };
    
    categoryPills.forEach(pill => {
        pill.addEventListener('click', () => {
            interactions.categoryClicks++;
            console.log('Interacciones:', interactions);
        });
    });
    
    quickViewButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            interactions.productViews++;
            console.log('Interacciones:', interactions);
        });
    });
    
    document.querySelectorAll('a[href*="wa.me"]').forEach(link => {
        link.addEventListener('click', () => {
            interactions.whatsappClicks++;
            console.log('Interacciones:', interactions);
        });
    });
    
    // =============================================
    // EFECTOS ADICIONALES DE ANIMACIÓN
    // =============================================
    
    // Animación del título principal
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const titleLines = heroTitle.querySelectorAll('.title-line');
        titleLines.forEach((line, index) => {
            line.style.opacity = '0';
            line.style.transform = 'translateY(30px)';
            
            setTimeout(() => {
                line.style.transition = 'all 0.8s ease';
                line.style.opacity = '1';
                line.style.transform = 'translateY(0)';
            }, index * 200);
        });
    }
    
    // Efecto de partículas en el hero (opcional - decorativo)
    function createParticle() {
        const hero = document.querySelector('.hero');
        if (!hero) return;
        
        const particle = document.createElement('div');
        particle.style.position = 'absolute';
        particle.style.width = '3px';
        particle.style.height = '3px';
        particle.style.background = '#E31E24';
        particle.style.borderRadius = '50%';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = '100%';
        particle.style.pointerEvents = 'none';
        particle.style.opacity = '0.6';
        
        hero.appendChild(particle);
        
        // Animar partícula hacia arriba
        let position = 100;
        const animation = setInterval(() => {
            position -= 0.5;
            particle.style.top = position + '%';
            particle.style.opacity = (100 - position) / 200;
            
            if (position <= 0) {
                clearInterval(animation);
                particle.remove();
            }
        }, 50);
    }
    
    // Crear partículas periódicamente (deshabilitado por defecto para mejor rendimiento)
    // setInterval(createParticle, 3000);
    
    // =============================================
    // LOG FINAL - INICIALIZACIÓN COMPLETA
    // =============================================
    console.log('✅ Todas las funcionalidades de Motorep cargadas correctamente');
});

// =============================================
// FUNCIONES UTILITARIAS GLOBALES
// =============================================

// Función para formatear precios
function formatPrice(price) {
    return new Intl.NumberFormat('es-CO', {
        style: 'currency',
        currency: 'COP',
        minimumFractionDigits: 0
    }).format(price);
}

// Función para generar mensaje de WhatsApp personalizado
function generateWhatsAppMessage(productName, productPrice) {
    return `Hola! Me interesa el producto: ${productName} - Precio: ${productPrice}. ¿Está disponible?`;
}

// Exponer funciones globalmente
window.MotorepUtils = {
    formatPrice,
    generateWhatsAppMessage
};