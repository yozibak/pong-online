import { createVector } from '../../data'
import { Ball } from '../../data/types'
import { resolveBallDestination } from './ball'

jest.mock('../../config', () => ({
  TopThreshold: 10,
}))

test(`${resolveBallDestination.name}`, () => {
  const ball: Ball = {
    position: createVector({ x: 60, y: 13 }),
    movement: createVector({ x: -10, y: -10 }),
  }
  const dest = resolveBallDestination(ball)
  expect([135, 135 + 360]).toContain(dest.angle)
  expect(dest.position.x).toBeCloseTo(50)
  expect(dest.position.y).toBeCloseTo(17) // bounce on edge
})
