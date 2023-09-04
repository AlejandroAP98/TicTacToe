
export const TURNO = {
    jugador1: '❌',
    jugador2: '🔵'
  }
  
const COMB_GANADORAS = [
    [0,1,2], // fila 1
    [0,4,8], // diagonal 1
    [0,3,6], // columna 1
    [1,4,7], // columna 2
    [2,5,8], // columna 3
    [2,4,6], // diagonal 2
    [3,4,5], // fila 2
    [6,7,8], // fila 3
  ]
  
export const comprobarEmpate = (tableroCheck) => {
  //validar si hay un empate en el tablero actual
  return tableroCheck.every(cuadro => cuadro !== null)
}

export const validarGanador = (tableroCheck) => {
  //validar si hay un ganador en el tablero actual usando las combinaciones ganadoras
  for (const comb of COMB_GANADORAS) {
    const [a,b,c] = comb
    if(tableroCheck[a] && tableroCheck[a] === tableroCheck[b] && tableroCheck[a] === tableroCheck[c]) {
      return tableroCheck[a]
    }
  }
  return null
}

export  const jugarCPU = ({tablero}) => {
  var movimientoCPU = movimiento(tablero);
  return movimientoCPU
}


//funcion para cambiar el modo de juego y el texto del boton
export const textMode = (modo) => {
  if (modo === 1) {
    return "VS CPU"
  }else {
    return "COOP"
  }
} 

const movimiento = (tablero) => {
  var posicion = [];
  for (let i = 0; i < tablero.length - 2; i++) {
    if (tablero[i] !== null && tablero[i] === TURNO.jugador1) {
      posicion.push(i);
    }
  }
  if (posicion.length >= 2) {
    for (let i = 0; i < COMB_GANADORAS.length; i++) {
      var comb = COMB_GANADORAS[i];
      var [a,b,c] = comb;
      //bloquear jugada ganadora del jugador 1
      if (tablero[a] === TURNO.jugador1 && tablero[b] === TURNO.jugador1 && tablero[c] === null) {
        return c;
      }else if (tablero[a] === TURNO.jugador1 && tablero[b] === null && tablero[c] === TURNO.jugador1) {
        return b;
      }else if (tablero[a] === null && tablero[b] === TURNO.jugador1 && tablero[c] === TURNO.jugador1) {
        return a;
      }
    }
  }else if (posicion.length === 1) {
    if (TURNO.jugador1 === tablero[4]) {
      return 0;
    }
    else{
      return 4;
    }
    /////// FALTA HACER EL MOVIMIENTO CUANDO NO ESTÁ EN PELIGRO DE DERROTA/
    ////////////////////////////////
    //  
    //
  }
  
}

 