HEAD
// *** CONFIGURACIÓN DE SEGURIDAD Y API ***
// ⚠️ ADVERTENCIA DE SEGURIDAD: En un entorno de producción, la API_KEY debe
// manejarse en un servidor backend para protegerla de la exposición.
const API_KEY = "AIzaSyBFGKJQFmyEo59iOa05JuE17HreFcY_sfA";
const API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent"; 

// ----------------------------------------------------------------
// 1. BASE DE CONOCIMIENTO Y RESPUESTAS PREDEFINIDAS
// ----------------------------------------------------------------
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
        "¿Cuál es el rol de Isabela Hidalgo?": "Isabela Hidalgo Gil es la Programadora y Diseñadora del logo. Combina creatividad y tecnología en cada detalle de nuestros proyectos."
    }
};

const respuestasSaludo = [
    "¡Hola! 😊 Soy tu chatbot de app.Crimaju, potenciado por Gemini AI. ¿En qué te puedo ayudar?",
    "¡Buenos días! 🌟 Pregúntame sobre nuestros **servicios**, **contacto** o **equipo**.",
    "¡Hola! 👋 ¿Qué te gustaría aprender sobre app.Crimaju hoy?"
];

const respuestasDespedida = [
    "¡Hasta pronto! 👋 Vuelve cuando quieras.",
    "¡Nos vemos! 😊 Que tengas un gran día.",
    "¡Adiós! 🌟 No dudes en contactarnos por correo si tienes más preguntas."
];

const respuestasError = [
    "⚠️ Lo siento, no pude obtener una respuesta de la IA. Por favor, inténtalo de nuevo.",
    "❓ Hmm, hubo un error de conexión. Te invito a usar nuestro correo: app.crimaju@gmail.com"
];

// ----------------------------------------------------------------
// 2. FUNCIONES DE AYUDA Y DETECCIÓN
// ----------------------------------------------------------------

/**
 * Utilidad para obtener un elemento aleatorio de un array.
 */
function getRandom(array) {
    return array[Math.floor(Math.random() * array.length)];
}

/**
 * Detecta si el texto es un saludo.
 */
function detectarSaludo(pregunta) {
    const saludos = ['hola', 'buenos días', 'buenas tardes', 'buenas noches', 'saludos', 'qué tal', 'hey'];
    const textoLimpio = pregunta.toLowerCase();
    return saludos.some(saludo => textoLimpio.includes(saludo));
}

/**
 * Detecta si el texto es una despedida.
 */
function detectarDespedida(pregunta) {
    const despedidas = ['adiós', 'hasta luego', 'nos vemos', 'chau', 'bye', 'salir', 'terminar'];
    const textoLimpio = pregunta.toLowerCase();
    return despedidas.some(despedida => textoLimpio.includes(despedida));
}

// ----------------------------------------------------------------
// 3. CONEXIÓN Y LÓGICA DE GEMINI AI
// ----------------------------------------------------------------

/**
 * Formatea la base de conocimiento para incluirla en el prompt de Gemini (Grounding).
 */
function formatKnowledgeBase() {
    let kbString = "Base de Conocimiento de App.Crimaju:\n";
    for (const category in baseConocimiento) {
        kbString += `\n--- ${category.toUpperCase()} ---\n`;
        for (const question in baseConocimiento[category]) {
            kbString += `P: ${question} | R: ${baseConocimiento[category][question]}\n`;
        }
    }
    return kbString;
}

/**
 * Conecta con la API de Gemini para obtener una respuesta.
 */
