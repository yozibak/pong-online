import { BottomThreshold, LeftThreshold, RightThreshold, TopThreshold } from '../../config'
import { sumPosition } from '../../data'
import { Ball, Position } from '../../data/types'

export type SurfaceAngle = 'hori' | 'vert'

export type Destination = {
  position: Position
  angle: number
  willMiss?: boolean
}

export const resolveBallDestination = (ball: Ball): Destination => {
  const nextPosition = expectBallPosition(ball)
  if (willBallHitEdge(nextPosition)) {
    return {
      angle: calcEdgeReflectAngle(ball.movement.angle, 'hori'),
      position: getReflectedPosition(nextPosition, 'hori'),
    }
  } else {
    return {
      angle: ball.movement.angle,
      position: nextPosition,
    }
  }
}

const expectBallPosition = (ball: Ball) => sumPosition(ball.position, ball.movement)

export const willBallHitEdge = (position: Position): boolean =>
  position.y < TopThreshold || position.y > BottomThreshold

export const calcEdgeReflectAngle = (angle: number, surface: SurfaceAngle): number => {
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
