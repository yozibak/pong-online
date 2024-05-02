import { calcEdgeReflectAngle } from './angle'

test.each([
  [30, 'hori', 330],
  [30, 'vert', 150],
  [45, 'hori', 315],
  [45, 'vert', 135],
  [330, 'hori', 30],
  [240, 'hori', 120],
])(`${calcEdgeReflectAngle.name}`, (angle, surface, expected) => {
  expect(calcEdgeReflectAngle(angle, surface as any)).toBe(expected)
})
