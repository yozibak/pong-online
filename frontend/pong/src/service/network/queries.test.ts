import { NetworkPayload } from '../../domain/network'
import { sendData } from './queries'

test(`query construction`, () => {
  const payload: NetworkPayload = {
    gameID: 'gameID',
    playerNumber: 1,
    ball: {
      position: {
        x: 300,
        y: 300,
      },
      movement: {
        x: 10,
        y: 10,
      },
    },
    bar: {
      position: {
        x: 20,
        y: 300,
      },
      command: 'up',
    },
    frameCount: 2303,
  }
  const sendDataQuery = JSON.stringify({ mutation: sendData, variables: payload })
  expect(sendDataQuery).toMatchSnapshot()
})
