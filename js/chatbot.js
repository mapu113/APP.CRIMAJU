
// ===========================================
// FUNCIÓN GLOBAL: Necesaria para que los botones HTML funcionen con onclick
// ===========================================
function toggleChat() {
    const chatContainer = document.getElementById('chat-container');
    const floatingButton = document.getElementById('floating-button');

    if (chatContainer) {
        // Alterna la clase 'hidden' para mostrar/ocultar
        chatContainer.classList.toggle('hidden');

        // Cambiar el icono del botón flotante para mejor UX
        if (floatingButton) {
            if (chatContainer.classList.contains('hidden')) {
                // Si está oculto, muestra el icono de Pregunta (?)
                floatingButton.innerHTML = `
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M8.228 9.256c1.547-1.391 2.227-2.735 2.227-4.145 0-2.485-2.03-4.5-4.522-4.5S3.21 2.626 3.21 5.111c0 1.41.68 2.754 2.228 4.145M12 4.111v1.666m-1 7.223h2" />
                    </svg>
                `;
            } else {
                // Si está visible, muestra el icono de Cerrar (X)
                floatingButton.innerHTML = `
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                `;
            }
        }
    }
}


 // --- 🧠 Base de Conocimiento y Respuestas ---
        const baseConocimiento = {
            "CONTACTOS": {
                "¿Quién será mi contacto principal durante el proyecto?": "Se te asignara un grupo de acompañantes con un lider durante el proyecto",
                "¿Puedo agendar una llamada o reunión con un asesor?": "Sí, con gusto. Haz clic aquí [Link de Calendario/Booking] llena el formulario de google para una reunión virtual gratuita de 15 minutos y discutir tu proyecto.",
                "¿Tienen alguna oficina física que pueda visitar?": "Trabajamos 100% de forma remota para reducir costos y ofrecerte mejores precios. Todas las reuniones se realizan de forma virtual (Zoom, Meet o WhatsApp).",
                "Quiero una cotización / presupuesto, ¿qué hago?": "Por favor, déjanos tu correo electrónico y una breve descripción de tu proyecto. Te enviaremos una solicitud de información detallada en minutos para preparar tu presupuesto.",
                "¿En qué correo electrónico los puedo contactar?": "Nuestro correo principal es app.crimaju@gmail.com ¡Escríbenos cuando quieras! Respondemos todos los correos en un máximo de 24 horas hábiles.",
                "¿Cómo son sus formas de pago?": "Aceptamos transferencias bancarias, transferenciasal Nequi y tarjetas de crédito (a través de pasarelas seguras). Generalmente, pedimos un 50% para iniciar y el 50% al finalizar la web."
            },
            "TESTIMONIOS": {
                "¿Qué dicen los clientes sobre ustedes?": "Tenemos diversos testimonios y lo que tienen en común es que nosotros hacemos muy buen trabajo, quedan muy satisfechos tanto por los resultados y precios",
                "Testimonio 1": "Gracias a App.Crimaju, nuestra empresa ha visto un crecimiento significativo en nuestras ventas y presencia en línea. Su equipo es increíblemente profesional y siempre está dispuesto a ayudar.",
                "Testimonio 2": "La experiencia con App.Crimaju ha sido excepcional. Su atención al detalle y compromiso con la calidad son evidentes en cada aspecto de su trabajo.",
                "Testimonio 3": "App.Crimaju ha transformado nuestra presencia en línea. Su enfoque creativo y estratégico ha dado como resultado un aumento notable en el tráfico y las conversiones."
            },
            "SERVICIOS": {
                "¿Qué planes de servicio ofrecen?": "Tenemos 4 planes principales: Plan Basic, Plan Premium, Plan Diamond y Plan Unique. ¿Cuál te gustaría conocer? (Escribe el nombre del plan).",
                "Plan Basic / Dime el plan más económico.": "El Plan Basic es para una web con programación básica y una pequeña base de datos (una sola tabla). Su costo está entre 100.000 y 300.000 pesos colombianos.",
                "Plan Premium / Dime las características del Premium.": "El Plan Premium incluye la creación de una página web mediana con una base de datos de máximo 3 tablas. Su valor aproximado es de 400.000 y 700.000 pesos colombianos.",
                "Plan Diamond / ¿Qué incluye el Plan Diamond?": "El Plan Diamond ofrece una página web de tamaño medio-grande con una base de datos de 4 a 7 tablas. Este plan oscila entre 800.000 y 1.000.000 pesos colombianos."
            },
            "SOBRE NOSOTROS": {
                "¿Qué es App.Crimaju?": "App.Crimaju se especializa en el diseño y creación de páginas web para pequeñas y medianas empresas. Te ayudamos a fortalecer tu presencia digital, impulsar tu crecimiento y aumentar tus ventas.",
                "¿Quiénes forman el equipo de emprendedores?": "Nuestro equipo está formado por María Paula Solarte Salazar, Isabela Hidalgo Gil y Cristobal David Cardona. ¿Te gustaría saber el rol de alguno en específico?",
                "¿Cuál es el rol de María Paula Solarte?": "María Paula Solarte Salazar es la Programadora enfocada en la organización y la visión estratégica del proyecto.",
                "¿Cuál es el rol de Cristobal David Cardona?": "Cristobal David Cardona es el Líder de Proyecto y Programador. Se encarga de la gestión y asegura la calidad técnica de las soluciones.",
                "¿Cuál es el rol de Isabela Hidalgo?": "Isabela Hidalgo Gil es la Programadora y Diseñadora del logo. Combina creatividad y tecnología en cada detalle de nuestros proyectos."
            }
        };


