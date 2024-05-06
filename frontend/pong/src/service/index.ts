import { GameID } from '../config'
import { PlayerNumber } from '../data/types'
import { getRenderingState, inputBuffer } from '../domain'
import { frameEvent, initOnlineGame } from '../domain/events'
import { getNetworkPayload } from '../domain/output'
import { detectKeyControl } from './io/control'
import { sendDataToServer } from './io/network'
import { makeNetwork } from './io/network'
import { renderState } from './render/game/render'

export const network = makeNetwork()

export const onlineMultiPlayerSetup = (playerNumber: PlayerNumber) => {
  initOnlineGame(playerNumber)
  network.init(playerNumber, GameID)
}

export const onlineGameStart = () => {
  network.updateHandler((d) => inputBuffer.pushNetworkPayload(d))
}

export const resolveFrame = () => {
  detectKeyControl()
  frameEvent()
  const renderingState = getRenderingState()
  renderState(renderingState)

  if (renderingState.gameStatus !== 'gameset') {
    sendDataToServer(getNetworkPayload())
  } else {
    network.stop()
  }
}
