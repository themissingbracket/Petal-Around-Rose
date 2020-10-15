import React, { useEffect, useState } from 'react'
import Dice from './Dice'
import GameEngine from './GameEngine'
import './gameboard.css'

type Notification = {
  status: 'success' | 'error' | 'none'
  message?: string
}

function buildNotification(status?: 'success' | 'error', message?: string): Notification {
  return {
    status: status || 'none',
    message: message
  }
}

const GameBoard: React.FC = () => {
    const [ notification, setNotification ] = useState<Notification>(buildNotification('success', 'hello world'))
    const [dice, setDice ] = useState<number[]>(GameEngine.roll())
    const resetGame = () => {
        setDice(GameEngine.roll())
    }

    return (
        <div className='game__board'>
            <div className="notification__container">
              <div className={`notification ${notification.status}`}>
                {notification.message}
              </div>
            </div>
            <div className="dice__container">
                {
                    dice.map((roll, idx) => <Dice key={`dice__${idx}`} count={roll}/>)
                }
            </div>
            <div className="input__container">
                <label className='petal__label' htmlFor="petals"> Number of Petals around the Rose ???</label>
                <input name='petals' className='petal__input' type="number" placeholder='Number of petals around rose??' />
            </div>
            <div className="control__container">
                <div className="button submit__button">Submit</div>
                <div className="button reset__button" onClick={resetGame}>
                    Reset
                </div>
            </div>
        </div>
    )
}

export default GameBoard