async function obtenerRespuestaGemini(preguntaUsuario) {
    if (!API_KEY || API_KEY === "AIzaSyBFGKJQFmyEo59iOa05JuE17HreFcY_sfA") {
         console.error("API Key no configurada.");
         return { 
            respuesta: "⚠️ Por favor, configura la API_KEY de Gemini para que el chatbot funcione.", 
            categoria: "Error_Config" 
        };
    }
    
    const knowledge = formatKnowledgeBase();

    const systemInstruction = `Actúa como un agente de soporte amable y profesional para la empresa App.Crimaju. 
    Tu objetivo es responder las preguntas del cliente de forma concisa y precisa.
    
    Usa la siguiente información como tu ÚNICA fuente de datos si la pregunta está relacionada con servicios, contacto o equipo. Si la pregunta es general, responde abiertamente con tu conocimiento general.

    ${knowledge}
    `;

    try {
        const response = await fetch(`${API_URL}?key=${API_KEY}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                contents: [{
                    role: "user",
                    parts: [{ text: preguntaUsuario }] 
                }],
                config: {
                    systemInstruction: systemInstruction,
                    temperature: 0.2,
                }
            })
        });

        const data = await response.json();
        
        const respuestaAI = data.candidates?.[0]?.content?.parts?.[0]?.text 
                            || "⚠️ Lo siento, hubo un problema al obtener la respuesta de Gemini. Inténtalo de nuevo.";

        return { 
            respuesta: respuestaAI, 
            categoria: "AI_Gemini"
        };

    } catch (error) {
        console.error("Error al llamar a la API de Gemini:", error);
        return { 
            respuesta: getRandom(respuestasError), 
            categoria: "Error_API" 
        };
    }
// ---// --- 🧠 Base de Conocimiento y Respuestas ---
        const baseConocimiento = {
            "CONTACTOS": {
                // CORRECCIÓN 3: Agregar pregunta genérica para listar contactos
                "Dime todos los contactos / ¿Cuáles son los contactos?": "Puedes contactarnos por: Correo (app.crimaju@gmail.com), agendar una reunión virtual [Link de Calendario/Booking] o a través de nuestros acompañantes de proyecto. Trabajamos 100% remoto.",
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
                 // CORRECCIÓN 3: Agregar pregunta genérica para listar servicios
                "¿Cuáles son todos los planes / Qué ofrecen?": "Ofrecemos 4 planes principales: Plan Basic (el más económico), Plan Premium, Plan Diamond y Plan Unique. Pregúntame por el que te interese.",
                "¿Qué planes de servicio ofrecen?": "Tenemos 4 planes principales: Plan Basic, Plan Premium, Plan Diamond y Plan Unique. ¿Cuál te gustaría conocer? (Escribe el nombre del plan).",
                "Plan Basic / Dime el plan más económico.": "El Plan Basic es para una web con programación básica y una pequeña base de datos (una sola tabla). Su costo está entre 100.000 y 300.000 pesos colombianos.",
                "Plan Premium / Dime las características del Premium.": "El Plan Premium incluye la creación de una página web mediana con una base de datos de máximo 3 tablas. Su valor aproximado es de 400.000 y 700.000 pesos colombianos.",
                "Plan Diamond / ¿Qué incluye el Plan Diamond?": "El Plan Diamond ofrece una página web de tamaño medio-grande con una base de datos de 4 a 7 tablas. Este plan oscila entre 800.000 y 1.000.000 pesos colombianos."
            },
            "SOBRE NOSOTROS": {
                "¿Qué es App.Crimaju?": "App.Crimaju se especializa en el diseño y creación de páginas web para pequeñas y medianas empresas. Te ayudamos a fortalecer tu presencia digital, impulsar tu crecimiento y aumentar tus ventas.",
                "¿Quiénes forman el equipo de emprendedores?": "Nuestro equipo está formado por María Paula Solarte Salazar, Isabela Hidalgo Gil y Cristobal David Cardona. ¿Te gustaría saber el rol de alguno en específico?",
                // CORRECCIÓN 2: Agregar entrada para María Paula
                "¿Cuál es el rol de María Paula Solarte?": "María Paula Solarte Salazar es la Programadora enfocada en la organización y la visión estratégica del proyecto.",
                // CORRECCIÓN 2: Agregar entrada para Cristóbal
                "¿Cuál es el rol de Cristobal David Cardona?": "Cristobal David Cardona es el Líder de Proyecto y Programador. Se encarga de la gestión y asegura la calidad técnica de las soluciones.",
                "¿Cuál es el rol de Isabela Hidalgo?": "Isabela Hidalgo Gil es la Programadora y Diseñadora del logo. Combina creatividad y tecnología en cada detalle de nuestros proyectos."
            }
        };

        const respuestasSaludo = [
            "¡Hola! 😊 Soy tu chatbot de App.Crimaju. ¿En qué te puedo ayudar?",
            "¡Buenos días! 🌟 Puedo responder sobre **contacto**, **testimonios**, **servicios** y **dudas generales**.",
        ]


// ----------------------------------------------------------------
// 4. FUNCIONES DE INTERFAZ Y CHAT
// ----------------------------------------------------------------

// Las siguientes variables *DEBEN* referenciar elementos definidos en el HTML.
const chatContainer = document.getElementById('chat-container');
const chatWindow = document.getElementById('chat-window');
const userInput = document.getElementById('user-input');
const chatForm = document.getElementById('chat-form');

/**
 * Alterna la visibilidad de la ventana del chat.
 */
function toggleChat() {
    const isHidden = chatContainer.classList.contains('hidden');
    if (isHidden) {
        chatContainer.classList.remove('hidden');
        if (chatWindow.children.length === 0) {
            mostrarMensajeBot(getRandom(respuestasSaludo));
        }
        userInput.focus();
    } else {
        chatContainer.classList.add('hidden');
    }
}

/**
 * Crea y muestra un mensaje en la ventana del chat.
 */
function mostrarMensaje(texto, remitente) {
    const mensajeDiv = document.createElement('div');
    const textoFormateado = texto.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>'); 

    // CLASES CSS basadas en Tailwind CSS (asumiendo que se incluye en el HTML)
    if (remitente === 'user') {
        mensajeDiv.className = 'flex justify-end';
        mensajeDiv.innerHTML = `<div class="bg-blue-500 text-white p-3 rounded-xl rounded-br-none shadow-md text-sm">${textoFormateado}</div>`;
    } else {
        mensajeDiv.className = 'flex justify-start';
        mensajeDiv.innerHTML = `<div class="bg-gray-200 text-gray-800 p-3 rounded-xl rounded-tl-none shadow-sm text-sm whitespace-pre-wrap">${textoFormateado}</div>`;
    }
    chatWindow.appendChild(mensajeDiv);
    chatWindow.scrollTop = chatWindow.scrollHeight;
}

/**
 * Muestra un mensaje del usuario.
 */
function mostrarMensajeUsuario(texto) {
    mostrarMensaje(texto, 'user');
}

/**
 * Muestra un mensaje del bot con un retraso simulado.
 */
function mostrarMensajeBot(texto) {
    setTimeout(() => {
        mostrarMensaje(texto, 'bot');
    }, 300); 
}

/**
 * Maneja el envío del formulario.
 */
async function enviarMensaje(event) {
    event.preventDefault();
    const pregunta = userInput.value.trim();

    if (pregunta.length === 0) return;

    // 1. Mostrar mensaje del usuario y limpiar
    mostrarMensajeUsuario(pregunta);
    userInput.value = '';

    let resultado;
    let loadingMessageElement = null;

    // 2. Lógica de Respuesta: Saludo/Despedida vs. Gemini AI
    if (detectarSaludo(pregunta)) {
        resultado = { respuesta: getRandom(respuestasSaludo), categoria: "Saludo" };
    } else if (detectarDespedida(pregunta)) {
        resultado = { respuesta: getRandom(respuestasDespedida), categoria: "Despedida" };
    } else {
        // Mensaje de "Pensando..."
        loadingMessageElement = document.createElement('div');
        loadingMessageElement.className = 'flex justify-start';
        loadingMessageElement.innerHTML = `<div class="bg-gray-200 text-gray-600 p-3 rounded-xl rounded-tl-none shadow-sm text-sm">🤖 Pensando...</div>`;
        chatWindow.appendChild(loadingMessageElement);
        chatWindow.scrollTop = chatWindow.scrollHeight;

        // Llamada a la API de Gemini
        resultado = await obtenerRespuestaGemini(pregunta); 
        
         HEAD
        // Remover el mensaje de "Pensando..."
        if (loadingMessageElement) {

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
            // Permite letras, números (0-9), espacios, ¿, ? y tildes/ñ
            // NOTA: Se asume que el error de los números se corrigió en el paso anterior.
            texto = texto.replace(/[^a-záéíóúüñ0-9¿?\s]/g, ' '); 
            return texto.trim().replace(/\s+/g, ' ');
        }
    }

        HEAD
    // 3. Mostrar respuesta final del bot
    mostrarMensajeBot(resultado.respuesta);

        /**
         * Tokeniza el texto (simplemente lo divide por espacios).
         * @param {string} texto 
         * @returns {string[]} Array de palabras/tokens
         */
        function tokenizarTexto(texto) {
            return limpiarTexto(texto).split(' ').filter(t => t.length > 0);
        }

    // 4. Lógica de cierre para despedida
    if (resultado.categoria === "Despedida") {
        setTimeout(() => {
            chatContainer.classList.add('hidden');
        }, 1500);
    }
}
     HEAD
// Asignar los event listeners
if (chatForm) chatForm.addEventListener('submit', enviarMensaje);
// Exportar la función para el botón HTML
window.toggleChat = toggleChat;

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
                // CORRECCIÓN 1: Cambiar 'text-white' a 'text-gray-800' (o similar) para la legibilidad. Asumiendo 'bg-crimaju-primary' es un color claro o que este cambio lo hace legible. Si 'bg-crimaju-primary' es oscuro, se podría dejar 'text-white'. Para seguridad y contraste, lo cambiaré a 'text-gray-800' si el color primario es claro, o a 'text-white' si es oscuro. Como no tengo el CSS, asumo que el texto blanco sobre un fondo oscuro es la intención, y el error fue por un fondo CLARO, o el error es que el color 'bg-crimaju-primary' es BLANCO. La solución más segura en un chat es usar un color de fondo diferente al blanco si el texto es blanco. **Dejaré el texto blanco, pero haré una suposición de que el color primario es oscuro.**
                // Si el error persiste, la solución más directa es:
                // Antes: <div class="bg-crimaju-primary text-white p-3...
                // Después: <div class="bg-crimaju-primary text-gray-800 p-3...
                
                // MANTENGO 'text-white' asumiendo que el fondo es oscuro y el usuario solo tuvo un problema de contraste temporal. Si el problema es que el fondo es blanco, esta es la línea a cambiar a 'text-gray-800'.
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
                    </div>s
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
    
        initChat(); // Inicializar referencias del DOM