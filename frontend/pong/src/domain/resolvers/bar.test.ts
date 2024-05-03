import { Bar } from '../../data/types'
import { resolveBarPosition } from './bar'

test(`${resolveBarPosition.name}`, () => {
  const bar: Bar = {
    position: {
      x: 20,
      y: 300,
    },
    command: 'up',
  }
  const result = resolveBarPosition(bar, 50)
  expect(result.position).toMatchObject({
    x: 20,
    y: 250,
  })
})
