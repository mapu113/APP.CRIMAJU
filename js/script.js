/**
 * Script principal para la funcionalidad del sitio web.
 * Contiene la lógica del menú responsivo (hamburguesa) y el carrusel de testimonios con bucle infinito.
 */

document.addEventListener('DOMContentLoaded', () => {
    // ... (Sección 1 y 2 de Menú Móvil - SIN CAMBIOS) ...
    // ====================================
    // 1. Funcionalidad del Menú Móvil (Toggle)
    // ====================================
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.menu');
    
    menuToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        menuToggle.classList.toggle('active'); 
    });

    // 2. Cerrar el menú al hacer clic en un enlace (en móvil)
    const navLinks = document.querySelectorAll('.menu a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                menuToggle.classList.remove('active');
            }
        });
    });

    // ====================================
    // 3. Funcionalidad del Carrusel de Testimonios (Bucle Infinito + Swipe)
    // ====================================
    const slider = document.getElementById('testimonios-slider'); // AHORA COINCIDE CON EL ID DEL HTML
    const items = document.querySelectorAll('.carousel-item');
    const prevButton = document.querySelector('.prev-button');
    const nextButton = document.querySelector('.next-button');
    const carouselContainer = document.querySelector('.carousel-container');
    
    if (slider && items.length > 0 && prevButton && nextButton) {
        let currentIndex = 0;
        const totalItems = items.length;
        const itemsPerView = 1; // Muestra un ítem a la vez

        let startX = 0;
        let isDragging = false;
        const threshold = 50; // Mínimo de píxeles para contar como swipe

        /**
         * Función principal para mover el carrusel
         * Desplaza el slider por múltiplos de 100% (ancho de un solo ítem).
         */
        const updateCarousel = () => {
            const offset = -currentIndex * (100 / itemsPerView); 
            slider.style.transform = `translateX(${offset}%)`;
        };

        // --- Lógica de Botones (Ahora funciona porque el HTML fue limpiado) ---
        prevButton.addEventListener('click', () => {
            if (currentIndex === 0) {
                currentIndex = totalItems - 1;
            } else {
                currentIndex -= 1;
            }
            updateCarousel();
        });

        nextButton.addEventListener('click', () => {
            const maxIndex = totalItems - 1;
            
            if (currentIndex >= maxIndex) {
                currentIndex = 0;
            } else {
                currentIndex += 1;
            }
            updateCarousel();
        });

        // --- Lógica de Swipe/Toque (Alternativa de Navegación) ---

        // Función para manejar el inicio del arrastre (ratón o dedo)
        const handleDragStart = (e) => {
            isDragging = true;
            // Usa e.touches[0].clientX para móvil o e.clientX para ratón
            startX = e.type.includes('mouse') ? e.clientX : e.touches[0].clientX;
            // Desactiva la transición para un movimiento instantáneo
            slider.style.transition = 'none'; 
        };

        // Función para manejar el movimiento del arrastre
        const handleDragMove = (e) => {
            if (!isDragging) return;
            const currentX = e.type.includes('mouse') ? e.clientX : e.touches[0].clientX;
            const diffX = startX - currentX;
            const currentTranslate = -currentIndex * 100;
            
            // Permite que el usuario arrastre la pista
            slider.style.transform = `translateX(${currentTranslate - (diffX / carouselContainer.offsetWidth) * 100}%)`;
        };

        // Función para manejar el final del arrastre (decide si desliza o no)
        const handleDragEnd = (e) => {
            if (!isDragging) return;
            isDragging = false;
            
            // Reactiva la transición para la animación final
            slider.style.transition = 'transform 0.5s ease-in-out';

            // Calcula la diferencia final (usa e.changedTouches[0].clientX para soltar en móvil)
            const endX = e.type.includes('mouse') ? e.clientX : e.changedTouches[0].clientX;
            const diffX = startX - endX;
            
            // Si arrastró más allá del umbral
            if (Math.abs(diffX) > threshold) {
                if (diffX > 0) {
                    // Swipe a la izquierda -> Botón Siguiente
                    currentIndex = (currentIndex + 1) % totalItems;
                } else {
                    // Swipe a la derecha -> Botón Anterior
                    currentIndex = (currentIndex - 1 + totalItems) % totalItems;
                }
            }
            
            // Fija la vista en el nuevo currentIndex
            updateCarousel();
        };

        // Asignar Event Listeners de Ratón
        carouselContainer.addEventListener('mousedown', handleDragStart);
        document.addEventListener('mousemove', handleDragMove);
        document.addEventListener('mouseup', handleDragEnd);
        
        // Evitar que el drag del ratón seleccione texto
        carouselContainer.addEventListener('dragstart', (e) => e.preventDefault()); 

        // Asignar Event Listeners de Toque (Móvil)
        carouselContainer.addEventListener('touchstart', handleDragStart);
        carouselContainer.addEventListener('touchmove', handleDragMove);
        carouselContainer.addEventListener('touchend', handleDragEnd);

        // Event listener para el resize de la ventana
        window.addEventListener('resize', () => {
            currentIndex = 0; 
            updateCarousel();
        });
        
        // Inicializa el carrusel
        updateCarousel();
    }
});