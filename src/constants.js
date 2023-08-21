

export const TURNO = {
    jugador1: '❌',
    jugador2: '🤖'
  }
  
const COMB_GANADORAS = [
    [0,1,2], // fila 1
    [3,4,5], // fila 2
    [6,7,8], // fila 3
    [0,3,6], // columna 1
    [1,4,7], // columna 2
    [2,5,8], // columna 3
    [0,4,8], // diagonal 1
    [2,4,6], // diagonal 2
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
  const posicionesNulas = obtenerPosicionesNulas(tablero);
  var movimientoCPU = posicionesNulas[Math.floor(Math.random() * posicionesNulas.length)];
  return movimientoCPU
}

const obtenerPosicionesNulas = (tablero) => {
  const posicionesNulas = [];
  tablero.forEach((valor, index) => {
    if (valor === null) {
      posicionesNulas.push(index);
    }
  });
  return posicionesNulas;
};
