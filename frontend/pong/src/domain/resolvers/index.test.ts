import { StateSnapshot, calculateNextState } from '.'
import { BarVelocity } from '../../config'
import { createVector } from '../../data'
import { Ball, Bar } from '../../data/types'

describe(`${calculateNextState.name}`, () => {
  const prepareSnapshot = (): Omit<StateSnapshot, 'calcFrames' | 'receiving'> => {
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
      playerNumber: 1,
    }
  }
  const clone = (o: object) => JSON.parse(JSON.stringify(o))
  it(`calculates next state when in sync`, () => {
    const snapshot = prepareSnapshot()
    const prev = clone(snapshot)
    const next = calculateNextState({ ...snapshot, calcFrames: 1, receiving: true })
    expect(next.ball.position.x).toBe(prev.ball.position.x + prev.ball.movement.x)
    expect(next.ball.position.y).toBe(prev.ball.position.y + prev.ball.movement.y)
    expect(next.bars[1].position.y).toBe(prev.bars[1].position.y - BarVelocity)
    expect(next.bars[2].position.y).toBe(prev.bars[2].position.y - BarVelocity)
  })
  it(`calculates player's side only once when receiving because it uses local state without delay`, () => {
    const snapshot = prepareSnapshot()
    const prev = clone(snapshot)
    const next = calculateNextState({ ...snapshot, calcFrames: 3, receiving: true })
    expect(next.ball.position.x).toBe(prev.ball.position.x + prev.ball.movement.x)
    expect(next.ball.position.y).toBe(prev.ball.position.y + prev.ball.movement.y)
    expect(next.bars[1].position.y).toBe(prev.bars[1].position.y - BarVelocity)
    expect(next.bars[2].position.y).toBe(prev.bars[2].position.y - BarVelocity * 3) // calc 3 times recursively
  })
  it(`calculates ball and opponent's bar recursively when not receiving`, () => {
    const snapshot = prepareSnapshot()
    const prev = clone(snapshot)
    const next = calculateNextState({ ...snapshot, calcFrames: 3, receiving: false })
    expect(next.ball.position.x).toBe(prev.ball.position.x + prev.ball.movement.x * 3)
    expect(next.ball.position.y).toBe(prev.ball.position.y + prev.ball.movement.y * 3)
    expect(next.bars[1].position.y).toBe(prev.bars[1].position.y - BarVelocity)
    expect(next.bars[2].position.y).toBe(prev.bars[2].position.y - BarVelocity * 3)
  })
})
