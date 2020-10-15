import React, { useEffect, useState } from 'react'
import Dice from './Dice'
import GameEngine from './GameEngine'
import './gameboard.css'

const GameBoard: React.FC = () => {
    const [dice, setDice ] = useState<number[]>(GameEngine.roll())
    const resetGame = () => {
        setDice(GameEngine.roll())
    }

    return (
        <div className='game__board'>
            <div className="dice__container">
                {
                    dice.map((roll, idx) => <Dice key={`dice__${idx}`} count={roll}/>)
                }
            </div>
            <div className="input__container">
                <label htmlFor="petals"> Number of Petals around the Rose ???</label>
                <input name='petals' type="text" placeholder='Number of petals around rose??' />
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
