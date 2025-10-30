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
    // 3. Funcionalidad del Carrusel de Testimonios (Bucle Infinito - 1 Ítem)
    // ====================================
    // BUSCA EL ID 'testimonios-slider'
    const slider = document.getElementById('testimonios-slider');
    // BUSCA LOS ÍTEMS DENTRO CON CLASE 'carousel-item'
    const items = document.querySelectorAll('.carousel-item');
    const prevButton = document.querySelector('.prev-button');
    const nextButton = document.querySelector('.next-button');
    
    // Solo inicializa si todos los elementos necesarios existen
    if (slider && items.length > 0 && prevButton && nextButton) {
        let currentIndex = 0;
        // ITEMS POR VISTA FORZADO A 1
        const itemsPerView = 1;
        const totalItems = items.length;

        // Función principal para mover el carrusel
        const updateCarousel = () => {
            // El desplazamiento es siempre 100% por ítem (100 / 1)
            const offset = -currentIndex * (100 / itemsPerView); 
            slider.style.transform = `translateX(${offset}%)`;
        };

        // Event listener para el botón Anterior (Bucle circular)
        prevButton.addEventListener('click', () => {
            if (currentIndex === 0) {
                // Si es el primero (índice 0), va al último.
                currentIndex = totalItems - 1;
            } else {
                // Si no, retrocede uno.
                currentIndex -= 1;
            }
            updateCarousel();
        });

        // Event listener para el botón Siguiente (Bucle circular)
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

        // Event listener para el resize de la ventana (solo actualiza la vista inicial)
        window.addEventListener('resize', () => {
             // Reinicia el índice al reescalar para evitar un desplazamiento extraño
            currentIndex = 0; 
            updateCarousel();
        });
        
        // Inicializa el carrusel
        updateCarousel();
    }
});