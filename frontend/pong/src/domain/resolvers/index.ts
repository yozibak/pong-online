import { Ball, PlayerBars, PongState } from '../../data/types'
import { Destination, resolveBallDestination } from './ball'
import { resolvePlayerBars } from './bar'
import { resolveBarHit } from './hit'

export type StateSnapshot = Pick<PongState, 'ball' | 'bars' | 'score' | 'playerNumber'> & {
  receiving: boolean
  calcFrames: number
}

export const calculateNextState = (snapshot: StateSnapshot): StateSnapshot => {
  if (snapshot.calcFrames > 100) throw new BadConnectionError()
  if (snapshot.calcFrames === 0) return snapshot
  const nextBars = resolvePlayerBars(snapshot.bars, snapshot.calcFrames, snapshot.playerNumber)
  const doesBallRequireCalc =
    (snapshot.receiving && snapshot.calcFrames === 1) || !snapshot.receiving
  const ball = doesBallRequireCalc ? calcBall(snapshot, nextBars) : snapshot.ball
  const nextSnapshot: StateSnapshot = {
    ...snapshot,
    bars: nextBars,
    calcFrames: snapshot.calcFrames - 1,
    ball,
  }
  return calculateNextState(nextSnapshot)
}

const calcBall = (snapshot: StateSnapshot, nextBars: PlayerBars): Ball => {
  const nextBallDestination = resolveBallDestination(snapshot.ball)
  const finalDest = resolveBarHit(snapshot.ball, nextBallDestination, nextBars)
  const ball = updateBall(snapshot.ball, finalDest)
  return ball
}

const updateBall = (ball: Ball, dest: Destination): Ball => {
  ball.missed = dest.willMiss
  ball.position.set(dest.position)
  ball.movement.setAngle(dest.angle)
  return ball
}

export class BadConnectionError extends Error {
  constructor() {
    super('Bad connection')
  }
}