import { useState } from "react" 
import confetti from "canvas-confetti"
import Cuadro from "./components/Cuadro"
import { TURNO, validarGanador, comprobarEmpate} from "./constants.js"


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
      console.log('Ganador', nuevoGanador)
    } else if (comprobarEmpate(newTablero)) {
      setGanador(false)
    }
  }

  return (
    <main className="tablero">
      <header>
        <h1>
          TIC TAC TOE
        </h1>
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
          window.localStorage.removeItem('tablero')
          window.localStorage.removeItem('turno')
        }}>REINICIAR</button>
      </footer>
    </main>   
  )
}

export default App
