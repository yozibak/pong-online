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
  display: 'flex',
  flexDirection: 'column',
  flexWrap: 'nowrap',
  alignContent: 'center',
  justifyContent: 'center',
})
