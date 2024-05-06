import { inputBuffer } from '.'
import { store } from '../data'
import { PlayerNumber } from '../data/types'
import { mergeInputsWithState } from './input/combine'
import { calculateNextState } from './resolvers'
import { getBarSide } from './resolvers/hit'
import { checkWinner, isBallOut } from './score'

export const resolveStateAtFrame = () => {
  if (store.current.gameStatus === 'ready') {
    readyCountEvent()
  } else if (store.current.gameStatus === 'started') {
    gameEvent()
  }
}

const readyCountEvent = () => {
  const now = Date.now()
  if (now > store.current.startTime) {
    store.gameStart()
  }
  resolveState()
}

const gameEvent = () => {
  store.incrementFrameCount()
  resolveState()
  if (isBallOut(store.current.ball)) {
    pointEvent()
  }
}

const resolveState = () => {
  const snapshot = mergeInputsWithState(
    inputBuffer.getLatestInputs(store.current.frameCount),
    store.current,
    store.current.playMode
  )
  const nextSnapshot = calculateNextState(snapshot)
  store.updateBySnapshot(nextSnapshot)
}

const pointEvent = () => {
  const side = getBarSide(store.current.ball.position)
  if (!side) return
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
