import { PlayerNumber, Score } from "../../data/types";

const ScoreToWin = 13

export const checkWinner = (score: Score): PlayerNumber | undefined => {
  if (score[1] >= ScoreToWin) return 1
  if (score[2] >= ScoreToWin) return 2
  return 
}