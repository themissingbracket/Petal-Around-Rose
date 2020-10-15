
export type GameState = {
  dice: number[]
  status: 'success' | 'error' | 'none'
  message: string
  correctAnswers: number
  incorrectAnswers: number

}

export interface GameEngine {
    buildGame( previousState?: GameState ):GameState
    checkGame(guessedValue:number, state: GameState): GameState
}

const DICE_TYPE = 6

function calculatePetals(dice: number[]): number {
  return dice.reduce((acc, value) => {
    if(value === 3 ) acc = acc + 2
    else if(value === 5) acc = acc + 4
    return acc
  }, 0)
}

const gameEngine: GameEngine = {
    buildGame(previousState?:GameState): GameState{
      const dice:number[] = []
      for(let i=0;i<6; i++) {
        dice.push(Math.floor(Math.random() * 6)+1)
      }
      const correctAnswers = previousState?.correctAnswers || 0
      const incorrectAnswers = previousState?.incorrectAnswers || 0
      return {
        dice,
        correctAnswers,
        incorrectAnswers,
        status: 'none',
        message: ''
      }
    },
    checkGame(guessedValue: number, state : GameState): GameState{
      const petals = calculatePetals(state.dice)
      const updatedState = this.buildGame(state)
      if( guessedValue % 2 === 0) {
        const isGuessCorrect = guessedValue === petals
        updatedState.status =  isGuessCorrect ? 'success' : 'error'
        updatedState[isGuessCorrect ? 'correctAnswers' : 'incorrectAnswers'] = updatedState[isGuessCorrect ? 'correctAnswers' : 'incorrectAnswers'] + 1
        updatedState.message =  isGuessCorrect ? 'Well done! You guessed it!' : `No sorry, it;s ${petals} not ${guessedValue}.`
      } else {
        updatedState.status = 'error'
        updatedState.message = `No sorry, it's ${petals} not ${guessedValue}. The score is always even.`
        updatedState.incorrectAnswers = updatedState.incorrectAnswers + 1
      }
      return updatedState
    }

}

export default gameEngine
