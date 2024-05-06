import type { GraphQLSubscription } from 'aws-amplify/api'
import { PlayerNumber } from '../../../data/types'
import { NetworkPayload } from '../../../domain/output'
import { client } from './client'
import { sendData, subscribeGame } from './queries'

export const startSubscription = (
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
