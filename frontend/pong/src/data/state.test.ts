import { BarVelocity } from '../config'
import { makePongStore } from './state'

test(`can update bar position through command`, () => {
  const store = makePongStore()
  const initialPosY = Number(store.current.playerState[1].bar.y)
  store.updateCommand(
    {
      upDown: 'up',
    },
    1
  )
  store.resolveBarPosition(1)
  expect(store.current.playerState[1].bar.y).toBe(initialPosY - BarVelocity)
})
