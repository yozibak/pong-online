import { store } from '../data'
import { PlayerNumber } from '../data/types'
import { buffer1, buffer2 } from './commands'
import { calculateNextState } from './resolvers'
import { isBallOut } from './resolvers/hit'
import { getBarSide } from './resolvers/helpers/position'
import { checkWinner } from './resolvers/score'

export const frameEvent = () => {
  if (store.current.hasGameset) return
  importInput()
  const snapshot = store.current
  const nextSnapshot = calculateNextState(snapshot)
  store.updateBySnapshot(nextSnapshot)

  // resolveBallMovement(store.current.ball, getBarPositions(store.current.bars))

  if (isBallOut(store.current.ball)) {
    pointEvent()
  }
}

const importInput = () => {
  store.updateCommand(buffer1.command, buffer1.playerNumber)
  store.updateCommand(buffer2.command, buffer2.playerNumber)

  // import network input here //
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
