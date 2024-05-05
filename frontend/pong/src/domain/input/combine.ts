import { createVector } from '../../data'
import { PlayerNumber, PongState } from '../../data/types'
import { NetworkPayload } from '../output'
import { StateSnapshot } from '../resolvers'
import { LatestInputs } from './buffer'
import { isPlayerReceiving } from './helpers'

export const mergeInputsWithState = (
  { localInput, networkPayload }: LatestInputs,
  localState: PongState
): StateSnapshot => {
  const receiverState = mergeState(localState, networkPayload)
  const snapshot = applyLocalInput(receiverState, localInput, localState.playerNumber)
  // console.log(snapshot.receiving, snapshot.ball.position.position, snapshot.ball.movement.position, snapshot.bars, snapshot.calcFrames)
  return snapshot
}

export const mergeState = (
  local: PongState,
  networkPayload: NetworkPayload | null
): StateSnapshot => {
  if (!networkPayload) return { ...local, receiving: true, calcFrames: 1 }
  return _mergeState(local, networkPayload)
}

export const _mergeState = (
  local: Pick<PongState, 'ball' | 'bars' | 'playerNumber' | 'frameCount' | 'score'>,
  networkPayload: NetworkPayload
): StateSnapshot => {
  const receiving = isPlayerReceiving(local.playerNumber, local.ball.position)
  const networkState = convertPayload(networkPayload)
  const localPN = local.playerNumber
  const calcFrames = local.frameCount - networkPayload.frameCount
  return {
    ...networkState,
    calcFrames,
    receiving,
    playerNumber: localPN,
    bars: {
      ...networkState.bars,
      [localPN]: local.bars[localPN],
    },
    ...(receiving
      ? {
          ball: local.ball,
          score: local.score,
        }
      : {}),
  }
}

const convertPayload = (
  payload: NetworkPayload
): Omit<StateSnapshot, 'receiving' | 'calcFrames' | 'playerNumber'> => {
  return {
    ball: {
      position: createVector(payload.ball.position),
      movement: createVector(payload.ball.movement),
    },
    bars: {
      // either gets overridden
      1: payload.bar,
      2: payload.bar,
    },
    score: {
      1: payload.score.one,
      2: payload.score.two,
    },
  }
}

const applyLocalInput = (
  snapshot: StateSnapshot,
  localInput: LatestInputs['localInput'],
  playerNumber: PlayerNumber
): StateSnapshot => {
  return {
    ...snapshot,
    bars: {
      ...snapshot.bars,
      [playerNumber]: {
        ...snapshot.bars[playerNumber],
        command: localInput[playerNumber],
      },
    },
  }
}
