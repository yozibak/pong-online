import { GameID } from '../config'
import { getRenderingState } from '../domain'
import { frameEvent } from '../domain/events'
import { detectControl } from './control'
import { startSubscription } from './network'
import { renderState } from './render'

export const setupServices = () => {
  startSubscription(GameID, 1, (d) => {
    console.log(d)
  })
}

export const resolveFrame = () => {
  detectControl()
  frameEvent()

  renderState(getRenderingState())
}
