import { GameID } from '../config'
import { PlayerNumber } from '../data/types'
import { getRenderingState, inputBuffer } from '../domain'
import { frameEvent, gamestartEvent } from '../domain/events'
import { getNetworkPayload } from '../domain/output'
import { detectControl } from './io/control'
import { sendDataToServer } from './io/network'
import { makeNetwork } from './io/network/buffer'
import { renderState } from './render/game/render'

export const network = makeNetwork()

export const multiPlayerSetup = (playerNumber: PlayerNumber) => {
  gamestartEvent(playerNumber)
  network.init(playerNumber, GameID)
}

export const gameStart = () => {
  network.updateHandler((d) => inputBuffer.pushNetworkPayload(d))
}

export const resolveFrame = () => {
  detectControl()
  frameEvent()
  const renderingState = getRenderingState()
  renderState(renderingState)

  if (renderingState.gameStatus !== 'gameset') {
    sendDataToServer(getNetworkPayload())
  } else {
    network.stop()
  }
}
