import p5 from 'p5'
import { toDegrees, toRadians } from './helpers/utils'
import { PongVector, Position } from './types'

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
    get mag() {
      return vector.mag()
    },
    get position(): Position {
      return {
        x: vector.x,
        y: vector.y
      }
    }
  }
}

export const createVectorFromAngle = (angle: number, mag: number):PongVector => {
  return createVector(p5.Vector.fromAngle(toRadians(angle), mag))
}


export const sumPosition = (...positions: Position[]) => {
  return positions.reduce((a, b) => ({ x: a.x + b.x, y: a.y + b.y }))
}
