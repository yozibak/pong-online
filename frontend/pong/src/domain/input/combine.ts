import { createVector } from '../../data'
import { Bar, PlayerNumber, PongState } from '../../data/types'
import { NetworkPayload } from '../output'
import { StateSnapshot } from '../resolvers'
import { resolveBarPosition } from '../resolvers/bar'
import { LatestInputs } from './buffer'
import { opponentPlayerNumber, whichSideIsBallOn } from './helpers'

export const combineState = (
  { localInput, networkPayload }: LatestInputs,
  localState: PongState
): StateSnapshot => {
  const receiverState = getReceiverState(localState, networkPayload)
  return applyLocalInput(receiverState, localInput, localState.playerNumber)
}

/**
 * get ball receiver's state (the side on which the ball is)
 * to precisely determine bounce calculation
 */
export const getReceiverState = (
  local: PongState,
  networkPayload: NetworkPayload | null
): StateSnapshot => {
  if (!networkPayload) return local
  const receiverSide = whichSideIsBallOn(local.playerNumber, local.ball.position)
  if (receiverSide === local.playerNumber) return localStateWithOpponentsBar(local, networkPayload)
  else
    return combineNetworkWithLocal(networkPayload, local.frameCount, local.bars[local.playerNumber])
}

const localStateWithOpponentsBar = (local: PongState, payload: NetworkPayload): StateSnapshot => {
  const frameAgo = local.frameCount - payload.frameCount
  const opponentBar = resolveBar(payload.bar, frameAgo)
  return {
    ...local,
    bars: { ...local.bars, [opponentPlayerNumber(local.playerNumber)]: opponentBar },
  }
}

const resolveBar = (bar: Bar, frames: number): Bar => {
  if (frames === 0) return bar
  const resolved = resolveBarPosition(bar)
  return resolveBar(resolved, frames - 1)
}

export const combineNetworkWithLocal = (
  payload: NetworkPayload,
  localFrameCount: number,
  localPlayerBar: Bar
): StateSnapshot => {
  const networkState = convertPayload(payload)
  const localPN = payload.playerNumber === 1 ? 2 : 1
  return {
    ...networkState,
    bars: {
      ...networkState.bars,
      [localPN]: localPlayerBar,
    },
    frameAgo: localFrameCount - payload.frameCount,
  }
}

const convertPayload = (payload: NetworkPayload): StateSnapshot => {
  return {
    ball: {
      position: createVector(payload.ball.position),
      movement: createVector(payload.ball.movement),
    },
    bars: {
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
