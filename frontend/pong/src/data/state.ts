import { BarLength, BarOffset, BarWidth, DefaultHeight, DefaultWidth } from '../config'
import { ReducerMap, makeStore } from './helpers/store'
import { createVector, resolveCommand } from './primitives'
import { PlayerCommand, PlayerNumber, PongState } from './types'

const InitialState: PongState = {
  playerNumber: 1,
  playerState: {
    1: {
      bar: {
        x: BarOffset,
        y: (DefaultHeight / 2) - (BarLength/2),
      },
      command: {
        upDown: null,
      },
    },
    2: {
      bar: {
        x: DefaultWidth - BarOffset - BarWidth,
        y: (DefaultHeight / 2) - (BarLength/2),
      },
      command: {
        upDown: null,
      },
    },
  },
  ball: {
    position: createVector(),
    movement: createVector(),
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
  resolveBarPosition: (s) => (n: PlayerNumber) => {
    const player = s.playerState[n]
    const yDelta = resolveCommand(player.command)
    player.bar.y += yDelta // TODO: need constraints
  },
} satisfies ReducerMap<PongState>

export const makePongStore = () => makeStore<PongState>(InitialState)(reducers)
