import { DefaultWidth, ScoreToWin } from '../../config'
import { Ball, PlayerNumber, Score } from '../../data/types'

export const checkWinner = (score: Score): PlayerNumber | undefined => {
  if (score[1] >= ScoreToWin) return 1
  if (score[2] >= ScoreToWin) return 2
  return
}

export const isBallOut = (ball: Ball) => {
  if (!ball.missed) return false
  return ball.position.x <= 0 || ball.position.x >= DefaultWidth
}
