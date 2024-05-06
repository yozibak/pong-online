import { createVector } from '../../data'
import { Ball } from '../../data/types'
import { calcEdgeReflectAngle, reflectDiff, resolveBallDestination } from './ball'
import { SurfaceAngle } from './ball'

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

test.each([
  [30, 'hori', 330],
  [30, 'vert', 150],
  [45, 'hori', 315],
  [45, 'vert', 135],
  [330, 'hori', 30],
  [240, 'hori', 120],
])(`${calcEdgeReflectAngle.name}`, (angle, surface, expected) => {
  expect(calcEdgeReflectAngle(angle, surface as SurfaceAngle)).toBe(expected)
})

test.each([
  [4, 16],
  [15, 15],
  [410, 390],
])(`${reflectDiff.name}`, (val, expected) => {
  expect(reflectDiff(val, 10, 400)).toBe(expected)
})
