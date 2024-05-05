import { Ball, PongState } from '../../data/types'
import { Destination, resolveBallDestination } from './ball'
import { resolvePlayerBars } from './bar'
import { resolveBarHit } from './hit'

export type StateSnapshot = Pick<PongState, 'ball' | 'bars' | 'score' | 'playerNumber'> & {
  receiving: boolean
  calcFrames: number
}

export const calculateNextState = (snapshot: StateSnapshot): StateSnapshot => {
  if (snapshot.calcFrames === 0) return snapshot
  const nextBars = resolvePlayerBars(snapshot.bars, snapshot.calcFrames, snapshot.playerNumber)

  if ((snapshot.receiving && snapshot.calcFrames === 1) || !snapshot.receiving) {
    const nextBallDestination = resolveBallDestination(snapshot.ball)
    const finalDest = resolveBarHit(snapshot.ball, nextBallDestination, nextBars)
    const nextSnapshot: StateSnapshot = {
      ...snapshot,
      ball: updateBall(snapshot.ball, finalDest),
      bars: nextBars,
      calcFrames: snapshot.calcFrames - 1,
    }
    return calculateNextState(nextSnapshot)
  } else {
    const nextSnapshot: StateSnapshot = {
      ...snapshot,
      bars: nextBars,
      calcFrames: snapshot.calcFrames - 1,
    }
    return calculateNextState(nextSnapshot)
  }
}

const updateBall = (ball: Ball, dest: Destination): Ball => {
  ball.missed = dest.willMiss
  ball.position.set(dest.position)
  ball.movement.setAngle(dest.angle)
  return ball
}
