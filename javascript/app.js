var btnEmpezar = document.getElementById('btnEmpezar');
var btnCeleste = document.getElementById('celeste');
var btnVioleta = document.getElementById('violeta');
var btnNaranja = document.getElementById('naranja');
var btnVerde = document.getElementById('verde');
const ULTIMO_NIVEL = 10;

class Juego {
    constructor () {
        this.inicializar = this.inicializar.bind(this);
        this.inicializar();
        this.generarSecuencia();
        setTimeout(this.siguienteNivel, 2000);
    }

    inicializar () {
        this.elegirColor = this.elegirColor.bind(this);
        this.siguienteNivel = this.siguienteNivel.bind(this);
        this.toggleBtnEmpezar();
        this.nivel = 1;
        this.colores = {
            btnCeleste,
            btnVioleta,
            btnNaranja,
            btnVerde
        }
    }

    toggleBtnEmpezar () {
        if(btnEmpezar.classList.contains('hide'))
            btnEmpezar.classList.remove('hide');
        else
            btnEmpezar.classList.add('hide');
    }

    generarSecuencia () {
        this.secuencia = new Array(ULTIMO_NIVEL).fill(0).map(n => Math.floor(Math.random() * 4));
    }

    siguienteNivel () {
        this.subNivel = 0;
        this.iluminarSecuencia();
        this.agregarEventosBoton();
    }

    iluminarSecuencia () {
        for (let i = 0; i < this.nivel; i++) {
            const btnColor = this.obtenerBoton(this.secuencia[i]);
            setTimeout(() =>{
                this.iluminarBoton(btnColor)}, 1000 * i);
        }
    }

    obtenerBoton (numero) {
        switch (numero) {
            case 0:
                return 'btnCeleste'
            case 1:
                return 'btnVioleta'
            case 2:
                return 'btnNaranja'
            case 3:
                return 'btnVerde'

        }
    }

    iluminarBoton (btnColor) {
        this.colores[btnColor].classList.add('light');
        setTimeout(() => this.apagarBoton(btnColor), 350);
    }

    apagarBoton (btnColor) {
        this.colores[btnColor].classList.remove('light');
    }

    agregarEventosBoton () {
        this.colores.btnCeleste.addEventListener('click', this.elegirColor);
        this.colores.btnVerde.addEventListener('click', this.elegirColor);
        this.colores.btnVioleta.addEventListener('click', this.elegirColor);
        this.colores.btnNaranja.addEventListener('click', this.elegirColor);
    }

    eliminarEventosBoton () {
        this.colores.btnCeleste.removeEventListener('click', this.elegirColor);
        this.colores.btnVerde.removeEventListener('click', this.elegirColor);
        this.colores.btnVioleta.removeEventListener('click', this.elegirColor);
        this.colores.btnNaranja.removeEventListener('click', this.elegirColor);
    }

    elegirColor (event) {
        const numColor = parseInt(event.target.dataset.indexNumber);
        this.iluminarBoton(this.obtenerBoton(numColor));
        if (numColor === this.secuencia[this.subNivel]){
            this.subNivel++;
            if(this.subNivel === this.nivel){
                this.nivel++;
                this.eliminarEventosBoton();
                if(this.nivel === (ULTIMO_NIVEL + 1))
                    this.ganoElJuego();
                else{
                    swal ('Simon Dice', `Pasaste el Nivel: ${this.nivel - 1}`, 'success')
                    setTimeout(this.siguienteNivel, 2500);
                }
            }
        }
        else{
            this.perdioElJuego();
        }
    }

    ganoElJuego () {
        swal ('Simon Dice', 'Felicitaciones, Ganaste el juego!', 'success')
        .then(this.inicializar);
    }

    perdioElJuego () {
        swal ('Simon Dice', 'Lo siento, Has perdido', 'error')
        .then(() =>{
            this.eliminarEventosBoton();
            this.inicializar();
        })
    }
}

function empezarJuego(){
    swal('Simon Dice', 'El juego va a iniciar', 'info');
    window.juego = new Juego();
}