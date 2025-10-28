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
    // 3. Funcionalidad del Carrusel de Testimonios (Bucle Infinito)
    // ====================================
    const slider = document.getElementById('testimonios-slider');
    const items = document.querySelectorAll('.carousel-item');
    const prevButton = document.querySelector('.prev-button');
    const nextButton = document.querySelector('.next-button');
    
    if (slider && items.length > 0) {
        let currentIndex = 0;
        let itemsPerView = window.innerWidth >= 768 ? 2 : 1; // 2 en desktop, 1 en móvil

        // Función para actualizar itemsPerView basada en el tamaño de la ventana
        const updateItemsPerView = () => {
            itemsPerView = window.innerWidth >= 768 ? 2 : 1;
            updateCarousel(); // Llama a la actualización para recalcular el desplazamiento
        };
        
        // Función principal para mover el carrusel
        const updateCarousel = () => {
            // La fórmula de desplazamiento sigue siendo la misma
            const offset = -currentIndex * (100 / itemsPerView); 
            slider.style.transform = `translateX(${offset}%)`;

        };

        // Event listener para el botón Anterior (Loop al final)
        prevButton.addEventListener('click', () => {
            if (currentIndex === 0) {
                // Si estamos en la primera tarjeta (o vista), vamos a la última vista posible.
                currentIndex = items.length - itemsPerView;
            } else {
                // Si no, retrocedemos normalmente.
                currentIndex = Math.max(0, currentIndex - itemsPerView);
            }
            updateCarousel();
        });

        // Event listener para el botón Siguiente (Loop al inicio)
        nextButton.addEventListener('click', () => {
            const maxIndex = items.length - itemsPerView;
            
            if (currentIndex >= maxIndex) {
                // Si estamos en la última tarjeta (o vista), volvemos a la primera.
                currentIndex = 0;
            } else {
                // Si no, avanzamos normalmente.
                currentIndex = Math.min(maxIndex, currentIndex + itemsPerView);
            }
            updateCarousel();
        });

        // Event listener para el resize de la ventana
        window.addEventListener('resize', () => {
             // Reinicia el índice al reescalar para evitar un desplazamiento extraño
            currentIndex = 0; 
            updateItemsPerView();
        });
        
        // Inicializa el carrusel
        updateItemsPerView();
    }
});