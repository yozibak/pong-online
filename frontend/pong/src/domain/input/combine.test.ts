import { Bar } from '../../data/types'
import { NetworkPayload } from '../output'
import { combineNetworkWithLocal } from './combine'

test(`${combineNetworkWithLocal.name}`, () => {
  const payload: NetworkPayload = {
    gameID: 'gameID',
    playerNumber: 2,
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
        x: 580,
        y: 200,
      },
      command: 'up',
    },
    frameCount: 398,
  }
  const localPlayerBar: Bar = {
    position: {
      x: 10,
      y: 300,
    },
    command: 'still',
  }
  const result = combineNetworkWithLocal(payload, 400, localPlayerBar)
  expect(result.frameAgo).toBe(400 - 398)
  expect(result.bars[2]).toMatchObject(payload.bar)
  expect(result.bars[1]).toMatchObject(localPlayerBar)
})
