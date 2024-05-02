import { store } from '../data'
import { buffer1, buffer2 } from './commands'

export const frameEvent = () => {
  store.updateCommand(buffer1.command, buffer1.playerNumber)
  store.updateCommand(buffer2.command, buffer2.playerNumber)
  store.resolveBarPosition(1)
  store.resolveBarPosition(2)
}
