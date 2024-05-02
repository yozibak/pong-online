import { BarVelocity } from '../config'
import { createVector } from '../data'
import { Ball } from '../data/types'
import { reflectAngle, resolveBallEdgeReflection, resolveCommand } from './resolvers'

test(`${resolveCommand.name}`, () => {
  expect(
    resolveCommand({
      upDown: 'up',
    })
  ).toBe(-BarVelocity)
})

test(`${resolveBallEdgeReflection.name}`, () => {
  const ball:Ball = {
    position: createVector({x: 100, y: 400}),
    movement: createVector({x: 10, y: 10})
  }
  expect(ball.movement.angle).toBe(45)
  resolveBallEdgeReflection(ball)
  expect(ball.movement.angle).toBeCloseTo(-45)
})

test.each([
  [30, 'hori', 330],
  [30, 'vert', 150],
  [45, 'hori', 315],
  [45, 'vert', 135],
  [330, 'hori', 30],
  [240, 'hori', 120],
])(`${reflectAngle.name}`,(angle, surface, expected) => {
  expect(reflectAngle(angle, surface as any)).toBe(expected)
})