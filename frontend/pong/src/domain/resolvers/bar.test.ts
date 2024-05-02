import { BarVelocity } from '../../config'
import { resolveBarCommand } from './bar'

test(`${resolveBarCommand.name}`, () => {
  expect(
    resolveBarCommand({
      upDown: 'up',
    })
  ).toBe(-BarVelocity)
})
