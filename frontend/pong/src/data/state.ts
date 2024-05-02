import { BarLength, BarOffset, BarWidth, DefaultHeight, DefaultWidth } from '../config'
import { ReducerMap, makeStore } from './helpers/store'
import { createVector } from './primitives'
import { Ball, PlayerCommand, PlayerNumber, PongState } from './types'

const InitialState: PongState = {
  playerNumber: 1,
  playerState: {
    1: {
      bar: {
        x: BarOffset,
        y: DefaultHeight / 2 - BarLength / 2,
      },
      command: {
        upDown: null,
      },
    },
    2: {
      bar: {
        x: DefaultWidth - BarOffset - BarWidth,
        y: DefaultHeight / 2 - BarLength / 2,
      },
      command: {
        upDown: null,
      },
    },
  },
  ball: {
    position: createVector({ x: DefaultWidth / 2, y: DefaultHeight / 2 }),
    movement: createVector({ x: -5, y: -5 }),
  },
  score: {
    1: 0,
    2: 0,
  },
}

const reducers = {
  setPlayer: (s) => (n: PlayerNumber) => {
    s.playerNumber = n
  },
  updateCommand: (s) => (command: PlayerCommand, n?: PlayerNumber) => {
    if (n === undefined) n = s.playerNumber
    s.playerState[n].command = command
  },
  setBarPosition: (s) => (n: PlayerNumber, y: number) => {
    s.playerState[n].bar.y = Math.max(0, Math.min(y, DefaultHeight - BarLength))
  },
  setBall: s => (ball: Ball) => {
    s.ball = ball
  }
} satisfies ReducerMap<PongState>

export const makePongStore = () => makeStore<PongState>(InitialState)(reducers)
