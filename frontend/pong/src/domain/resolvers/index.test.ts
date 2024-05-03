import { StateSnapshot, calculateNextState } from ".";
import { createVector } from "../../data";
import { Ball, Bar } from "../../data/types";

describe(`${calculateNextState.name}`, () => {
  const prepareSnapshot = ():StateSnapshot => {
    const ball: Ball = {
      position: createVector({ x: 300, y: 300,}),
      movement: createVector({ x: 10, y: 10}),
    }
    const bar1: Bar = {
      position: {
        x: 20,y: 300
      },
      command: {
        upDown: 'up'
      },
    }
    const bar2: Bar = {
      position: {
        x: 580,y: 300
      },
      command: {
        upDown: 'up'
      },
    }
    return {
      ball,
      bars: {
        1: bar1,
        2: bar2
      }
    }
  }
  it(`can calculate next state`, () => {
    expect(calculateNextState(prepareSnapshot())).toMatchSnapshot()
  })
  it(`can recursively calculate current state from old network snapshot`, () => {
    expect(calculateNextState({...prepareSnapshot(), frameAgo: 2})).toMatchSnapshot()
  })
})
