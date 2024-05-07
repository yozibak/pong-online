import { PropsWithChildren } from 'react'

export type ContainerSize = {
  width: number
  height: number
}

export const Container: React.FC<PropsWithChildren<{ size: ContainerSize }>> = ({
  size,
  children,
}) => {
  return <div style={styles(size)}>{children}</div>
}

const styles = ({ width, height }: { width: number; height: number }): React.CSSProperties => ({
  // spacing
  width,
  height,
  margin: '0 auto',

  // style
  backgroundColor: 'rgba(0,0,0,0.9)',
  color: 'rgba(240, 240, 250, 0.96)',
  fontSize: 24,
  fontFamily: 'monospace',
  fontWeight: 'bold',
  lineHeight: 1.5,
  letterSpacing: 4,

  // touch restraints
  overflow: 'hidden',
  touchAction: 'manipulation',
  overflowX: 'hidden',
  overflowY: 'hidden',
  overscrollBehavior: 'none',

  // layout
  display: 'flex',
  flexDirection: 'column',
  alignContent: 'center',
  alignItems: 'center',
  justifyContent: 'center',
  textAlign: 'center',
  position: 'relative'
})
