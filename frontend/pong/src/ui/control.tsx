import { inputBuffer } from '../domain'

export const Control = () => {
  if (window.innerWidth > 800) return <></>
  return (
    <div style={{ width: '100%', }}>
      <div
        style={{
          maxWidth: 300,
          margin: '0 auto',
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        <button
          onPointerDown={() => inputBuffer.pushLocalInput('down')}
          onPointerUp={() => inputBuffer.pushLocalInput('still')}
          style={btn}
        >
          ↓
        </button>
        <button
          onPointerDown={() => inputBuffer.pushLocalInput('up')}
          onPointerUp={() => inputBuffer.pushLocalInput('still')}
          style={btn}
        >
          ↑
        </button>
      </div>
    </div>
  )
}

const btn: React.CSSProperties = {
  width: 100,
  height: 100,
  fontSize: 40,
  color: 'white',
  background: 'none',
  zIndex: 100,
  border: 'none',
  borderRadius: '100%',
  paddingBottom: '.1em',
  WebkitUserSelect: 'none',
  userSelect: 'none',
}
