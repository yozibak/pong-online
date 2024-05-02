
export type PongState = {
  playerNumber: PlayerNumber
  playerState: Record<PlayerNumber, PlayerState>
  ball: Ball
  score: Score
  hasGameset: boolean
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
  missed?: boolean
}

export type Score = Record<PlayerNumber, number>

export type PongVector = Position & {
  set: (position: Position) => void
  angle: number
  setAngle: (angle: number) => void
}

export type Position = { x: number; y: number }

export type UpDown = 'up' | 'down'

export type PlayerNumber = 1 | 2
