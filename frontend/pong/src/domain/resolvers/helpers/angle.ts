import { SurfaceAngle } from '../ball'
import { Ball } from '../../../data/types'

export const reflectMovementAngle = (ball: Ball, surface: SurfaceAngle): void => {
  const reflected = reflectAngle(ball.movement.angle, surface)
  ball.movement.setAngle(reflected)
}

export const reflectAngle = (angle: number, surface: SurfaceAngle): number => {
  const surfaceAngle = surface === 'hori' ? 360 : 180
  return surfaceAngle - angle
}
