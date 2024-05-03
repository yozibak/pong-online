import { BottomThreshold, TopThreshold } from '../../config'
import { sumPosition } from '../../data'
import { Ball, Position } from '../../data/types'
import { calcEdgeReflectAngle } from './helpers/angle'
import { getReflectedPosition } from './helpers/position'

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
      position: nextPosition
    }
  }
}

const expectBallPosition = (ball: Ball) => sumPosition(ball.position, ball.movement)

export const willBallHitEdge = (position: Position): boolean =>
  position.y < TopThreshold || position.y > BottomThreshold
