import { inputBuffer } from '.'
import { store } from '../data'
import { PlayerNumber } from '../data/types'
import { combineState } from './input/combine'
import { calculateNextState } from './resolvers'
import { getBarSide } from './resolvers/helpers/position'
import { isBallOut } from './resolvers/hit'
import { checkWinner } from './resolvers/score'

export const gamestartEvent = (pn: PlayerNumber) => {
  inputBuffer.playerNumber = pn
  store.setPlayer(pn)
}

export const frameEvent = () => {
  if (store.current.hasGameset) return
  const snapshot = combineState(inputBuffer.latestInputs, store.current)
  const nextSnapshot = calculateNextState(snapshot)
  store.updateBySnapshot(nextSnapshot)

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
