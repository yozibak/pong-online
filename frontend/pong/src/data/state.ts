import {
  BallVelocity,
  BarLength,
  DefaultHeight,
  DefaultWidth,
  LeftThreshold,
  RightThreshold,
} from '../config'
import { StateSnapshot } from '../domain/resolvers'
import { ReducerMap, makeStore } from './helpers/store'
import { createVector } from './primitives'
import { Ball, PlayerCommand, PlayerNumber, PongState } from './types'

export const initBall = (): Ball => ({
  position: createVector({ x: DefaultWidth / 2, y: DefaultHeight / 2 }),
  movement: createVector({ x: -BallVelocity, y: -BallVelocity }),
})

const InitialState: PongState = {
  playerNumber: 1,
  bars: {
    1: {
      position: {
        x: LeftThreshold,
        y: DefaultHeight / 2 - BarLength / 2,
      },
      command: 'still',
    },
    2: {
      position: {
        x: RightThreshold,
        y: DefaultHeight / 2 - BarLength / 2,
      },
      command: 'still',
    },
  },
  ball: initBall(),
  score: {
    1: 0,
    2: 0,
  },
  hasGameset: false,
  frameCount: 0,
}

const reducers = {
  setPlayer: (s) => (n: PlayerNumber) => {
    s.playerNumber = n
  },
  updateCommand: (s) => (command: PlayerCommand, n?: PlayerNumber) => {
    if (n === undefined) n = s.playerNumber
    s.bars[n].command = command
  },
  setBall: (s) => (ball: Ball) => {
    s.ball = ball
  },
  incrementScore: (s) => (n: PlayerNumber) => {
    s.score[n]++
  },
  resetBall: (s) => () => {
    s.ball = initBall()
  },
  gameset: (s) => () => {
    s.hasGameset = true
  },
  updateBySnapshot: (s) => (snapshot: StateSnapshot) => {
    s.ball = snapshot.ball
    s.bars = snapshot.bars
  },
} satisfies ReducerMap<PongState>

export const makePongStore = () => makeStore<PongState>(InitialState)(reducers)
