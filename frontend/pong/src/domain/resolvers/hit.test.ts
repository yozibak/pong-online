import { createVector } from '../../data'
import { Ball, Position } from '../../data/types'
import { Destination } from './ball'
import { handleHit } from './hit'

test(`${handleHit.name}`, () => {
  const ball: Ball = {
    position: createVector({ x: 380, y: 280 }),
    movement: createVector({ x: 40, y: 40 }),
  }
  const dest: Destination = {
    position: { x: 420, y: 305 },
    angle: 45,
  }
  const bar: Position = {
    x: 400,
    y: 300,
  }
  const result = handleHit(ball, dest, bar, 'right')
  expect(result.willMiss).not.toBe(true)
  expect(result.angle).toBe(180 + 15)
  expect(Math.abs(380 - result.position.x)).toBeLessThan(10)
  expect(Math.abs(280 - result.position.y)).toBeLessThan(10)
})
