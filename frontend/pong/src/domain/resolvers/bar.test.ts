import { BarVelocity } from '../../config'
import { Bar, PlayerBars } from '../../data/types'
import { resolveBarPosition, resolvePlayerBars } from './bar'

test.only(`${resolvePlayerBars.name}`, () => {
  const bars: PlayerBars = {
    1: {
      position: {
        x: 20,
        y: 100,
      },
      command: 'down',
    },
    2: {
      position: {
        x: 580,
        y: 100,
      },
      command: 'down',
    },
  }
  const result = resolvePlayerBars(bars, 3, 1)
  expect(result[1].position.y).toBe(100)
  expect(result[2].position.y).toBe(100 + BarVelocity)

  const result2 = resolvePlayerBars(result, 2, 1)
  expect(result2[1].position.y).toBe(100)
  expect(result2[2].position.y).toBe(100 + BarVelocity * 2)

  const result3 = resolvePlayerBars(result2, 1, 1)
  expect(result3[1].position.y).toBe(100 + BarVelocity)
  expect(result3[2].position.y).toBe(100 + BarVelocity * 3)
})

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
