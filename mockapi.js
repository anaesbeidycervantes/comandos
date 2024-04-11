document.addEventListener('DOMContentLoaded', function () {
    const voiceResult = document.getElementById('voiceResult');
    let openedWindow;
    let recognition;

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

    function ejecutarComando(comando) {
        comando = comando.toLowerCase().trim();
        switch (comando) {
            case 'quiero abrir una página':
                openedWindow = window.open('https://www.google.com');
                break;
            case 've a netflix':
                openedWindow = window.open('https://www.netflix.com');
                break;
            case 'abre la imagen por favor':
                openedWindow = window.open('https://upload.wikimedia.org/wikipedia/commons/thumb/5/58/Instituto_Tecnol%C3%B3gico_de_Pachuca._004.jpg/640px-Instituto_Tecnol%C3%B3gico_de_Pachuca._004.jpg');
                break;
            case 'quiero cambiar el tamaño':
                cambiarTamaño();
                break;
            case 'quiero ver las instrucciones':
                window.location.href = 'documentacion.html';
                break;
            default:    
                mostrarError();
                break;
        }
        
        enviarComandoAMockAPI(comando);
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

    function enviarComandoAMockAPI(comando) {
        const url = "https://660219919d7276a75552a2c5.mockapi.io/registro";
        const data = { comando: comando };

        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then(data => console.log('Comando enviado al MockAPI:', data))
        .catch(error => console.error('Error al enviar comando al MockAPI:', error));
    }

    if ('webkitSpeechRecognition' in window) {
        iniciarReconocimiento();
    } else {
        alert('El reconocimiento de voz no es compatible con tu navegador.');
    }
});
