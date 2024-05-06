import { BarLength, LeftThreshold, RightThreshold } from '../../config'
import { createVectorFromAngle, sumPosition } from '../../data'
import { Ball, PlayerBars, Position } from '../../data/types'
import { Destination } from './ball'

export const resolveBarHit = (ball: Ball, dest: Destination, bars: PlayerBars): Destination => {
  if (ball.missed) return dest
  const edge = getBarSide(ball.position)
  if (edge) {
    const bar = getBar(edge, bars)
    return handleHit(ball, dest, bar, edge)
  } else return dest
}

export type BarSide = 'right' | 'left'

export const getBarSide = (position: Position): BarSide | undefined => {
  if (position.x > RightThreshold) return 'right'
  if (position.x < LeftThreshold) return 'left'
}

const getBar = (edge: BarSide, bars: PlayerBars): Position => {
  if (edge === 'right') return bars[2].position
  if (edge === 'left') return bars[1].position
  throw Error()
}

export const handleHit = (
  ball: Ball,
  dest: Destination,
  bar: Position,
  edge: BarSide
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

const decideFinalAngle = (angle: number, edge: BarSide) => {
  if (edge === 'right') return 180 - angle
  return angle
}

export const getMiddleYByRatio = (position: Position, next: Position, ratio: number) => {
  return position.y + ratio * (next.y - position.y)
}

export const getMiddleRatio = (position: Position, next: Position, middleX: number) => {
  const diff = next.x - position.x
  const mid = middleX - position.x
  return mid / diff
}

export const calcReducedDelta = (vec: Position, ratio: number) => ({
  x: vec.x * ratio,
  y: vec.y * ratio,
})
