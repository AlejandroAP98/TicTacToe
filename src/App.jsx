import { useEffect, useState } from "react" 
import confetti from "canvas-confetti"
import Cuadro from "./components/Cuadro"
import { TURNO, validarGanador, comprobarEmpate, jugarCPU} from "./constants.js"



function App() {
  const [tablero, setTablero] = useState (() => {
    const tableroGuardado = window.localStorage.getItem('tablero')
    return tableroGuardado ? JSON.parse(tableroGuardado) : Array(9).fill(null)
  })
  const [turno, setTurno] = useState(() => {
    const turnoGuardado = window.localStorage.getItem('turno')
    return turnoGuardado ? JSON.parse(turnoGuardado) : TURNO.jugador1
  })
  const [ganador, setGanador] = useState(null)
  const movimientos = tablero.filter(Boolean).length
  const [modo, setModo] = useState(1)
  const [historial, setHistorial] = useState([])
  const [estadisticas, setEstadisticas] = useState([])
  
  //funcion para actualizar el tablero
  const updateTablero = (index) => {
    //si el cuadro ya esta seleccionado o si ya hay un ganador
    if(tablero[index] || ganador) return
    //actualizar el tablero
    const newTablero = [...tablero]
    newTablero[index] = turno
    setTablero(newTablero)
    //cambiar el turno
    const nuevoTurno = turno === TURNO.jugador1 ? TURNO.jugador2 : TURNO.jugador1
    setTurno(nuevoTurno)
    //validar si hay un ganador
    const nuevoGanador = validarGanador(newTablero)
    //guardar el estado del tablero y el turno
    window.localStorage.setItem('tablero', JSON.stringify(newTablero))
    window.localStorage.setItem('turno', JSON.stringify(nuevoTurno))
    if(nuevoGanador) {
      confetti()
      setGanador(nuevoGanador)
      historial.push(nuevoGanador)
      setHistorial(historial)
    } else if (comprobarEmpate(newTablero)) {
      historial.push("EMPATE 🏳️")
      setGanador(false)
    }
  }

  const REINICIAR = () => {
    setTablero(Array(9).fill(null))
    setGanador(null)
    setTurno(TURNO.jugador1)
    window.localStorage.removeItem('tablero')
    window.localStorage.removeItem('turno')
  }

  const handleModoJuego = (e) => {
    const modo = parseInt(e.target.value, 10)
    if (modo === 2) {
      TURNO.jugador2 = '🔵'
    }else {
      TURNO.jugador2 = '🤖'
    }
    setModo(modo)
    REINICIAR()
  }

  useEffect(() => {
    //funcion para llamar a la cpu cuando sea su turno
    if (modo === 1 && turno === TURNO.jugador2 && !ganador && movimientos < 9){
      updateTablero(jugarCPU({tablero}))
    }
  }, [turno])

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
        <select className="modoJuego" onChange={handleModoJuego}>
          <option value={1}>VS CPU</option>
          <option value={2}>COOP</option>
        </select>
      </header>
      <section className="turno">
        <h2>TURNO</h2>
        {turno === TURNO.jugador1 && (
          <Cuadro isSelected = {true}>{TURNO.jugador1}</Cuadro>
        )}
        {turno === TURNO.jugador2 && (
          <Cuadro isSelected = {true}>{TURNO.jugador2}</Cuadro>
        )}
      </section>
      <section className="juego">
        {
          tablero.map((cuadro, index) => (
            <Cuadro key={index} updateTablero={updateTablero} index={index}>
              {cuadro}
            </Cuadro>
          ))
        }
      </section>
      <section>
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
        }}>REINICIO</button>
      </footer>
      </div>
      <div>
      </div>
    </main>   
  )
}

export default App
