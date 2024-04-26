// Función para obtener los datos de acciones realizadas
export function obtenerJson() {
    // La función trabaja con promesas para asegurar que los datos se obtengan antes de continuar
    return new Promise((resolve, reject) => {
        // Se envía la solicitud HTTP a MockAPI usando el método GET
        fetch('https://660219919d7276a75552a2c5.mockapi.io/registro', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
            // Operación asincrónica en la que se espera la respuesta de MockApi
            .then(response => {
                if (!response.ok) {
                    throw new Error('Error al obtener el recurso');
                }
                return response.json();
            })
            // Operación asincrónica en la que si la información se obtiene correctamente se devuelve a la consola y se resuelve la promesa
            .then(data => {
                resolve(data);
            })
            // Operación asincrónica en la que si la información no se obtiene correctamente se devuelve un error en la consola y se rechaza la promesa
            .catch(error => {
                console.error('Error:', error);
                reject(error);
            });
    });
}
