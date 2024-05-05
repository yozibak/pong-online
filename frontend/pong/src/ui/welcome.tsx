import { useState } from 'react'
import { Waiting } from './waiting'

type PlayMode = 'online-multi'

export const isOnlineGuest = (): boolean => {
  const urlParams = new URLSearchParams(window.location.search)
  const number = Number(urlParams.get('player'))
  return number === 2
}

export const Welcome: React.FC<{ version: string; getReady: () => void }> = ({
  version,
  getReady,
}) => {
  const [mode, setMode] = useState<PlayMode>()
  const isGuest = isOnlineGuest()

  if (!mode)
    return (
      <div style={style}>
        <h1>PONG</h1>
        <div>version: {version}</div>
        <div>Welcome! You are {isGuest ? `Player2` : `Player1`}</div>
        <button onClick={() => setMode('online-multi')}>🏓 {isGuest ? `Join` : `Play`} 🏓</button>
      </div>
    )
  return <Waiting isGuest={isOnlineGuest()} getReady={getReady} />
}

const style: React.CSSProperties = {
  color: 'white',
  width: '100%',
  fontSize: 40,
}
