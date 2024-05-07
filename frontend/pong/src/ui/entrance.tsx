import { useState } from 'react'
import { PlayMode, PlayerNumber } from '../data/types'
import { selectOfflineMode } from '../domain/match'
import { onlineMultiPlayerSetup } from '../service'
import { isMobile } from '../service/control'
import { Waiting } from './waiting'

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
    <div>
      <div style={{ fontSize: '5em', lineHeight: 1 }}>PONG</div>
      <div>ONLINE</div>
      <br />
      {isGuest ? <div>You are Player 2 (right side)</div> : <></>}
      <button style={btn} onClick={selectOnline}>
        🏓 {isGuest ? `JOIN` : `PLAY`} 🏓
      </button>
      {!isGuest && !isMobile() ? (
        <>
          <button
            style={{ ...btn, fontSize: '1.2rem', textDecoration: 'none' }}
            onClick={() => selectOffline('offline-multi')}
          >
            🏓 OFFLINE PLAY 🏓
          </button>
        </>
      ) : (
        <></>
      )}
      <br />
      <div style={{ opacity: 0.6, fontWeight: 'normal', fontSize: '.7em', width: '100%' }}>
        v{version}
      </div>
    </div>
  )
}

const btn: React.CSSProperties = {
  display: 'block',
  backgroundColor: 'transparent',
  fontSize: '1.5rem',
  color: 'inherit',
  margin: '10px auto',
  padding: 10,
  cursor: 'pointer',
  border: 'none',
  textDecoration: 'underline',
  fontFamily: 'inherit',
}
