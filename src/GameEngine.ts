
export interface GameEngine {
    roll(diceCounts?: number): number[]
    
}

const gameEngine: GameEngine = {
    roll:(diceCounts: number = 6) => {
        const rolls: number[] = []
        for(let i=0; i<diceCounts; i++) {
            const randInt = Math.floor(Math.random() *6 ) + 1
            rolls.push(randInt)
        }
        return rolls
    }
}

export default gameEngine