import Die from "../components/Die"
import { useState, useEffect ,useRef } from "react"
import {nanoid} from "nanoid"
import Confetti from 'react-confetti'
import {useWindowSize} from "react-use"

export default function App()
{
  const [diceState, setDiceState] = useState(() => generateAllNewDice())
  const buttonRef = useRef(null)
  const { width, height } = useWindowSize()

  const gameWon = diceState.every(die => die.isHeld) && 
  diceState.every(die => die.value === diceState[0].value)

  useEffect(() => {
    if(gameWon)
    {
      buttonRef.current.focus()
    }
  }, [gameWon])
 
  function roll()
  {
    if(gameWon)
    {
      setDiceState(generateAllNewDice())
    }
    else{
    setDiceState(prevDice => prevDice.map(item =>{
      return !item.isHeld? {...item, value : Math.ceil(Math.random() * 6) } : item
    }))
  }}

  function toggledie(id)
  {
    setDiceState(prevDice => prevDice.map(item =>{
      return item.id === id? {...item, isHeld : !item.isHeld} : item
    }))
  }

  function generateAllNewDice()
  {
    return new Array(10)
    .fill(0)
    .map(() => ({
      value :  5/*Math.ceil(Math.random() * 6)*/,
      isHeld : false,
      id : nanoid(),
    })  )
    

  }
  console.log(diceState)
 
  const dice = diceState.map(die => {return (<Die
    value={die.value} 
    key={die.id} 
    isHeld = {die.isHeld}
    toggledie = {() => toggledie(die.id)}
  />)} )
  
  return(
    <main>
      {gameWon && <Confetti width={width} height={height}/>}
      <div aria-live="polite" className="sr-only" >
        {gameWon && <p>Congratulations! You won! Press new game to start again.</p>}
      </div>
      <h1 className="title">Tenzies</h1>
      <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
      <div className="dice-container">
        {dice}
      </div>
      <button id="roll-button" onClick={roll} ref={buttonRef}>{gameWon? "New game ": "roll"}</button>
    </main>
  )
}