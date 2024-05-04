import { BarLength } from '../../config'
import { createVectorFromAngle, sumPosition } from '../../data'
import { Ball, PlayerBars, Position } from '../../data/types'
import { Destination } from './ball'
import {
  EdgePosition,
  calcReducedDelta,
  getBarSide,
  getMiddleRatio,
  getMiddleYByRatio,
} from './helpers/position'

export const resolveBarHit = (ball: Ball, dest: Destination, bars: PlayerBars): Destination => {
  if (ball.missed) return dest
  const edge = getBarSide(ball.position)
  if (edge) {
    const bar = getBar(edge, bars)
    return handleHit(ball, dest, bar, edge)
  } else return dest
}

const getBar = (edge: EdgePosition, bars: PlayerBars): Position => {
  if (edge === 'right') return bars[2].position
  if (edge === 'left') return bars[1].position
  throw Error()
}

export const handleHit = (
  ball: Ball,
  dest: Destination,
  bar: Position,
  edge: EdgePosition
): Destination => {
  const ratioAtBarX = getMiddleRatio(ball.position, dest.position, bar.x)
  const yAtBar = getMiddleYByRatio(ball.position, dest.position, ratioAtBarX)
  const posAtBar: Position = { x: bar.x, y: yAtBar }
  if (isWithinBarRange(yAtBar, bar.y)) {
    const finalAngle = decideFinalAngle(determineHitAngle(yAtBar, bar.y), edge)
    return {
      angle: finalAngle,
      position: sumPosition(
        posAtBar,
        calcReducedDelta(createVectorFromAngle(finalAngle, ball.movement.mag), 1 - ratioAtBarX)
      ),
    }
  } else {
    return {
      ...dest,
      willMiss: true,
    }
  }
}

const isWithinBarRange = (positionY: number, barY: number): boolean => {
  return positionY < barY + BarLength / 2 && positionY > barY - BarLength / 2
}

const determineHitAngle = (positionY: number, barY: number) => {
  const distance = positionY - barY
  return getHitAngle(Math.abs(distance)) * (distance > 0 ? 1 : -1)
}

const getHitAngle = (abs: number) => {
  if (abs > BarLength / 3) return 60
  if (abs > BarLength / 4) return 45
  if (abs > BarLength / 6) return 30
  return 15
}

const decideFinalAngle = (angle: number, edge: EdgePosition) => {
  if (edge === 'right') return 180 - angle
  return angle
}
