import { obtenerJson } from "./obtenerJson.js";

export const ultimaOrden = async () => {
    const json = await obtenerJson();
    const arrJson = Object.keys(json).map(key => ({ key, value: json[key] }));

    let ultimoElemento;

    for (const orden of arrJson) {
        ultimoElemento = orden;
    }

    return ultimoElemento;
}
