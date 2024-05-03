import { store } from "../data"
import { PlayerNumber, Position, Score } from "../data/types"
import { StateSnapshot } from "./resolvers"

export type RenderingState = {
  bars: Record<PlayerNumber, Position>
  ball: Position
  score: Score
}

export const getRenderingState = (): RenderingState => ({
  bars: {
    1: store.current.bars[1].position,
    2: store.current.bars[2].position,
  },
  ball: store.current.ball.position,
  score: store.current.score
})

export const getNetworkPayload = (): StateSnapshot => ({
  ball: store.current.ball,
  bars: store.current.bars
})
