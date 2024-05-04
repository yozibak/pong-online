import { Ball, PongState } from '../../data/types'
import { Destination, resolveBallDestination } from './ball'
import { resolvePlayerBars } from './bar'
import { resolveBarHit } from './hit'

export type StateSnapshot = Pick<PongState, 'ball' | 'bars' | 'score'> & {
  frameAgo?: number
}

export const calculateNextState = (snapshot: StateSnapshot): StateSnapshot => {
  const nextBars = resolvePlayerBars(snapshot.bars)
  const nextBallDestination = resolveBallDestination(snapshot.ball)
  const finalDest = resolveBarHit(snapshot.ball, nextBallDestination, nextBars)
  const nextSnapshot: StateSnapshot = {
    ball: updateBall(snapshot.ball, finalDest),
    bars: nextBars,
    score: snapshot.score,
    frameAgo: snapshot.frameAgo,
  }
  if (nextSnapshot.frameAgo) {
    if (nextSnapshot.frameAgo > 1) {
      nextSnapshot.frameAgo--
      return calculateNextState(nextSnapshot)
    } 
    nextSnapshot.frameAgo = undefined
  }
  return nextSnapshot
}

const updateBall = (ball: Ball, dest: Destination): Ball => {
  ball.missed = dest.willMiss
  ball.position.set(dest.position)
  ball.movement.setAngle(dest.angle)
  return ball
}
