import { BarLength, BarVelocity, DefaultHeight } from '../../config'
import { Bar, PlayerBars, PlayerCommand, PlayerNumber } from '../../data/types'
import { opponentPlayerNumber } from '../input/helpers'

export const resolvePlayerBars = (
  bars: PlayerBars,
  calcFrames: number,
  playerNumber: PlayerNumber
): PlayerBars => {
  const op = opponentPlayerNumber(playerNumber)
  return {
    [playerNumber]: calcFrames === 1 ? resolveBarPosition(bars[playerNumber]) : bars[playerNumber],
    [op]: resolveBarPosition(bars[op]),
  } as PlayerBars
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
