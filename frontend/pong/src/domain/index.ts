import { store } from '../data'
import { GameStatus, PlayMode, PlayerNumber, Position, Score } from '../data/types'
import { makeInputBuffer } from './input/buffer'

export const inputBuffer = makeInputBuffer()

export type RenderingState = {
  bars: Record<PlayerNumber, Position>
  ball: Position
  score: Score
  gameStatus: GameStatus,
  secondsToStart: number,
  mode?: PlayMode
}

export const getRenderingState = (): RenderingState => ({
  bars: {
    1: store.current.bars[1].position,
    2: store.current.bars[2].position,
  },
  ball: store.current.ball.position,
  score: store.current.score,
  gameStatus: store.current.gameStatus,
  secondsToStart: Math.floor((store.current.startTime - Date.now()) / 1000),
  mode: store.current.playMode
})
