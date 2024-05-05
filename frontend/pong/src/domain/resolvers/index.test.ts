import { StateSnapshot, calculateNextState } from '.'
import { createVector } from '../../data'
import { Ball, Bar } from '../../data/types'

describe(`${calculateNextState.name}`, () => {
  const prepareSnapshot = (): StateSnapshot => {
    const ball: Ball = {
      position: createVector({ x: 300, y: 200 }),
      movement: createVector({ x: 10, y: 10 }),
    }
    const bar1: Bar = {
      position: {
        x: 20,
        y: 100,
      },
      command: 'up',
    }
    const bar2: Bar = {
      position: {
        x: 580,
        y: 100,
      },
      command: 'up',
    }
    return {
      ball,
      bars: {
        1: bar1,
        2: bar2,
      },
      score: {
        1: 0,
        2: 0,
      },
      calcFrames: 1,
      playerNumber: 1,
      receiving: false
    }
  }
  it(`can calculate next state`, () => {
    const snapshot = prepareSnapshot()
    const next = calculateNextState(snapshot)
    expect(next).toMatchSnapshot()
  })
  it(`can recursively calculate current state from old network snapshot`, () => {
    expect(calculateNextState({ ...prepareSnapshot(), calcFrames: 2 })).toMatchSnapshot()
  })
})
