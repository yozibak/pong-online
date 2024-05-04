export type PongState = {
  playerNumber: PlayerNumber
  bars: PlayerBars
  ball: Ball
  score: Score
  hasGameset: boolean
}

export type PlayerBars = Record<PlayerNumber, Bar>

export type Bar = {
  position: Position
  command: PlayerCommand
}

export type PlayerCommand = 'up' | 'down' | 'still'

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
  mag: number
  position: Position
}

export type Position = { x: number; y: number }

export type PlayerNumber = 1 | 2
