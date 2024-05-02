import { BottomThreshold, LeftThreshold, RightThreshold, TopThreshold } from '../../../config'
import { Position } from '../../../data/types'
import { SurfaceAngle } from '../ball'

export type EdgePosition = 'right' | 'left' | 'top' | 'bottom'

export const getReflectedPosition = (
  position: Position,
  surface: SurfaceAngle,
  thresholds = {
    top: TopThreshold,
    bottom: BottomThreshold,
    left: LeftThreshold,
    right: RightThreshold,
  }
): Position => {
  if (surface === 'hori') {
    return {
      x: position.x,
      y: reflectDiff(position.y, thresholds.top, thresholds.bottom),
    }
  } else
    return {
      x: reflectDiff(position.x, thresholds.left, thresholds.right),
      y: position.y,
    }
}

export const reflectDiff = (val: number, min: number, max: number): number => {
  if (val < min) return min + (min - val)
  if (val > max) return max - (val - max)
  return val
}

export const willBallHitEdge = (position: Position): boolean =>
  position.y < TopThreshold || position.y > BottomThreshold

export const willBallBeNearBar = (position: Position): EdgePosition | undefined => {
  if (position.x > RightThreshold) return 'right'
  if (position.x < LeftThreshold) return 'left'
}

export const getMiddleYByRatio = (position: Position, next: Position, ratio: number) => {
  return position.y + ratio * (next.y - position.y)
}

export const getMiddleRatio = (position: Position, next: Position, middleX: number) => {
  const diff = next.x - position.x
  const mid = middleX - position.x
  return mid / diff
}

export const Thresholds: Record<EdgePosition, number> = {
  right: RightThreshold,
  left: LeftThreshold,
  top: TopThreshold,
  bottom: BottomThreshold,
}

export const calcReducedVectorByRatio = (vec: Position, ratio: number) => ({
  x: vec.x * ratio,
  y: vec.y * ratio
})