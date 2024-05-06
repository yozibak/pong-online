import { startSubscription } from '.'
import { PlayerNumber } from '../../../data/types'
import { opponentPlayerNumber } from '../../../domain/input/helpers'
import { NetworkPayload } from '../../../domain/output'

export const makeNetwork = () => {
  let subscription: ReturnType<typeof startSubscription>
  let listenTo: PlayerNumber
  let gameID: string
  let subscriptionHandler: (d: NetworkPayload) => void = () => undefined
  return {
    init(playerNumber: PlayerNumber, id: string) {
      listenTo = opponentPlayerNumber(playerNumber)
      gameID = id
      subscription = startSubscription(gameID, listenTo, (d) => subscriptionHandler(d))
    },
    updateHandler(handler: (d: NetworkPayload) => void) {
      subscriptionHandler = handler
    },
    stop() {
      subscription.unsubscribe()
    },
  }
}
