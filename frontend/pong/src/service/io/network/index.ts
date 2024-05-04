import type { GraphQLSubscription } from 'aws-amplify/api'
import { client } from './client'
import { PlayerNumber } from '../../../data/types'
import { sendData, sendHandShake, subscribeGame, subscribeHandShake } from './queries'
import { NetworkPayload } from '../../../domain/output'

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

export type HandShakeData = {
  playerNumber: PlayerNumber
  gameID: string
  body: string
}

export const startHandShakeSubscription = (
  gameID: string,
  playerNumber: PlayerNumber,
  onData: (body: HandShakeData) => void
) => {
  const subscription = client
    .graphql<GraphQLSubscription<{ subscribeHandShake: HandShakeData }>>({
      query: subscribeHandShake,
      variables: {
        gameID,
        playerNumber,
      },
    })
    .subscribe({
      next: (value) => onData(value.data.subscribeHandShake),
      // eslint-disable-next-line no-console
      error: (e) => console.warn(e),
    })
  return subscription
}

export const sendHandShakeData = async (data: HandShakeData) => {
  try {
    await client.graphql({
      query: sendHandShake,
      variables: data,
    })
  } catch (e) {
    // eslint-disable-next-line no-console
    console.warn(e)
  }
}
