import React from 'react'
import './dice.css'
export interface DiceConfig {
    count: number //1 | 2 | 3 | 4 | 5 | 6
}


const getDiceImageURL = (diceCount: number): string => {
    let faceValue: string = `${diceCount}`
    switch (diceCount) {
        case 1:
            faceValue = 'one'
            break;
        case 2:
            faceValue = 'two'
            break;
        case 3 :
            faceValue = 'three'
            break;
        case 4 :
            faceValue = 'four'
            break;
        case 5 :
            faceValue = 'five'
            break;
        case 6 : 
            faceValue = 'six'
            break;
    }

    return `https://game-icons.net/icons/ffffff/000000/1x1/delapouite/dice-six-faces-${faceValue}.svg`
}

const Dice:React.FC<DiceConfig> = ({ count }:DiceConfig) => {
    
    return (
        <div className='dice__face'>
            <img src={getDiceImageURL(count)}/>
        </div>
    )
}

export default Dice
