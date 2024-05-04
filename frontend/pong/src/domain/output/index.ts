import { GameID } from '../../config'
import { store } from '../../data'
import { PlayerCommand, Position } from '../../data/types'

export type NetworkPayload = {
  gameID: string
  playerNumber: number
  ball: {
    position: Position
    movement: Position
  }
  bar: {
    position: Position
    command: PlayerCommand
  }
  frameCount: number
}

export const getNetworkPayload = (): NetworkPayload => {
  const playerNumber = store.current.playerNumber
  return {
    gameID: GameID,
    playerNumber,
    ball: {
      position: store.current.ball.position.position,
      movement: store.current.ball.movement.position,
    },
    bar: {
      position: store.current.bars[playerNumber].position,
      command: store.current.bars[playerNumber].command,
    },
    frameCount: store.current.frameCount,
  }
}
