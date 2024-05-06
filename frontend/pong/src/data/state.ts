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
import { createVector, createVectorFromAngle } from './primitives'
import { Ball, PlayMode, PlayerCommand, PlayerNumber, PongState } from './types'

export const initBall = (): Ball => ({
  position: createVector({ x: DefaultWidth / 2, y: DefaultHeight / 2 }),
  movement: createVectorFromAngle(135, BallVelocity),
})

const InitialState: PongState = {
  gameStatus: 'ready',
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
  frameCount: 0,
  startTime: 0,
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
    s.gameStatus = 'gameset'
  },
  updateBySnapshot: (s) => (snapshot: StateSnapshot) => {
    s.ball = snapshot.ball
    s.bars = snapshot.bars
    s.score = snapshot.score
  },
  setStartTime: (s) => (startTime?: number) => {
    s.startTime = startTime || Date.now() + 5_000
  },
  gameStart: (s) => () => {
    s.gameStatus = 'started'
    s.ball = initBall()
  },
  incrementFrameCount: (s) => () => {
    s.frameCount++
  },
  setPlayMode: s => (mode: PlayMode) => {
    s.playMode = mode
  },
  abort: s => () => {
    s.gameStatus = 'aborted'
  }
} satisfies ReducerMap<PongState>

export const makePongStore = () => makeStore<PongState>(InitialState)(reducers)
