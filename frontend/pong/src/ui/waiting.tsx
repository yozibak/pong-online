import { useEffect, useRef } from 'react'
import { HandShakeData, sendHandShakeData, startHandShakeSubscription } from '../service/io/network'
import { GameID } from '../config'
import { onlineMatchEvent } from '../domain/events'
import qrcode from 'qrcode'

const genInvitationLink = () => `${window.location.origin}/?player=2`

const onHandShake = async (d: HandShakeData) => {
  if (d.body === 'Player2Joined') {
    // player 1
    const startTime = onlineMatchEvent()
    await sendHandShakeData({
      gameID: GameID,
      playerNumber: 1,
      body: startTime.toString(),
    })
  } else {
    // player 2
    const startTime = Number(d.body)
    onlineMatchEvent(startTime)
  }
}

export const Waiting: React.FC<{ isGuest: boolean; getReady: () => void }> = ({
  isGuest,
  getReady,
}) => {
  useEffect(() => {
    const subscription = startHandShakeSubscription(GameID, isGuest ? 1 : 2, async (d) => {
      await onHandShake(d)
      getReady()
    })
    return () => {
      subscription.unsubscribe()
    }
  }, [isGuest, getReady])
  useEffect(() => {
    let unmounted = false
    if (isGuest) {
      if (unmounted) return
      sendHandShakeData({
        gameID: GameID,
        playerNumber: 2,
        body: 'Player2Joined',
      })
    }
    return () => {
      unmounted = true
    }
  }, [isGuest])
  return (
    <div>
      <h1>Waiting for another player...</h1>
      <Invitation invitationLink={genInvitationLink()} />
    </div>
  )
}

export const Invitation = ({ invitationLink }: { invitationLink: string }) => {
  return (
    <div
      onClick={() => copyToClipboard(invitationLink)}
      style={{ fontSize: '0.88rem', fontStyle: 'italic' }}
    >
      <div style={{ cursor: 'pointer' }}>🔗 INVITATION LINK: {invitationLink}</div>
      <QRCode link={invitationLink} />
    </div>
  )
}

const QRCode = ({link}: {link: string}) => {
  const ref = useRef<HTMLCanvasElement>(null)
  useEffect(() => {
    if (!ref.current) return
    qrcode.toCanvas(ref.current, link)
  }, [ref, link])
  return (
    <canvas ref={ref}></canvas>
  )
}

const copyToClipboard = async (link: string) => {
  await navigator.clipboard.writeText(link)
  alert('copied the invitation link 😎')
}
