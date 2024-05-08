import { useContext, useEffect } from 'react'
import { receiveGuestJoinAndDecideStartTime, receiveGameStartTimeEvent } from '../domain/match'
import { EventSignal, getNetworkPayload } from '../domain/output'
import { network } from '../service'
import { sendDataToServer } from '../service/network'
import { Invitation } from './invitation'
import { OnlineMatchContext } from './entrance'

export const Waiting: React.FC = () => {
  const { isGuest } = useContext(OnlineMatchContext)
  if (isGuest) return <WaitingAsGuest />
  else return <WaitingAsHost />
}

const WaitingAsHost: React.FC = () => {
  const { getReady } = useContext(OnlineMatchContext)
  useEffect(() => {
    network.updateHandler(async (d) => {
      receiveGuestJoinAndDecideStartTime(d.signal) // 2
      getReady()
    })
  }, [getReady])
  return (
    <div style={{ width: '100%', fontSize: '1rem˝' }}>
      <div style={{ fontSize: '1.1rem' }}>Waiting for player 2 😌</div>
      <Invitation />
    </div>
  )
}

const WaitingAsGuest: React.FC = () => {
  const { getReady } = useContext(OnlineMatchContext)
  useEffect(() => {
    declareJoinToTheHost() // 1
  }, [])
  useEffect(() => {
    network.updateHandler(async (d) => {
      receiveGameStartTimeEvent(d.signal) // 3
      getReady()
    })
  }, [getReady])
  return <div>loading...</div>
}

const declareJoinToTheHost = () => {
  sendDataToServer({
    ...getNetworkPayload(),
    signal: EventSignal.JOIN,
  })
}
