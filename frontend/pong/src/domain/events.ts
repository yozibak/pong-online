import { store } from '../data'
import { buffer1, buffer2 } from './commands'
import { getBarPositions, isBallOut, resolveBallMovement } from './resolvers/ball'
import { resolveBarPosition } from './resolvers'
import { getBarSide } from './resolvers/helpers/position'
import { PlayerNumber } from '../data/types'
import { checkWinner } from './resolvers/score'

export const frameEvent = () => {
  if (store.current.hasGameset) return
  // command
  store.updateCommand(buffer1.command, buffer1.playerNumber)
  store.updateCommand(buffer2.command, buffer2.playerNumber)

  // maybe update ball position here (invoked by netwrok)

  // resolve state
  resolveBarPosition(1)
  resolveBarPosition(2)
  resolveBallMovement(store.current.ball, getBarPositions(store.current.playerState))

  if (isBallOut(store.current.ball)) {
    pointEvent()  
  }
}

const pointEvent = () => {
  const side = getBarSide(store.current.ball.position)
  const playerNumber: PlayerNumber = side === 'left' ? 2 : 1
  store.incrementScore(playerNumber)

  const winner = checkWinner(store.current.score)
  if (!winner) {
    restartEvent()
  } else {
    gameSetEvent()
  }
}


const restartEvent = () => {
  store.resetBall()
}

const gameSetEvent = () => {
  store.gameset()
}