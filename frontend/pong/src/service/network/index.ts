import type { GraphQLSubscription } from 'aws-amplify/api'
import { PlayerNumber } from '../../data/types'
import { opponentPlayerNumber } from '../../domain/input/helpers'
import { NetworkPayload } from '../../domain/output'
import { client } from './client'
import { sendData, subscribeGame } from './queries'

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

const startSubscription = (
  gameID: string,
  playerNumber: PlayerNumber,
  onData: (payload: NetworkPayload) => void
) => {
  const subscription = client
    .graphql<GraphQLSubscription<{ subscribeGame: NetworkPayload }>>({
      query: subscribeGame,
      variables: {
        gameID,
        playerNumber,
      },
    })
    .subscribe({
      next: (value) => onData(value.data.subscribeGame),
      // eslint-disable-next-line no-console
      error: (e) => console.warn(e),
    })
  return subscription
}

export const sendDataToServer = async (payload: NetworkPayload) => {
  try {
    await client.graphql({
      query: sendData,
      variables: payload,
    })
  } catch (e) {
    // eslint-disable-next-line no-console
    console.warn(e)
  }
}
