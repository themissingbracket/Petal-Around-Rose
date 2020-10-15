import React, { useEffect, useRef, useState } from 'react'
import Dice from './Dice'
import GameEngine, { GameState } from './GameEngine'
import './gameboard.css'
import gameEngine from './GameEngine'

type Notification = {
  status: 'success' | 'error' | 'none'
  message?: string
}

function buildNotification(status?: 'success' | 'error' | 'none', message?: string): Notification {
  return {
    status: status || 'none',
    message: message
  }
}

const GameBoard: React.FC = () => {
    const [ notification, setNotification ] = useState<Notification>(buildNotification())
    const [ gameState, setGameState ] = useState<GameState>(gameEngine.buildGame())
    const inputRef = useRef<HTMLInputElement>(null)
    const resetGame = () => {
        setGameState(GameEngine.buildGame())
    }
    const checkGame = () => {
      if(inputRef.current) {
        const { value } = inputRef.current
        const newState = GameEngine.checkGame(parseInt(value), gameState)
        if (newState.correctAnswers === 4 && newState.status === 'success') {
          const notification =  buildNotification('success', "Congratulations! You have worked out the secret! \n Make sure you don't tell anyone!")
          setNotification(notification)
        } else if (newState.correctAnswers < 4 && newState.incorrectAnswers % 4 === 0 && newState.status ==='error') {
          const notification =  buildNotification('error', 'Hint: The name of the game is important... Petals Around the Rose.')
          setNotification(notification)
        } else {
          const notification =  buildNotification(newState.status, newState.message)
          setNotification(notification)
        }
        setTimeout(() => {
          setNotification(buildNotification())
        }, 3000)
        setGameState(newState)
        inputRef.current.value = ''
      }
    }
    return (
        <div className='game__board'>
            <div className="notification__container">
              <div className={`notification ${notification.status}`}>
                {
                  notification.message?.split('\n').map((value, idx) =>
                  <span key={`message_${idx}`}>{value}</span>
                  )
                }
              </div>
            </div>
            <div className="dice__container">
                {
                    gameState.dice.map((roll, idx) => <Dice key={`dice__${idx}`} count={roll}/>)
                }
            </div>
            <div className="input__container">
                <label className='petal__label' htmlFor="petals"> Number of Petals around the Rose ???</label>
                <input ref={inputRef} name='petals' className='petal__input' type="number" placeholder='Number of petals around rose??' />
            </div>
            <div className="control__container">
                <div className="button submit__button" onClick={checkGame}>Submit</div>
                <div className="button reset__button" onClick={resetGame}>
                    Reset
                </div>
            </div>
        </div>
    )
}

export default GameBoard
