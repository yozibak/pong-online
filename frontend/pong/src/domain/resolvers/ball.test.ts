import { createVector } from '../../data'
import { Ball } from '../../data/types'
import { handleEdgeHit } from './ball'

test(`${handleEdgeHit.name}`, () => {
  const ball: Ball = {
    position: createVector({ x: 60, y: 13 }),
    movement: createVector({ x: -10, y: -10 }),
  }
  const nextPos = handleEdgeHit(ball)
  expect(nextPos.x).toBeCloseTo(50)
  expect(nextPos.y).toBeCloseTo(17)
})

