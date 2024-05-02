import { BarVelocity } from '../../config'
import { PlayerCommand, UpDown } from '../../data/types'

export const resolveBarCommand = (command: PlayerCommand): number => {
  // also resolve time here
  return resolveUpdown(command.upDown)
}

const resolveUpdown = (upDown: UpDown | null) => {
  if (upDown === 'up') return -BarVelocity
  if (upDown === 'down') return BarVelocity
  return 0
}