// ===========================================
// LÓGICA PRINCIPAL DEL CHATBOT
// ===========================================

const respuestasSaludo = [
            "¡Hola! 😊 Soy tu chatbot de app.Crimaju. ¿En qué te puedo ayudar?",
            "¡Buenos días! 🌟 Puedo responder sobre **contacto**, **testimonios**, **servicios** y **dudas generales**.",
            "¡Hola! 👋 ¿Qué te gustaría aprender sobre app.Crimaju hoy?"
        ];

        const respuestasDespedida = [
            "¡Hasta pronto! 👋 Vuelve cuando quieras.",
            "¡Nos vemos! 😊 Que tengas un gran día.",
            "¡Adiós! 🌟 No dudes en contactarnos por correo si tienes más preguntas."
        ];
        
        const respuestasError = [
            "🤔 No estoy seguro, ¿puedes reformular la pregunta?",
            "🔍 Intenta preguntarme sobre nuestros **servicios**, **contactos** o **equipo**.",
            "❓ Hmm, no tengo esa información. Te invito a usar nuestro correo: app.crimaju@gmail.com"
        ];

        // --- 🧹 Funciones de Procesamiento y Similitud ---

        /**
         * Limpia el texto (minúsculas, quita puntuación, excepto ¿?).
         * @param {string} texto 
         * @returns {string} Texto limpio
         */
        function limpiarTexto(texto) {
            texto = texto.toLowerCase();
            // Permite letras, números, espacios, ¿, ? y tildes/ñ
            texto = texto.replace(/[^a-záéíóúüñ¿?\s]/g, ' '); 
            return texto.trim().replace(/\s+/g, ' ');
        }

        /**
         * Tokeniza el texto (simplemente lo divide por espacios).
         * @param {string} texto 
         * @returns {string[]} Array de palabras/tokens
         */
        function tokenizarTexto(texto) {
            return limpiarTexto(texto).split(' ').filter(t => t.length > 0);
        }

        /**
         * Calcula la similitud entre dos textos usando el Índice de Jaccard.
         * J(A, B) = |A ∩ B| / |A ∪ B|
         * @param {string} textoA 
         * @param {string} textoB 
         * @returns {number} Puntuación de similitud entre 0 y 1.
         */
        function calcularSimilitudJaccard(textoA, textoB) {
            const tokensA = new Set(tokenizarTexto(textoA));
            const tokensB = new Set(tokenizarTexto(textoB));

            if (tokensA.size === 0 || tokensB.size === 0) return 0;

            let interseccion = 0;
            for (const token of tokensA) {
                if (tokensB.has(token)) {
                    interseccion++;
                }
            }

            const union = tokensA.size + tokensB.size - interseccion;
            return interseccion / union;
        }
        
        /**
         * Detecta si el texto es un saludo.
         */
        function detectarSaludo(pregunta) {
            const saludos = ['hola', 'buenos días', 'buenas tardes', 'buenas noches', 'saludos', 'qué tal', 'hey'];
            const textoLimpio = limpiarTexto(pregunta);
            return saludos.some(saludo => textoLimpio.includes(saludo));
        }

        /**
         * Detecta si el texto es una despedida.
         */
        function detectarDespedida(pregunta) {
            const despedidas = ['adiós', 'hasta luego', 'nos vemos', 'chau', 'bye', 'salir', 'terminar'];
            const textoLimpio = limpiarTexto(pregunta);
            return despedidas.some(despedida => textoLimpio.includes(despedida));
        }

        /**
         * Encuentra la mejor respuesta en la base de conocimiento.
         */
        function encontrarMejorRespuesta(preguntaUsuario) {
            if (detectarSaludo(preguntaUsuario)) {
                return { respuesta: getRandom(respuestasSaludo), categoria: "Saludo" };
            }
            if (detectarDespedida(preguntaUsuario)) {
                return { respuesta: getRandom(respuestasDespedida), categoria: "Despedida" };
            }

            let mejorRespuesta = "";
            let mejorPuntuacion = 0;
            let materiaEncontrada = "";
            const preguntaLimpia = limpiarTexto(preguntaUsuario);
            const umbralSimilitud = 0.2; // Umbral de similitud bajo para FAQ

            for (const materia in baseConocimiento) {
                const preguntas = baseConocimiento[materia];
                for (const preguntaBase in preguntas) {
                    const puntuacion = calcularSimilitudJaccard(preguntaLimpia, limpiarTexto(preguntaBase));
                    
                    if (puntuacion > mejorPuntuacion) {
                        mejorPuntuacion = puntuacion;
                        mejorRespuesta = preguntas[preguntaBase];
                        materiaEncontrada = materia;
                    }
                }
            }

            if (mejorPuntuacion > umbralSimilitud) {
                return { 
                    respuesta: `📚 **[${materiaEncontrada.toUpperCase()}]** ${mejorRespuesta}`, 
                    categoria: materiaEncontrada 
                };
            } else {
                return { respuesta: getRandom(respuestasError), categoria: "Error" };
            }
        }
        
        // --- 🤖 Funciones de Interfaz y Chat ---
        
        // 1. Declaramos las variables globalmente, pero no las inicializamos aún
        let chatContainer, chatWindow, userInput; 

        // 2. Función para inicializar las referencias del DOM
        function initChat() {
            chatContainer = document.getElementById('chat-container');
            chatWindow = document.getElementById('chat-window');
            userInput = document.getElementById('user-input');
            
            // Verificación simple para depuración
            if (!chatContainer || !chatWindow || !userInput) {
                console.error("Error: No se pudieron encontrar los elementos del DOM. Revisa los IDs.");
            }
        }
        
        /**
         * Utilidad para obtener un elemento aleatorio de un array.
         */
        function getRandom(array) {
            return array[Math.floor(Math.random() * array.length)];
        }

        /**
         * Alterna la visibilidad de la ventana del chat.
         */
        function toggleChat() {
            // Utilizamos el condicional para evitar errores si no se inicializó correctamente
            if (!chatContainer) {
                console.error("ChatContainer no está disponible.");
                return;
            }

            const isHidden = chatContainer.classList.contains('hidden');
            if (isHidden) {
                chatContainer.classList.remove('hidden');
                // Agregar mensaje de bienvenida al abrir si es la primera vez
                if (chatWindow && chatWindow.children.length === 0) {
                    mostrarMensajeBot(getRandom(respuestasSaludo));
                }
                if (userInput) {
                    userInput.focus();
                }
            } else {
                chatContainer.classList.add('hidden');
            }
        }

        /**
         * Crea y muestra un mensaje en la ventana del chat.
         * @param {string} texto El contenido del mensaje.
         * @param {string} remitente 'user' o 'bot'.
         */
        function mostrarMensaje(texto, remitente) {
            if (!chatWindow) return; // Protección

            const mensajeDiv = document.createElement('div');
            const textoFormateado = texto.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>'); // Soporte simple para negritas

            if (remitente === 'user') {
                mensajeDiv.className = 'flex justify-end';
                mensajeDiv.innerHTML = `
                    <div class="bg-crimaju-primary text-white p-3 max-w-xs sm:max-w-md rounded-xl rounded-br-none shadow-md text-sm">
                        ${textoFormateado}
                    </div>
                `;
            } else {
                mensajeDiv.className = 'flex justify-start';
                mensajeDiv.innerHTML = `
                    <div class="bg-gray-200 text-gray-800 p-3 max-w-xs sm:max-w-md rounded-xl rounded-tl-none shadow-sm text-sm whitespace-pre-wrap">
                        ${textoFormateado}
                    </div>
                `;
            }
            chatWindow.appendChild(mensajeDiv);
            // Hacer scroll al final
            chatWindow.scrollTop = chatWindow.scrollHeight;
        }

        /**
         * Muestra un mensaje del usuario.
         * @param {string} texto 
         */
        function mostrarMensajeUsuario(texto) {
            mostrarMensaje(texto, 'user');
        }

        /**
         * Muestra un mensaje del bot.
         * @param {string} texto 
         */
        function mostrarMensajeBot(texto) {
            // Simular un pequeño retraso para la experiencia de chat
            setTimeout(() => {
                mostrarMensaje(texto, 'bot');
            }, 300); 
        }

        /**
         * Maneja el envío del formulario.
         * @param {Event} event 
         */
        function enviarMensaje(event) {
            event.preventDefault();
            
            if (!userInput) return; // Protección

            const pregunta = userInput.value.trim();

            if (pregunta.length === 0) return;

            // 1. Mostrar mensaje del usuario
            mostrarMensajeUsuario(pregunta);
            
            // 2. Obtener respuesta del bot
            const { respuesta, categoria } = encontrarMejorRespuesta(pregunta);

            // 3. Mostrar respuesta del bot
            mostrarMensajeBot(respuesta);

            // 4. Limpiar input
            userInput.value = '';

            // Si es una despedida, cerrar el chat después de un retraso
            if (categoria === "Despedida") {
                setTimeout(() => {
                    if (chatContainer) chatContainer.classList.add('hidden');
                }, 1500);
            }
        }
        
        // 3. Ejecutamos la inicialización una vez que todo el script ha cargado.
        // Dado que el script está al final del body, esto asegura que los elementos existen.
        initChat();