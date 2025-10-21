document.addEventListener('DOMContentLoaded', () => {
    // 1. Funcionalidad del Menú Móvil (Toggle)
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.menu');
    
    // Función para alternar la clase 'active' al hacer clic en el botón
    menuToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        // También se pueden añadir efectos de animación al botón
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

    // Opcional: Podrías añadir lógica de validación de formulario aquí, 
    // pero como estás usando un iframe de Google Forms, no es necesario.
});