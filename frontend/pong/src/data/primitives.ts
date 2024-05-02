import p5 from 'p5'
import { PlayerCommand, PongVector, Position, UpDown } from './types'
import { BarVelocity } from '../config'

export const createVector = ({ x, y }: Position = { x: 0, y: 0 }): PongVector => {
  return new p5.Vector(x, y)
}

export const resolveCommand = (command: PlayerCommand): number => {
  return resolveUpdown(command.upDown)
}

export const resolveUpdown = (upDown: UpDown | null) => {
  if (upDown === 'up') return -BarVelocity
  if (upDown === 'down') return BarVelocity
  return 0
}
