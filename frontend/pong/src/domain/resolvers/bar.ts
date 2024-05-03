import { BarLength, BarVelocity, DefaultHeight } from '../../config'
import { Bar, PlayerBars, PlayerCommand } from '../../data/types'

export const resolvePlayerBars = (bars: PlayerBars): PlayerBars => {
  return {
    1: resolveBarPosition(bars[1]),
    2: resolveBarPosition(bars[2]),
  }
}

export const resolveBarPosition = (bar: Bar, barVelocity = BarVelocity): Bar => {
  const yDelta = resolveBarCommand(bar.command, barVelocity)
  return {
    ...bar,
    position: {
      ...bar.position,
      y: barPositionConstraints(bar.position.y + yDelta),
    },
  }
}

export const resolveBarCommand = (command: PlayerCommand, barVelocity: number): number => {
  if (command === 'up') return -barVelocity
  if (command === 'down') return barVelocity
  return 0
}

export const barPositionConstraints = (y: number) =>
  Math.max(BarLength / 2, Math.min(y, DefaultHeight - BarLength / 2))
