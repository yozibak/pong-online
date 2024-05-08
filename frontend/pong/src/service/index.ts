import { GameStatus, PlayerNumber } from '../data/types'
import { getRenderingState, inputBuffer } from '../domain'
import { resolveStateAtFrame } from '../domain/events'
import { initOnlineGame } from '../domain/match'
import { getNetworkPayload } from '../domain/output'
import { detectKeyControl } from './control'
import { makeNetwork, sendDataToServer } from './network'
import { renderState } from './render/render'

export const network = makeNetwork()

export const onlineMultiPlayerSetup = (playerNumber: PlayerNumber, gameID: string) => {
  initOnlineGame(playerNumber, gameID)
  network.init(playerNumber, gameID)
}

export const onlineGameStart = () => {
  network.updateHandler((d) => inputBuffer.pushNetworkPayload(d))
}

export const consumeFrame = () => {
  detectKeyControl()
  resolveStateAtFrame()
  const renderingState = getRenderingState()
  renderState(renderingState)

  if (renderingState.mode === 'online-multi') {
    handleNetwork(renderingState.gameStatus)
  }
}

const handleNetwork = (gameStatus: GameStatus) => {
  if (gameStatus === 'ready' || gameStatus === 'started') {
    sendDataToServer(getNetworkPayload())
  } else {
    network.stop()
  }
}
