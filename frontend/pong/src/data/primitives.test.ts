import { BarVelocity } from '../config'
import { resolveUpdown } from './primitives'

test(`${resolveUpdown.name}`, () => {
  const yDelta = resolveUpdown('up')
  expect(yDelta).toBe(-BarVelocity)
})
