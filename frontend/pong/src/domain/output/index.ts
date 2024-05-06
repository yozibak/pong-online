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
  score: {
    one: number
    two: number
  }
  signal: Signal
}

export type Signal = EventSignal | string | null
export enum EventSignal {
  JOIN = 'JOIN',
  LEAVE = 'LEAVE',
  SCORE = 'SCORE',
  GAMESET = 'GAMESET'
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
    score: {
      one: store.current.score[1],
      two: store.current.score[2],
    },
    signal: getSignal(),
  }
}

export const getSignal = (): Signal => {
  if (store.current.gameStatus === 'gameset') {
    return EventSignal.GAMESET
  }
  if (store.current.startTime) {
    return store.current.startTime.toString()
  }
  return null
}
