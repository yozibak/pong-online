import { PropsWithChildren } from 'react'
import { CanvasSize } from '../types'

export const Container: React.FC<PropsWithChildren<{ size: CanvasSize }>> = ({
  size,
  children,
}) => {
  return <div style={styles(size)}>{children}</div>
}

const styles = ({ width, height }: { width: number; height: number }): React.CSSProperties => ({
  position: 'relative',
  zIndex: 10,
  width,
  height,
  overflow: 'hidden',
  backgroundColor: 'rgba(0,0,0,0.9)',
  margin: '0 auto',
  touchAction: 'manipulation',
  overflowX: 'hidden',
  overflowY: 'hidden',
  overscrollBehavior: 'none',
  color: 'white',
})
