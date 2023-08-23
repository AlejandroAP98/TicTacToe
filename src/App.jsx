import { useEffect, useState } from "react" 
import confetti from "canvas-confetti"
import Cuadro from "./components/Cuadro"
import { TURNO, validarGanador, comprobarEmpate, jugarCPU, textMode} from "./constants.js"



function App() {
  //tablero
  const [tablero, setTablero] = useState (() => {
    const tableroGuardado = window.localStorage.getItem('tablero')
    return tableroGuardado ? JSON.parse(tableroGuardado) : Array(9).fill(null)
  })
  //tablero ultima partida
  const [tablero2, setTablero2] = useState (() => {
    const tableroGuardado = window.localStorage.getItem('tablero2')
    return tableroGuardado ? JSON.parse(tableroGuardado) : Array(9).fill(null)
  })
  //turno
  const [turno, setTurno] = useState(() => {
    const turnoGuardado = window.localStorage.getItem('turno')
    return turnoGuardado ? JSON.parse(turnoGuardado) : TURNO.jugador1
  })
  //ganador
  const [ganador, setGanador] = useState(null)
  //movimientos
  const movimientos = tablero.filter(Boolean).length
  //modo de juego
  const [modo, setModo] = useState(() => {
    const modoGuardado = window.localStorage.getItem('modo')
    return modoGuardado ? JSON.parse(modoGuardado) : 1
  })
  //historial de partidas
  const [historial, setHistorial] = useState(() => {
    const historialGuardado = window.localStorage.getItem('historial')
    return historialGuardado ? JSON.parse(historialGuardado) : []
  })
  //funcion para actualizar el tablero
  const updateTablero = (index) => {
    //si el cuadro ya esta seleccionado o si ya hay un ganador
    if(tablero[index] || ganador) return
    //actualizar el tablero
    const newTablero = [...tablero]
    newTablero[index] = turno
    setTablero(newTablero)

    const newTablero2 = [...tablero2]
    
    //cambiar el turno
    const nuevoTurno = turno === TURNO.jugador1 ? TURNO.jugador2 : TURNO.jugador1
    setTurno(nuevoTurno)
    
    //validar si hay un ganador
    const nuevoGanador = validarGanador(newTablero)
    //saber el modo de juego seleccionado por el usuario y el historial, almacenarlo en una variable para no borrar al recargar la pagina
    const nuevoModo = modo
    setModo(nuevoModo)
    const nuevoHistorial = historial
    setHistorial(nuevoHistorial)

    //si hay un ganador o un empate, reiniciar el tablero
    if(nuevoGanador) {
      confetti()
      setGanador(nuevoGanador)
      historial.push(nuevoGanador)
      setHistorial(historial)
      setTablero(Array(9).fill(null)) 
      setTablero2(newTablero)
    } else if (comprobarEmpate(newTablero)) {
      historial.push("EMPATE 🏳️")
      setGanador(false)
      setTablero(Array(9).fill(null)) 
      setTablero2(newTablero)
    }

    //guardar el estado del tablero, modo, historial y turno en el local storage
    window.localStorage.setItem('modo', JSON.stringify(nuevoModo))
    window.localStorage.setItem('tablero', JSON.stringify(newTablero))
    window.localStorage.setItem('turno', JSON.stringify(nuevoTurno))
    window.localStorage.setItem('historial', JSON.stringify(nuevoHistorial))
    window.localStorage.setItem('tablero2', JSON.stringify(newTablero2))
  }

  //funcion para reiniciar el tablero
  const REINICIAR = () => {
    setTablero(Array(9).fill(null))
    setGanador(null)
    setTurno(TURNO.jugador1)
    window.localStorage.removeItem('tablero')
    window.localStorage.removeItem('turno')
  }

  //funcion para cambiar el modo de juego
  const handleModoJuego = () => {
    if (modo === 1) {
      setModo(2)
    }else {
      setModo(1)
    }
    REINICIAR()
  }

  //funcion para llamar a la cpu cuando sea su turno
  useEffect(() => {
    //funcion para llamar a la cpu cuando sea su turno
    if (modo === 1 && turno === TURNO.jugador2 && !ganador && movimientos < 9){
      updateTablero(jugarCPU({tablero}))
    }
  }, [turno])
  
 //funcion para reiniciar el tablero cuando se cierre la ventana de ganador 
  const handleVentana = () => {
    REINICIAR()
  }

  // render del componente App 
  return (
    <main>
      <div className="historial">
        <h2>HISTORIAL</h2>
        {
          historial.map((ganador, index) => (
            <div key={index} className="historial-item">
              <span>{"JUEGO "+ (index + 1)}</span>
              <span>{" "+ ganador}</span>
            </div>
          ))
        }
      </div>
      <div className="tablero">
      <header>
        <h1>
          TIC TAC TOE
        </h1>
        <h2>MODO</h2>
        <button className="modoJuego" onClick={handleModoJuego}>
          <option value={modo}>{textMode(modo)}</option>
        </button>
      </header>
      <div className="turno">
        <h2>TURNO</h2>
        {turno === TURNO.jugador1 && (
          <Cuadro isSelected = {true}>{TURNO.jugador1}</Cuadro>
        )}
        {(turno === TURNO.jugador2) && (
          <Cuadro isSelected = {true}>{TURNO.jugador2}</Cuadro>
        )}
      </div>
      <section className="juego">
        {
          tablero.map((cuadro, index) => (
            <Cuadro key={index} updateTablero={updateTablero} index={index}>
              {cuadro}
            </Cuadro>
          ))
        }
      </section>
      <section onClick={handleVentana}>
        {
          ganador !== null && (
            <div className="ganador">
              <header>
              {
                ganador === false ? <h2>EMPATE</h2> : <h2>GANADOR</h2>
              }
              {
                ganador && <h3>{ganador}</h3>
              }
              </header>
            </div>
          )
        }
      </section>
      <footer>
        <button onClick={() => {
          setTablero(Array(9).fill(null))
          setGanador(null)
          setTurno(TURNO.jugador1)
          window.localStorage.removeItem('tablero')
          window.localStorage.removeItem('turno')
          window.localStorage.removeItem('historial')
          window.localStorage.removeItem('tablero2')
        }}>REINICIO</button>
      </footer>
      </div>
      <div className="tablero2">
        <h2>ÚLTIMA JUEGO</h2>
        <div className="ultimoTablero">
          {
            tablero2.map((cuadro, index) => (
              <Cuadro key={index} updateTablero={updateTablero} index={index}>
                {cuadro}
              </Cuadro>
            ))
          }
        </div>
      </div>
    </main>   
  )
}

export default App
