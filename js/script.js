/**
 * Script principal para la funcionalidad del sitio web.
 * Contiene la lógica del menú responsivo (hamburguesa) y el carrusel de testimonios con bucle infinito.
 */

document.addEventListener('DOMContentLoaded', () => {
    // ====================================
    // 1. Funcionalidad del Menú Móvil (Toggle)
    // ====================================
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.menu');
    
    // Función para alternar la clase 'active' al hacer clic en el botón
    menuToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        menuToggle.classList.toggle('active'); 
    });

    // 2. Cerrar el menú al hacer clic en un enlace (en móvil)
    const navLinks = document.querySelectorAll('.menu a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            // Solo si el menú está activo, lo cerramos
            if (navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                menuToggle.classList.remove('active');
            }
        });
    });

    // ====================================
    // 3. Funcionalidad del Carrusel de Testimonios (Bucle Infinito + Swipe/Arrastre)
    // ====================================
    const slider = document.getElementById('testimonios-slider'); // Ahora busca el ID correcto
    const items = document.querySelectorAll('.carousel-item'); // Ahora busca las tarjetas con la clase correcta
    const prevButton = document.querySelector('.prev-button');
    const nextButton = document.querySelector('.next-button');
    const carouselContainer = document.querySelector('.carousel-container');
    
    // Solo inicializa si todos los elementos necesarios existen
    if (slider && items.length > 0 && prevButton && nextButton) {
        let currentIndex = 0;
        const totalItems = items.length;
        const itemsPerView = 1;
        
        // Variables para la funcionalidad de Swipe/Arrastre
        let startX = 0;
        let isDragging = false;
        const threshold = 50; // Mínimo de píxeles para contar como swipe
        
        // Función principal para mover el carrusel
        const updateCarousel = () => {
            // El desplazamiento es siempre 100% por ítem (100 / 1)
            const offset = -currentIndex * (100 / itemsPerView); 
            slider.style.transform = `translateX(${offset}%)`;
        };

        // --- Lógica de Botones (Bucle circular) ---
        prevButton.addEventListener('click', () => {
            if (currentIndex === 0) {
                // Si es el primero, va al último.
                currentIndex = totalItems - 1;
            } else {
                // Si no, retrocede uno.
                currentIndex -= 1;
            }
            updateCarousel();
        });

        nextButton.addEventListener('click', () => {
            const maxIndex = totalItems - 1;
            
            if (currentIndex >= maxIndex) {
                // Si es el último, vuelve al primero (índice 0).
                currentIndex = 0;
            } else {
                // Si no, avanza uno.
                currentIndex += 1;
            }
            updateCarousel();
        });

        // --- Lógica de Swipe/Arrastre (Alternativa de Navegación) ---

        // Inicia el arrastre
        const handleDragStart = (e) => {
            isDragging = true;
            // Detecta la posición inicial (para móvil o ratón)
            startX = e.type.includes('mouse') ? e.clientX : e.touches[0].clientX;
            // Desactiva la transición para que el movimiento sea instantáneo al arrastrar
            slider.style.transition = 'none'; 
        };

        // Mueve la pista
        const handleDragMove = (e) => {
            if (!isDragging) return;
            const currentX = e.type.includes('mouse') ? e.clientX : e.touches[0].clientX;
            const diffX = startX - currentX;
            const currentTranslate = -currentIndex * 100;
            
            // Calcula la nueva posición de arrastre
            slider.style.transform = `translateX(${currentTranslate - (diffX / carouselContainer.offsetWidth) * 100}%)`;
        };

        // Finaliza el arrastre y decide si desliza
        const handleDragEnd = (e) => {
            if (!isDragging) return;
            isDragging = false;
            
            // Reactiva la transición CSS
            slider.style.transition = 'transform 0.5s ease-in-out';

            // Detecta la posición final
            const endX = e.type.includes('mouse') ? e.clientX : e.changedTouches[0].clientX;
            const diffX = startX - endX;
            
            // Si la distancia arrastrada es suficiente
            if (Math.abs(diffX) > threshold) {
                if (diffX > 0) {
                    // Swipe a la izquierda -> Siguiente
                    currentIndex = (currentIndex + 1) % totalItems;
                } else {
                    // Swipe a la derecha -> Anterior
                    currentIndex = (currentIndex - 1 + totalItems) % totalItems;
                }
            }
            
            // Fija la vista
            updateCarousel();
        };

        // Event Listeners de Ratón (Desktop)
        carouselContainer.addEventListener('mousedown', handleDragStart);
        document.addEventListener('mousemove', handleDragMove);
        document.addEventListener('mouseup', handleDragEnd);
        carouselContainer.addEventListener('dragstart', (e) => e.preventDefault()); 

        // Event Listeners de Toque (Móvil)
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