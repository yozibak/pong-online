export type PongState = {
  gameStatus: GameStatus
  playerNumber: PlayerNumber
  bars: PlayerBars
  ball: Ball
  score: Score
  frameCount: number
  startTime: number
  playMode?: PlayMode
  gameID?: string
}

export type GameStatus = 'ready' | 'started' | 'gameset' | 'aborted'

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

export type PlayMode = 'online-multi' | 'offline-multi' | 'offline-solo'