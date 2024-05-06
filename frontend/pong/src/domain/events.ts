import { inputBuffer } from '.'
import { store } from '../data'
import { PlayMode, PlayerNumber } from '../data/types'
import { mergeInputsWithState } from './input/combine'
import { EventSignal, Signal } from './output'
import { calculateNextState } from './resolvers'
import { getBarSide } from './resolvers/helpers/position'
import { checkWinner, isBallOut } from './resolvers/score'

export const receiveGuestJoinAndDecideStartTime = (signal: Signal) => {
  if (signal !== EventSignal.JOIN) return
  store.setStartTime()
}

export const receiveGameStartTimeEvent = (signal: Signal) => {
  const startTime = Number(signal)
  if (Number.isNaN(startTime)) return
  store.setStartTime(startTime)
}

export const selectOfflineMode = (mode: PlayMode) => {
  store.setPlayMode(mode)
  store.setStartTime()
}

export const initOnlineGame = (pn: PlayerNumber) => {
  inputBuffer.playerNumber = pn
  store.setPlayer(pn)
  store.setPlayMode('online-multi')
}

export const frameEvent = () => {
  if (store.current.gameStatus === 'ready') {
    waitingEvent()
  } else if (store.current.gameStatus === 'started') {
    gameEvent()
  } else if (store.current.gameStatus === 'gameset') {
    // TODO: close the connection after a while
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
    store.current,
    store.current.playMode
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
