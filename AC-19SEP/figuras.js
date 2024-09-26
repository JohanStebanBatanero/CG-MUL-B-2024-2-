class Linea {
    constructor(x1, y1, x2, y2) {
        this.x1 = x1;
        this.y1 = y1;
        this.x2 = x2;
        this.y2 = y2;
    }

    dibujar(ctx) {
        ctx.beginPath();
        ctx.moveTo(this.x1, this.y1);
        ctx.lineTo(this.x2, this.y2);
        ctx.stroke();
    }
}

class Cuadrado {
    constructor(puntos) {
        this.puntos = puntos;
        this.lineas = this.generarLineas();
    }

    generarLineas() {
        const lineas = [];
        for (let i = 0; i < this.puntos.length; i++) {
            const inicio = this.puntos[i];
            const fin = this.puntos[(i + 1) % this.puntos.length];
            lineas.push(new Linea(inicio.x, inicio.y, fin.x, fin.y));
        }
        return lineas;
    }

    dibujar(ctx) {
        this.lineas.forEach(linea => linea.dibujar(ctx));
    }
}

class Cubo {
    constructor(puntosFrente, puntosTraseros) {
        this.frente = new Cuadrado(puntosFrente);
        this.trasero = new Cuadrado(puntosTraseros);
        this.conectarLineas = this.generarConectarLineas();
    }

    generarConectarLineas() {
        const lineas = [];
        for (let i = 0; i < this.frente.puntos.length; i++) {
            const f = this.frente.puntos[i];
            const t = this.trasero.puntos[i];
            lineas.push(new Linea(f.x, f.y, t.x, t.y));
        }
        return lineas;
    }

    dibujar(ctx) {
        this.frente.dibujar(ctx);
        this.trasero.dibujar(ctx);
        this.conectarLineas.forEach(linea => linea.dibujar(ctx));
    }
}

function dibujarProyecciones() {
    // Configuración de los contextos
    const canvasPerspectiva = document.getElementById('perspectiva');
    const ctxPerspectiva = canvasPerspectiva.getContext('2d');
    
    const canvasOrtografica = document.getElementById('ortografica');
    const ctxOrtografica = canvasOrtografica.getContext('2d');
    
    const canvasIsometrica = document.getElementById('isometrica');
    const ctxIsometrica = canvasIsometrica.getContext('2d');

    // Limpiar los canvas
    ctxPerspectiva.clearRect(0, 0, canvasPerspectiva.width, canvasPerspectiva.height);
    ctxOrtografica.clearRect(0, 0, canvasOrtografica.width, canvasOrtografica.height);
    ctxIsometrica.clearRect(0, 0, canvasIsometrica.width, canvasIsometrica.height);

    // Proyección en perspectiva (la cara trasera es más pequeña)
    const cuboPerspectiva = new Cubo(
        [{x: 40, y: 40}, {x: 110, y: 40}, {x: 110, y: 110}, {x: 40, y: 110}], // frente
        [{x: 70, y: 70}, {x: 120, y: 70}, {x: 120, y: 120}, {x: 70, y: 120}]  // trasero más pequeño
    );
    cuboPerspectiva.dibujar(ctxPerspectiva);

     // Proyección en perspectiva
     const cuboOrtografica = new Cubo(
        [{x: 40, y: 40}, {x: 110, y: 40}, {x: 110, y: 110}, {x: 40, y: 110}], // frente
        [{x: 70, y: 70}, {x: 140, y: 70}, {x: 140, y: 140}, {x: 70, y: 140}]  // trasero
    );
    cuboOrtografica.dibujar(ctxOrtografica);

    // Proyección isométrica
    const cuboIsometrica = new Cubo(
        [{x: 60, y: 40}, {x: 90, y: 30}, {x: 120, y: 40}, {x: 90, y: 50}], // frente
        [{x: 60, y: 70}, {x: 90, y: 60}, {x: 120, y: 70}, {x: 90, y: 80}]  // trasero
    );
    cuboIsometrica.dibujar(ctxIsometrica);
}

// Ejecutar la función cuando la ventana se cargue
window.onload = dibujarProyecciones;