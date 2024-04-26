import { ultimaOrden } from "./ultimaOrden.js";

let ultimaOrdenConocida = null; // Variable para almacenar la última orden conocida
const txtModify = document.getElementById("text-modify");

// Función para actualizar la orden si es diferente de la última conocida
const actualizarOrden = async () => {
    const { value } = await ultimaOrden();
    const pOrden = document.getElementById("orden");
    pOrden.innerText = value.accion;
    if (value.accion !== ultimaOrdenConocida) { // Verificar si la nueva orden es diferente
        ultimaOrdenConocida = value.accion; // Actualizar la última orden conocida
        ejecutarOrden(value.accion); // Ejecutar la nueva orden
    }
};

const ejecutarOrden = (orden) => {
    
   
    if (orden === "Buscar morat") {
        window.open('https://www.google.com/search?q=morat&sca_esv=5d0811d5ae0715ef&ei=wScrZuOpIafawN4Pp-yIgAU&ved=0ahUKEwijjoT7_96FAxUnLdAFHSc2AlAQ4dUDCBA&uact=5&oq=morat&gs_lp=Egxnd3Mtd2l6LXNlcnAiBW1vcmF0Mg0QLhiABBixAxhDGIoFMg0QLhiABBixAxhDGIoFMggQABiABBixAzIFEAAYgAQyCBAAGIAEGLEDMgUQABiABDIIEAAYgAQYsQMyChAAGIAEGEMYigUyCBAAGIAEGLEDMgUQABiABDIcEC4YgAQYsQMYQxiKBRiXBRjcBBjeBBjgBNgBA0iHGFCGCFivFHAEeAGQAQCYAVigAakDqgEBNbgBA8gBAPgBAZgCCaAC5wOoAhTCAgoQABiwAxjWBBhHwgIdEAAYgAQYtAIY1AMY5QIYtwMYigUY6gIYigPYAQHCAh0QLhiABBi0AhjUAxjlAhi3AxiKBRjqAhiKA9gBAcICFhAAGAMYtAIY5QIY6gIYjAMYjwHYAQLCAhYQLhgDGLQCGOUCGOoCGIwDGI8B2AECwgIREC4YgAQYsQMY0QMYgwEYxwHCAgsQABiABBixAxiDAcICChAuGIAEGEMYigXCAhAQLhiABBixAxhDGNQCGIoFwgILEC4YgAQYsQMYgwHCAg4QABiABBixAxiDARiKBcICIBAuGIAEGLEDGNEDGIMBGMcBGJcFGNwEGN4EGOAE2AEDwgINEAAYgAQYsQMYQxiKBcICCxAuGIAEGMcBGK8BwgIIEC4YgAQYsQPCAhAQLhiABBixAxhDGIMBGIoFwgILEC4YgAQYsQMY1AKYAwmIBgGQBgi6BgQIARgHugYGCAIQARgKugYGCAMQARgUkgcBOaAHrlE&sclient=gws-wiz-serp');
    }
    
    if (orden === "Visitar Google") {
        window.open('https://www.google.com/');
    }
    
    if (orden === "Abrir nueva pestaña y abrir sii") {
        window.open('http://sii.itpachuca.edu.mx/');
    }

    if (orden === "Abrir nueva pestaña y abrir netflix") {
        window.open('https://www.netflix.com/mx/');
    }
   
  
    if(orden === "instrucciones"){
        window.location.href = ('documentacion.html');    
    }
 
}



// Llamar a la función actualizarOrden() cada 2 segundos usando setInterval()
setInterval(actualizarOrden, 2000);

// Llamar a la función actualizarOrden() inicialmente
actualizarOrden();
