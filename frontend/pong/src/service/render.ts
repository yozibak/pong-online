import { BarLength, BarWidth } from "../config"
import { Position } from "../data/types"
import { RenderingState } from "../domain"

export const renderState = (state: RenderingState) => {
  p.background(0)
  p.fill(255)

  renderBar(state.bars[1])
  renderBar(state.bars[2])
}

const renderBar = (position: Position) => {
  p.rect(
    position.x,
    position.y,
    BarWidth,
    BarLength
  )
}