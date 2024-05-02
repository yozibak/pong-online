import {
  BarOffset,
  BarVelocity,
  BarWidth,
  DefaultHeight,
  DefaultWidth,
  EdgeThickness,
} from '../config'
import { expectBallPosition, store, sumPosition } from '../data'
import { Ball, PlayerCommand, PlayerNumber, Position, UpDown } from '../data/types'

export const resolveBarPosition = (pn: PlayerNumber) => {
  const yDelta = resolveCommand(store.current.playerState[pn].command)
  const currentY = store.current.playerState[pn].bar.y
  store.setBarPosition(pn, currentY + yDelta)
}

export const resolveCommand = (command: PlayerCommand): number => {
  // also resolve time here
  return resolveUpdown(command.upDown)
}

const resolveUpdown = (upDown: UpDown | null) => {
  if (upDown === 'up') return -BarVelocity
  if (upDown === 'down') return BarVelocity
  return 0
}

export const resolveBallPosition = () => {
  resolveBallMovement(store.current.ball)
}

export const resolveBallMovement = (ball: Ball): void => {
  ball.position.add(ball.movement)
  if (hasBallHitEdge(ball.position)) {
    resolveBallEdgeReflection(ball)
  }
  if (isBallNearBar(ball.position)) {
    resolveBallBarReflection(ball)
  }
}

const hasBallHitEdge = (position: Position) =>
  position.y < EdgeThickness || position.y > DefaultHeight - EdgeThickness

export const resolveBallEdgeReflection = (ball: Ball): void => {
  const reflected = reflectAngle(ball.movement.angle, 'hori')
  ball.movement.setAngle(reflected)
}

export const reflectAngle = (angle: number, surface: 'hori' | 'vert'): number => {
  const surfaceAngle = surface === 'hori' ? 360 : 180
  return surfaceAngle - angle
}

export const isBallNearBar = (position: Position): boolean => {
  return position.x > DefaultWidth - BarWidth - BarOffset || position.x < BarWidth + BarOffset
}

export const resolveBallBarReflection = (ball: Ball): void => {
  const reflected = reflectAngle(ball.movement.angle, 'vert')
  ball.movement.setAngle(reflected)
}
