import { BottomThreshold, LeftThreshold, RightThreshold, TopThreshold } from '../../config'
import { expectBallPosition } from '../../data'
import { Ball, Position } from '../../data/types'

type SurfaceAngle = 'hori' | 'vert'

export const resolveBallMovement = (ball: Ball): void => {
  let nextPos = handleEdgeHit(ball)
  nextPos = handleBarHit(ball, nextPos)
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

export const handleBarHit = (ball: Ball, next: Position): Position => {
  if (isBallNearBar(ball.position)) {
    reflectMovementAngle(ball, 'vert')
    return getReflectedPosition(next, 'vert')
  }
  return next
}

const willBallHitEdge = (position: Position) =>
  position.y < TopThreshold || position.y > BottomThreshold

const isBallNearBar = (position: Position): boolean =>
  position.x > RightThreshold || position.x < LeftThreshold

export const reflectMovementAngle = (ball: Ball, surface: SurfaceAngle): void => {
  const reflected = reflectAngle(ball.movement.angle, surface)
  ball.movement.setAngle(reflected)
}

export const reflectAngle = (angle: number, surface: SurfaceAngle): number => {
  const surfaceAngle = surface === 'hori' ? 360 : 180
  return surfaceAngle - angle
}

export const getReflectedPosition = (
  position: Position,
  surface: SurfaceAngle,
  thresholds = {
    top: TopThreshold,
    bottom: BottomThreshold,
    left: LeftThreshold,
    right: RightThreshold,
  }
): Position => {
  if (surface === 'hori') {
    return {
      x: position.x,
      y: reflectDiff(position.y, thresholds.top, thresholds.bottom),
    }
  } else
    return {
      x: reflectDiff(position.x, thresholds.left, thresholds.right),
      y: position.y,
    }
}

export const reflectDiff = (val: number, min: number, max: number): number => {
  if (val < min) return min + (min - val)
  if (val > max) return max - (val - max)
  return val
}
