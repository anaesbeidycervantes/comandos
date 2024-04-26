document.addEventListener('DOMContentLoaded', function () {
    const OrdenText = document.getElementById('OrdenText');
    const ws = new WebSocket('ws://localhost:8080');

    function interpretarComando(comando) {
        return comando; // Retorna el comando tal como se recibió
    }

    ws.addEventListener('message', function(event) {
        const comandoRecibido = event.data;
        const OrdenText = document.getElementById('OrdenText');
        
        // Actualizar texto en el index.html
        OrdenText.textContent = interpretarComando(comandoRecibido);
    });

    // Obtener y mostrar la última orden al cargar la página
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
                const ultimaOrden = data[data.length - 1].comando;
                console.log('Última orden obtenida:', ultimaOrden);
                
                // Actualizar texto en el index.html
                OrdenText.textContent = ultimaOrden;

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
