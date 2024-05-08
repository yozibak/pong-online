import { createContext, useState } from 'react'
import { PlayMode } from '../data/types'
import { selectOfflineMode } from '../domain/match'
import { onlineMultiPlayerSetup } from '../service'
import { isMobile } from '../service/control'
import { getPlayerNumberFromParams } from '../service/params'
import { initGameID } from '../service/params/gameID'
import { Waiting } from './waiting'

export const OnlineMatchContext = createContext<OnlineMatchData>({} as OnlineMatchData)

type OnlineMatchData = ReturnType<typeof useOnlineMatch> & { getReady: () => void }

const useOnlineMatch = () => {
  const playerNumber = getPlayerNumberFromParams()
  const gameID = initGameID(playerNumber)
  const isGuest = playerNumber === 2
  return {
    playerNumber,
    gameID,
    isGuest,
  }
}

export const Entrance: React.FC<{ version: string; getReady: () => void }> = ({
  version,
  getReady,
}) => {
  const { playerNumber, gameID, isGuest } = useOnlineMatch()

  const [online, setOnline] = useState(false)

  const selectOnline = () => {
    onlineMultiPlayerSetup(playerNumber, gameID)
    setOnline(true)
  }

  const selectOffline = (mode: PlayMode) => {
    selectOfflineMode(mode)
    getReady()
  }

  if (online)
    return (
      <OnlineMatchContext.Provider value={{ playerNumber, gameID, isGuest, getReady }}>
        <Waiting />
      </OnlineMatchContext.Provider>
    )
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
