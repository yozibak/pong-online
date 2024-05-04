import { store } from '../data'
import { PlayerNumber } from '../data/types'
import { calculateNextState } from './resolvers'
import { isBallOut } from './resolvers/hit'
import { getBarSide } from './resolvers/helpers/position'
import { checkWinner } from './resolvers/score'
import { inputBuffer } from '.'

export const gamestartEvent = (pn: PlayerNumber) => {
  inputBuffer.playerNumber = pn
  store.setPlayer(pn)
}

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
  const current = inputBuffer.latestInputs
  store.updateCommand(current.localInput[1], 1)
  store.updateCommand(current.localInput[2], 2)

  if (current.networkPayload) {
    console.log(current.networkPayload)
  }
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
