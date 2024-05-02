export const Interface: React.FC<{ version: string }> = ({ version }) => {
  return (
    <div style={style}>
      <h1>Pong v{version}</h1>
    </div>
  )
}

const style: React.CSSProperties = {
  color: 'white',
  position: 'absolute',
  top: 0,
  left: 20,
  zIndex: 20,
  width: '100%',
  fontSize: 12,
}
