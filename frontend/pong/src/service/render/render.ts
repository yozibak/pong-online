import {
  BallSize,
  BarLength,
  BarWidth,
  DefaultHeight,
  DefaultWidth,
  EdgeThickness,
  ScoreToWin,
} from '../../config'
import { PlayerNumber, Position, Score } from '../../data/types'
import { RenderingState } from '../../domain'

export const renderState = (state: RenderingState) => {
  p.background(0)
  p.fill(200)
  p.noStroke()

  if (state.gameStatus === 'aborted') {
    renderAborted()
    return
  }
  if (state.gameStatus === 'ready') {
    renderSecondsToStart(state.secondsToStart)
  }
  if (state.gameStatus === 'started') {
    renderBall(state.ball)
    renderScore(state.score)
  }
  if (state.gameStatus === 'gameset') {
    p.fill(100)
    renderScore(state.score, true)
  }
  renderBar(state.bars[1], 1)
  renderBar(state.bars[2], 2)
  rendewrEdge()
  renderBorder()
}

const renderBar = (position: Position, pn: PlayerNumber) => {
  p.rect(position.x + (pn === 1 ? -BarWidth : 0), position.y - BarLength / 2, BarWidth, BarLength)
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
const renderScore = (score: Score, gameSet = false) => {
  p.textSize(ScoreFontSize)
  p.push()
  if (gameSet && score[1] === ScoreToWin) {
    p.fill(200)
  }
  p.text(score[1], DefaultWidth / 2 - Offset - ScoreFontSize, Offset)
  p.pop()

  p.push()
  if (gameSet && score[2] === ScoreToWin) {
    p.fill(200)
  }
  p.text(score[2], DefaultWidth / 2 + Offset, Offset)
  p.pop()
}

const renderBorder = () => {
  p.rect(DefaultWidth / 2, 0, 2, DefaultHeight)
}

const SecondSize = 40
const renderSecondsToStart = (secs: number) => {
  p.textSize(SecondSize)
  p.text(secs, DefaultWidth / 2 - SecondSize / 4, DefaultHeight / 2 - SecondSize / 2)
}

const renderAborted = () => {
  p.textSize(8)
  p.text('☹️ Oops! ☹️', 0, DefaultHeight / 2)
  p.text('Your mate has gone out of reach...', 0, DefaultHeight / 2 + 16)
}
