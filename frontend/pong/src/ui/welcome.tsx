import { useEffect, useState } from 'react'
import { Waiting } from './waiting'
import { PlayerNumber } from '../data/types'
import { multiPlayerSetup } from '../service'

type PlayMode = 'online-multi'

export const getPlayerNumber = (): PlayerNumber => {
  const urlParams = new URLSearchParams(window.location.search)
  const number = Number(urlParams.get('player'))
  if (number === 1 || number === 2) return number
  return 1
}

export const Welcome: React.FC<{ version: string; getReady: () => void }> = ({
  version,
  getReady,
}) => {
  const [mode, setMode] = useState<PlayMode>()
  const playerNumber = getPlayerNumber()
  const isGuest = playerNumber === 2

  useEffect(() => multiPlayerSetup(playerNumber), [])

  if (!mode)
    return (
      <div style={style}>
        <h1>PONG</h1>
        <div>version: {version}</div>
        <div>Welcome! You are {isGuest ? `Player2` : `Player1`}</div>
        <button onClick={() => setMode('online-multi')}>🏓 {isGuest ? `Join` : `Play`} 🏓</button>
      </div>
    )
  return <Waiting isGuest={isGuest} getReady={getReady} />
}

const style: React.CSSProperties = {
  color: 'white',
  width: '100%',
  fontSize: 40,
}
