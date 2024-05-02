import { BarVelocity } from '../../config'
import { store } from '../../data'
import { PlayerCommand, PlayerNumber, UpDown } from '../../data/types'

export const resolveBarPosition = (pn: PlayerNumber) => {
  const yDelta = resolveBarCommand(store.current.playerState[pn].command)
  const currentY = store.current.playerState[pn].bar.y
  store.setBarPosition(pn, currentY + yDelta)
}

export const resolveBarCommand = (command: PlayerCommand): number => {
  // also resolve time here
  return resolveUpdown(command.upDown)
}

const resolveUpdown = (upDown: UpDown | null) => {
  if (upDown === 'up') return -BarVelocity
  if (upDown === 'down') return BarVelocity
  return 0
}
