document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const errorMessage = document.getElementById('error-message');

    loginForm.addEventListener('submit', (event) => {
        event.preventDefault(); // Detiene el envío del formulario
        
        errorMessage.textContent = ''; // Limpia mensajes anteriores
        errorMessage.style.display = 'none';

        const email = emailInput.value.trim();
        const password = passwordInput.value.trim();

        // VALIDACIÓN BÁSICA DEL LADO DEL CLIENTE
        if (email === "" || password === "") {
            errorMessage.textContent = 'Por favor, introduce tu correo y contraseña.';
            errorMessage.style.display = 'block';
            return;
        }

        if (!validateEmail(email)) {
            errorMessage.textContent = 'El formato del correo electrónico no es válido.';
            errorMessage.style.display = 'block';
            return;
        }

        // Simulación de credenciales válidas (solo para demostración)
        if (email === "test@crimaju.com" && password === "123456") {
            alert("¡Inicio de sesión exitoso! Redireccionando a la cuenta de usuario...");
            // Aquí iría window.location.href = "dashboard.html"; en un proyecto real
        } else {
            errorMessage.textContent = 'Correo o contraseña incorrectos. Inténtalo de nuevo.';
            errorMessage.style.display = 'block';
        }
    });

    // Función simple para validar formato de email
    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(String(email).toLowerCase());
    }
});