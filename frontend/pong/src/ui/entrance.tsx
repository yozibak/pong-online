import { useState } from 'react'
import { PlayMode, PlayerNumber } from '../data/types'
import { selectOfflineMode } from '../domain/match'
import { onlineMultiPlayerSetup } from '../service'
import { Waiting } from './waiting'
import { isMobile } from '../service/control'

export const getPlayerNumber = (): PlayerNumber => {
  const urlParams = new URLSearchParams(window.location.search)
  const number = Number(urlParams.get('player'))
  if (number === 1 || number === 2) return number
  return 1
}

export const Entrance: React.FC<{ version: string; getReady: () => void }> = ({
  version,
  getReady,
}) => {
  const playerNumber = getPlayerNumber()
  const isGuest = playerNumber === 2
  const [online, setOnline] = useState(false)

  const selectOnline = () => {
    onlineMultiPlayerSetup(playerNumber)
    setOnline(true)
  }

  const selectOffline = (mode: PlayMode) => {
    selectOfflineMode(mode)
    getReady()
  }

  if (online) return <Waiting isGuest={isGuest} getReady={getReady} />
  return (
    <div style={style}>
      <h1>PONG</h1>
      <div>version: {version}</div>
      <div>Welcome! {isGuest ? `You are Player 2 (right side)` : ``}</div>
      <button style={btn} onClick={selectOnline}>
        🏓 {isGuest ? `Join` : `multi-player (ONLINE)`} 🏓
      </button>
      {!isGuest  ? (
        <>
          <button style={btn} onClick={() => selectOffline('offline-multi')}>
            🏓 {`multi-player (OFFLINE)`} 🏓
          </button>
          {/* <button style={btn} onClick={() => selectOffline('offline-solo')}>
            🏓 {`single-player`} 🏓
          </button> */}
        </>
      ) : (
        <></>
      )}
    </div>
  )
}

const style: React.CSSProperties = {
  color: 'white',
  width: '100%',
  fontSize: 40,
}

const btn: React.CSSProperties = {
  display: 'block',
  margin: 10,
  padding: 10,
  fontSize: 30,
  backgroundColor: 'white',
  cursor: 'pointer',
  borderRadius: 30
}
