
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
  // saber si se está en peligro de derrota 
  var posicionBot = [];
  for (let i = 0; i < tablero.length; i++) {
    if (tablero[i] !== null && tablero[i] === TURNO.jugador1) {
      posicionBot.push(i);
    }
  }
  if (posicionBot.length ==1){
    if (posicionBot[0] == 4){
      //random entre 0 2 6 8
      var random = Math.floor(Math.random() * 4);
      if (random == 0){
        return 0;
      }else if (random == 1){
        return 2;
      }
      else if (random == 2){
        return 6;
      }
      else if (random == 3){
        return 8;
      }
    }else{
      return 4;
    }
  }
  for (let i=0; i<COMB_GANADORAS.length; i++) {
    let comb = COMB_GANADORAS[i];
    let [a,b,c] = comb;
    if (tablero[a] === TURNO.jugador2 && tablero[b] === TURNO.jugador2 && tablero[c] === null) {
      return c;
    }else if (tablero[a] === TURNO.jugador2 && tablero[b] === null && tablero[c] === TURNO.jugador2) {
      return b;
    }else if (tablero[a] === null && tablero[b] === TURNO.jugador2 && tablero[c] === TURNO.jugador2) {
      return a;
    }
  }
  for(let i = 0; i < COMB_GANADORAS.length; i++) {
    let comb = COMB_GANADORAS[i];
    let [a,b,c] = comb;
    if (tablero[a] === TURNO.jugador1 && tablero[b] === TURNO.jugador1 && tablero[c] === null) {
      return c;
    }else if (tablero[a] === TURNO.jugador1 && tablero[b] === null && tablero[c] === TURNO.jugador1) {
      return b;
    }else if (tablero[a] === null && tablero[b] === TURNO.jugador1 && tablero[c] === TURNO.jugador1) {
      return a;
    }
  }
  // hacer jugada aleatori
  for (let i=0; i<tablero.length; i++) {
    let x = i;
    x = Math.floor(Math.random() * 9); 
    if (tablero[x]=== null && x !== 0 && x !== 2 && x !== 6 && x !== 8){
      return x;
    }
  }
  // hacer jugada aleatoria en las esquinas
  for (let i=0; i<tablero.length; i++) {
    let x = i;
    x = Math.floor(Math.random() * 9); 
    if (tablero[x]=== null){
      return x;
    }
  }
}