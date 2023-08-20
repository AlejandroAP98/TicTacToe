
export const Cuadro = ({ children, isSelected, index , updateTablero}) => {
    //turno del jugador
    const className = `cuadro ${isSelected ? 'is-selected' : ''}`
    //actualizar el tablero 
    const handleClick = () => {
      updateTablero(index)
    }  
    return (
      //cuando se haga click en el cuadro se actualiza el tablero
      <div onClick={handleClick} className={className}>
        {children}
      </div>  
    )
  }

  export default Cuadro
