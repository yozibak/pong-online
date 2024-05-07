import { useEffect } from 'react'
import { receiveGuestJoinAndDecideStartTime, receiveGameStartTimeEvent } from '../domain/match'
import { EventSignal, getNetworkPayload } from '../domain/output'
import { network } from '../service'
import { sendDataToServer } from '../service/network'
import { Invitation } from './invitation'

export const Waiting: React.FC<{ isGuest: boolean; getReady: () => void }> = ({
  isGuest,
  getReady,
}) => {
  if (isGuest) return <WaitingAsGuest getReady={getReady} />
  else return <WaitingAsHost getReady={getReady} />
}

const WaitingAsHost: React.FC<{ getReady: () => void }> = ({ getReady }) => {
  useEffect(() => {
    network.updateHandler(async (d) => {
      receiveGuestJoinAndDecideStartTime(d.signal) // 2
      getReady()
    })
  }, [getReady])
  return (
    <div style={{ width: '100%', fontSize: '1rem˝',  }}>
      <div style={{ fontSize: '1.1rem' }}>Waiting for player 2 😌</div>
      <Invitation />
    </div>
  )
}

const WaitingAsGuest: React.FC<{ getReady: () => void }> = ({ getReady }) => {
  useEffect(() => {
    declareJoinToTheHost() // 1
  }, [])
  useEffect(() => {
    network.updateHandler(async (d) => {
      receiveGameStartTimeEvent(d.signal) // 3
      getReady()
    })
  }, [getReady])
  return <div>Requesting a match...</div>
}

const declareJoinToTheHost = () => {
  sendDataToServer({
    ...getNetworkPayload(),
    signal: EventSignal.JOIN,
  })
}
