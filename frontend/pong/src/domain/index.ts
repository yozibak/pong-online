import { store } from "../data"
import { PlayerNumber, Position, Score } from "../data/types"

export type RenderingState = {
  bars: Record<PlayerNumber, Position>
  ball: Position
  score: Score
}

export const getRenderingState = (): RenderingState => ({
  bars: {
    1: store.current.playerState[1].bar,
    2: store.current.playerState[2].bar,
  },
  ball: store.current.ball.position,
  score: store.current.score
})
