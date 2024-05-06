import { DefaultWidth } from '../../config'
import { PlayerNumber, Position } from '../../data/types'

export const isPlayerReceiving = (
  localPlayerNumber: PlayerNumber,
  ballPosition: Position
): boolean => {
  return localPlayerNumber === whichSideIsBallOn(ballPosition)
}

export const whichSideIsBallOn = (ballPosition: Position): PlayerNumber => {
  if (ballPosition.x <= DefaultWidth / 2) return 1
  else return 2
}

export const opponentPlayerNumber = (playerNumber: PlayerNumber) => (playerNumber === 1 ? 2 : 1)
