import { EdgePosition, SurfaceAngle } from './position'

export const calcEdgeReflectAngle = (angle: number, surface: SurfaceAngle): number => {
  const surfaceAngle = surface === 'hori' ? 360 : 180
  return surfaceAngle - angle
}

export const addBarReflectAntgle = (angle: number, hitAngle: number, edge: EdgePosition) => {
  return angle + hitAngle * (edge === 'left' ? 1 : -1)
}
