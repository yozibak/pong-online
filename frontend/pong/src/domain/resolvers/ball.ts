import { DefaultTokenStore } from 'aws-amplify/auth/cognito'
import { BarLength, DefaultWidth } from '../../config'
import { expectBallPosition, sumPosition } from '../../data'
import { Ball, PlayerNumber, PongState, Position } from '../../data/types'
import { calcEdgeReflectAngle } from './helpers/angle'
import {
  EdgePosition,
  Thresholds,
  calcReducedVectorByRatio,
  getMiddleRatio,
  getMiddleYByRatio,
  getReflectedPosition,
  getBarSide,
  willBallHitEdge,
} from './helpers/position'

export type SurfaceAngle = 'hori' | 'vert'

export type BarPositions = Record<PlayerNumber, Position>

export const getBarPositions = (playerState: PongState['playerState']): BarPositions => ({
  1: playerState[1].bar,
  2: playerState[2].bar,
})

export const resolveBallMovement = (ball: Ball, bars: BarPositions): void => {
  let nextPos = handleEdgeHit(ball)
  nextPos = handleBarHit(ball, nextPos, bars)
  ball.position.set(nextPos)
}

export const handleEdgeHit = (ball: Ball): Position => {
  const next = expectBallPosition(ball)
  if (willBallHitEdge(next)) {
    const angle = calcEdgeReflectAngle(ball.movement.angle, 'hori')
    ball.movement.setAngle(angle)
    return getReflectedPosition(next, 'hori')
  }
  return next
}

export const handleBarHit = (ball: Ball, next: Position, bars: BarPositions): Position => {
  if (ball.missed) return next
  const edge = getBarSide(next)
  if (!edge) return next
  return handleHitJudge(ball, next, bars, edge)
}

export const handleHitJudge = (
  ball: Ball,
  next: Position,
  bars: BarPositions,
  edge: EdgePosition
): Position => {
  const ratioAtThereshold = getMiddleRatio(ball.position, next, Thresholds[edge])
  const yAtThreshold = getMiddleYByRatio(ball.position, next, ratioAtThereshold)
  const posAtThreshold: Position = { x: Thresholds[edge], y: yAtThreshold }
  const bar = getBar(edge, bars)
  if (willHit(yAtThreshold, bar.y)) {
    const hitAngle = determineHitAngle(yAtThreshold, bar.y)
    const finalAngle = decideFinalAngle(hitAngle, edge)
    ball.movement.setAngle(finalAngle)
    return sumPosition(
      posAtThreshold,
      calcReducedVectorByRatio(ball.movement, 1 - ratioAtThereshold)
    )
  } else {
    ball.missed = true
    return next
  }
}

const getBar = (edge: EdgePosition, bars: BarPositions): Position => {
  if (edge === 'right') return bars[2]
  if (edge === 'left') return bars[1]
  throw Error()
}

export const willHit = (positionY: number, barY: number): boolean => {
  return positionY < barY + BarLength / 2 && positionY > barY - BarLength / 2
}

export const determineHitAngle = (positionY: number, barY: number) => {
  const distance = positionY - barY
  return getHitAngle(Math.abs(distance)) * (distance > 0 ? 1 : -1)
}

const getHitAngle = (abs: number) => {
  if (abs > BarLength / 3) return 60
  if (abs > BarLength / 4) return 45
  if (abs > BarLength / 6) return 30
  return 15
}

const decideFinalAngle = (angle: number, edge: EdgePosition) => {
  if (edge === 'right') return 180 - angle
  return angle
}

export const isBallOut = (ball: Ball) => {
  if (!ball.missed) return false
  return ball.position.x <= 0 || ball.position.x >= DefaultWidth
}

