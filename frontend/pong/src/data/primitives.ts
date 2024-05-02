import p5 from 'p5'
import { Ball, PongVector, Position } from './types'
import { toDegrees, toRadians } from './helpers/utils'

export const createVector = ({ x, y }: Position = { x: 0, y: 0 }): PongVector => {
  const vector = new p5.Vector(x, y)
  return {
    get x() {
      return vector.x
    },
    get y() {
      return vector.y
    },
    set(position) {
      vector.set(position.x, position.y)
    },
    
    get angle() {
      return toDegrees(vector.heading())
    },
    setAngle(angle) {
      vector.setHeading(toRadians(angle))
    },
  }
}

export const expectBallPosition = (ball: Ball) => sumPosition(ball.position, ball.movement)

export const sumPosition = (...positions: Position[]) => {
  return positions.reduce((a, b) => ({ x: a.x + b.x, y: a.y + b.y }))
}
