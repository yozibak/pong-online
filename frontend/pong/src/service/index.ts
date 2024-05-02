import { getRenderingState } from '../domain'
import { frameEvent } from '../domain/events'
import { detectControl } from './control'
import { renderState } from './render'

export const resolveFrame = () => {
  detectControl()
  frameEvent()
  renderState(getRenderingState())
}
