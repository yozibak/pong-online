import { DefaultWidth } from '../../config'
import { PlayerNumber, Position } from '../../data/types'

export const isPlayerReceiving = (localPlayerNumber: PlayerNumber, ballPosition: Position):boolean => {
  return localPlayerNumber === whichSideIsBallOn(localPlayerNumber, ballPosition)
}

export const whichSideIsBallOn = (localPlayerNumber: PlayerNumber, ballPosition: Position): PlayerNumber => {
  if (ballPosition.x <= DefaultWidth / 2) return 1
  else return 2
  if (localPlayerNumber === 1) {
    if (ballPosition.x <= DefaultWidth / 3) return 1
    else return 2
  }
  if (localPlayerNumber === 2) {
    if (ballPosition.x >= (DefaultWidth * 2) / 3) return 2
    else return 1
  }
}

export const opponentPlayerNumber = (playerNumber: PlayerNumber) => (playerNumber === 1 ? 2 : 1)
