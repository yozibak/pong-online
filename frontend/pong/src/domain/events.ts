import { inputBuffer } from '.'
import { store } from '../data'
import { PlayerNumber } from '../data/types'
import { mergeInputsWithState } from './input/combine'
import { calculateNextState } from './resolvers'
import { getBarSide } from './resolvers/helpers/position'
import { checkWinner, isBallOut } from './resolvers/score'

export const onlineMatchEvent = (startTime?: number) => {
  store.setStartTime(startTime)
  return store.current.startTime
}

export const gamestartEvent = (pn: PlayerNumber) => {
  inputBuffer.playerNumber = pn
  store.setPlayer(pn)
}

export const frameEvent = () => {
  if (store.current.gameStatus === 'ready') {
    waitingEvent()
  } else if (store.current.gameStatus === 'started') {
    gameEvent()
  }
}

const waitingEvent = () => {
  const now = Date.now()
  if (now > store.current.startTime) {
    store.gameStart()
  }
  resolveState() // only bars
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
    store.current
  )
  const nextSnapshot = calculateNextState(snapshot)
  store.updateBySnapshot(nextSnapshot)
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
