document.addEventListener('DOMContentLoaded', function () {
    const OrdenText = document.getElementById('OrdenText');

    const comandos = {
        'página': () => window.open('https://www.google.com'),
        'netflix': () => window.open('https://www.netflix.com'),
        'imagen': () => window.open('https://upload.wikimedia.org/wikipedia/commons/thumb/5/58/Instituto_Tecnol%C3%B3gico_de_Pachuca._004.jpg/640px-Instituto_Tecnol%C3%B3gico_de_Pachuca._004.jpg'),
        'cambiar el tamaño': cambiarTamaño,
        'instrucciones': () => window.location.href = 'documentacion.html'
    };

    function iniciarReconocimiento() {
        recognition = new webkitSpeechRecognition();
        recognition.lang = 'es-ES';
        recognition.continuous = true; // Reconocimiento continuo

        recognition.onresult = function (event) {
            const transcript = event.results[event.results.length - 1][0].transcript; // Último resultado
            voiceResult.textContent = 'Tu dijiste: ' + transcript;
            ejecutarComando(transcript);
        };

        recognition.onerror = function (event) {
            console.error('Error en el reconocimiento de voz: ' + event.error);
        };

        recognition.start(); // Iniciar el reconocimiento de voz
    }

    function ejecutarComando(transcript) {
        transcript = transcript.toLowerCase();
        let ejecutado = false;
        
        // Buscar y ejecutar el primer comando que coincida
        for (const [comando, funcion] of Object.entries(comandos)) {
            if (transcript.includes(comando)) {
                funcion();
                enviarComandoAMockAPI(comando);
                ejecutado = true;
                break;
            }
        }
        
        if (!ejecutado) {
            mostrarError();
            enviarComandoAMockAPI(transcript); // Enviar la oración completa al MockAPI
        }
    }

    function cambiarTamaño() {
        const titulo = document.querySelector('h1');
        titulo.style.fontSize = '24px'; // Tamaño h4
        titulo.style.color = 'blue'; // Color azul
        titulo.style.fontWeight = 'bold'; // Negritas
    }

    function mostrarError(mensaje = 'Comando no identificado. Vuelve a intentarlo.') {
        voiceResult.textContent = mensaje;
    }

    function obtenerUltimaOrden() {
        const url = "https://660219919d7276a75552a2c5.mockapi.io/registro";

        fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Error en la solicitud HTTP, estado ' + response.status);
            }
            return response.json();
        })
        .then(data => {
            if (data && data.length > 0) {
                const ultimaOrden = data[data.length - 1].comando; // Revisado el nombre del campo
                console.log('Última orden obtenida:', ultimaOrden);
                
                // Actualizar texto en el index.html
                OrdenText.textContent = ultimaOrden;

                // Llamar a la función pruebamockapi para enviar la última orden a la MockAPI
                pruebamockapi(ultimaOrden);
            } else {
                console.log('No hay órdenes registradas.');
                OrdenText.textContent = 'No hay órdenes registradas.';
            }
        })
        .catch(error => {
            console.error('Error al obtener órdenes:', error);
            OrdenText.textContent = 'Error al obtener órdenes.';
        });
    }

    // Obtener y mostrar la última orden al cargar la página
    obtenerUltimaOrden();
});
