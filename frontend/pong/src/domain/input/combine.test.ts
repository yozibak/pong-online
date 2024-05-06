import { createVector } from '../../data'
import { NetworkPayload } from '../output'
import { _mergeState } from './combine'
import * as helpers from './helpers'

describe(`${_mergeState.name}`, () => {
  const localState: Parameters<typeof _mergeState>[0] = {
    playerNumber: 1,
    bars: {
      1: {
        position: {
          x: 20,
          y: 300,
        },
        command: 'up',
      },
      2: {
        position: {
          x: 580,
          y: 220,
        },
        command: 'up',
      },
    },
    score: {
      1: 0,
      2: 0,
    },
    ball: {
      position: createVector({ x: 310, y: 310 }),
      movement: createVector({ x: 10, y: 10 }),
    },
    frameCount: 400
  }
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
    score: {
      one: 0,
      two: 0,
    },
    frameCount: 398,
    signal: null
  }
  it(`should use opponent's network state when ball is on the other side`, () => {
    jest.spyOn(helpers, 'isPlayerReceiving').mockReturnValue(false)
    const result = _mergeState(localState, payload)
    expect(result.calcFrames).toBe(400 - 398)
    expect(result.bars[2]).toMatchObject(payload.bar)
    expect(result.bars[1]).toMatchObject(localState.bars[1])

    // network
    expect(result.ball).toMatchObject(payload.ball)
  })
  test(`should use player's local state when receiving`, () => {
    jest.spyOn(helpers, 'isPlayerReceiving').mockReturnValue(true)
    const result = _mergeState(localState, payload)
    expect(result.calcFrames).toBe(400 - 398)
    expect(result.bars[2]).toMatchObject(payload.bar)
    expect(result.bars[1]).toMatchObject(localState.bars[1])

    // local
    expect(result.ball).toMatchObject(localState.ball)
  })
})
