import {
  BallSize,
  BarLength,
  BarWidth,
  DefaultHeight,
  DefaultWidth,
  EdgeThickness,
} from '../config'
import { Position, Score } from '../data/types'
import { RenderingState } from '../domain'

export const renderState = (state: RenderingState) => {
  p.background(0)
  p.fill(255)
  p.noStroke()

  rendewrEdge()
  renderBar(state.bars[1])
  renderBar(state.bars[2])
  renderBall(state.ball)
  renderScore(state.score)
  renderBorder()
}

const renderBar = (position: Position) => {
  p.rect(position.x, position.y - BarLength/2, BarWidth, BarLength)
}

const renderBall = (position: Position) => {
  p.rect(position.x - BallSize / 2, position.y - BallSize / 2, BallSize, BallSize)
}

const rendewrEdge = () => {
  p.rect(0, 0, DefaultWidth, EdgeThickness)
  p.rect(0, DefaultHeight - EdgeThickness, DefaultWidth, EdgeThickness)
}

const Offset = 40
const ScoreFontSize = 40
const renderScore = (score: Score) => {
  p.textSize(ScoreFontSize)
  p.text(score[1], DefaultWidth/2 - Offset - ScoreFontSize, Offset)
  p.text(score[2], DefaultWidth/2 + Offset, Offset)
}

const renderBorder = () => {
  p.rect(DefaultWidth/2, 0, 2, DefaultHeight)
}