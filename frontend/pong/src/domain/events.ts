import { store } from '../data'
import { buffer1, buffer2 } from './commands'
import { getBarPositions, resolveBallMovement } from './resolvers/ball'
import { resolveBarPosition } from './resolvers'

export const frameEvent = () => {
  // command
  store.updateCommand(buffer1.command, buffer1.playerNumber)
  store.updateCommand(buffer2.command, buffer2.playerNumber)

  // maybe update ball position here (invoked by netwrok)

  // resolve state
  resolveBarPosition(1)
  resolveBarPosition(2)
  resolveBallMovement(store.current.ball, getBarPositions(store.current.playerState))
}
