import { store } from '../../data'
import { PlayerNumber } from '../../data/types'
import { resolveBarCommand } from './bar'

export const resolveBarPosition = (pn: PlayerNumber) => {
  const yDelta = resolveBarCommand(store.current.playerState[pn].command)
  const currentY = store.current.playerState[pn].bar.y
  store.setBarPosition(pn, currentY + yDelta)
}

