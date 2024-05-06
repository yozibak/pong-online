import { inputBuffer } from '.'
import { store } from '../data'
import { PlayMode, PlayerNumber } from '../data/types'
import { Signal, EventSignal } from './output'

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

export const abortOnlineGame = () => {
  store.gameset()
}
