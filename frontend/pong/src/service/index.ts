import { GameID } from '../config'
import { PlayerNumber } from '../data/types'
import { getRenderingState, inputBuffer } from '../domain'
import { resolveStateAtFrame } from '../domain/events'
import { initOnlineGame } from '../domain/match'
import { getNetworkPayload } from '../domain/output'
import { detectKeyControl } from './control'
import { sendDataToServer } from './network'
import { makeNetwork } from './network'
import { renderState } from './render/render'

export const network = makeNetwork()

export const onlineMultiPlayerSetup = (playerNumber: PlayerNumber) => {
  initOnlineGame(playerNumber)
  network.init(playerNumber, GameID)
}

export const onlineGameStart = () => {
  network.updateHandler((d) => inputBuffer.pushNetworkPayload(d))
}

export const consumeFrame = () => {
  detectKeyControl()
  resolveStateAtFrame()
  const renderingState = getRenderingState()
  renderState(renderingState)

  if (renderingState.gameStatus !== 'gameset') {
    sendDataToServer(getNetworkPayload())
  } else {
    network.stop()
  }
}
