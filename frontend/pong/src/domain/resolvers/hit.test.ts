import { createVector } from '../../data'
import { Ball, Position } from '../../data/types'
import { Destination } from './ball'
import { getMiddleRatio, getMiddleYByRatio, handleHit } from './hit'

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

test.each([
  [{ x: 380, y: 200 }, { x: 420, y: 240 }, 0.5, 220],
  [{ x: 25, y: 200 }, { x: 15, y: 240 }, 0.5, 220],
])(`${getMiddleYByRatio.name}`, (position, next, ratio, expectedY) => {
  expect(getMiddleYByRatio(position, next, ratio)).toBe(expectedY)
})

test.each([
  [{ x: 380, y: 200 }, { x: 420, y: 240 }, 400, 0.5],
  [{ x: 25, y: 200 }, { x: 15, y: 240 }, 20, 0.5],
])(`${getMiddleRatio.name}`, (position, next, middleX, ratio) => {
  expect(getMiddleRatio(position, next, middleX)).toBeCloseTo(ratio)
})
