import { GameID } from '../config'
import { PlayerNumber } from '../data/types'
import { getRenderingState, inputBuffer } from '../domain'
import { frameEvent, gamestartEvent } from '../domain/events'
import { getNetworkPayload } from '../domain/output'
import { detectControl } from './io/control'
import { sendDataToServer } from './io/network'
import { makeNetwork } from './io/network/buffer'
import { renderState } from './render/game/render'

const network = makeNetwork()

export const initialSetup = () => {
  const playerNumber = getPlayerNumber()
  gamestartEvent(playerNumber)
  network.start(GameID, playerNumber === 1 ? 2 : 1, (d) => inputBuffer.pushNetworkPayload(d))
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

export const getPlayerNumber = (): PlayerNumber => {
  const urlParams = new URLSearchParams(window.location.search)
  const number = Number(urlParams.get('player'))
  if (number === 1 || number === 2) {
    return number
  }
  return 1
}
