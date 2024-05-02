import p5 from 'p5'

export type PongState = {
  playerNumber: PlayerNumber
  playerState: Record<PlayerNumber, PlayerState>
  ball: Ball
  score: Score
}

export type PlayerState = {
  bar: Position
  command: PlayerCommand
}

export type PlayerCommand = {
  upDown: UpDown | null
  time?: never // for network commands with latency
}

export type Bar = {
  position: Position
}

export type Ball = {
  position: PongVector
  movement: PongVector
}

export type Score = Record<PlayerNumber, number>

/**
 * wrapper for p5.Vector
 * *maybe replace p5 in the later dev
 */
export type PongVector = p5.Vector

export type Position = { x: number; y: number }

export type UpDown = 'up' | 'down'

export type PlayerNumber = 1 | 2