import { BarLength } from '../../config'
import { expectBallPosition } from '../../data'
import { Ball, PlayerNumber, PongState, Position } from '../../data/types'
import { reflectMovementAngle } from './helpers/angle'
import { EdgePosition, Thresholds, getMiddleByX, getReflectedPosition, willBallBeNearBar, willBallHitEdge } from './helpers/position'

export type SurfaceAngle = 'hori' | 'vert'

export type BarPositions = Record<PlayerNumber, Position>

export const getBarPositions = (playerState: PongState['playerState']):BarPositions => ({
  1: playerState[1].bar,
  2: playerState[2].bar
})

export const resolveBallMovement = (ball: Ball, bars: BarPositions): void => {
  let nextPos = handleEdgeHit(ball)
  nextPos = handleBarHit(ball, nextPos, bars)
  ball.position.set(nextPos)
}

export const handleEdgeHit = (ball: Ball): Position => {
  const next = expectBallPosition(ball)
  if (willBallHitEdge(next)) {
    reflectMovementAngle(ball, 'hori')
    return getReflectedPosition(next, 'hori')
  }
  return next
}

export const handleBarHit = (ball: Ball, next: Position, bars: BarPositions): Position => {
  if (ball.missed) return next
  const edge = willBallBeNearBar(next)
  if (edge) {
    const posAtThreshold = getMiddleByX(ball.position, next, Thresholds[edge])
    const bar = getBar(edge, bars)
    if (willHit(posAtThreshold, bar)) {
      reflectMovementAngle(ball, 'vert')
      return getReflectedPosition(next, 'vert')
    } else {
      ball.missed = true
    }
  }
  return next
}

const getBar = (edge: EdgePosition, bars: BarPositions): Position => {
  if (edge === 'right') return bars[2]
  if (edge === 'left') return bars[1]
  throw Error()
}

export const willHit = (position: Position, bar: Position):boolean => {
  return (position.y < bar.y + BarLength/2 && position.y > bar.y - BarLength/2) 
}

export const determineHitAngle = (position: Position, bar: Position) => {
  const distance = position.y - bar.y
}