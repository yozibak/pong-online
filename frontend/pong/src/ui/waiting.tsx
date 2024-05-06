import qrcode from 'qrcode'
import { useEffect, useRef } from 'react'
import { onlineMatchEvent } from '../domain/events'
import { EventSignal, NetworkPayload, getNetworkPayload } from '../domain/output'
import { network } from '../service'
import { sendDataToServer } from '../service/io/network'

const genInvitationLink = () => `${window.location.origin}/?player=2`

const onHandShake1 = (d: NetworkPayload) => {
  if (d.signal !== EventSignal.JOIN) return
  onlineMatchEvent()
}

const onHandShake2 = (d: NetworkPayload) => {
  const startTime = Number(d.signal)
  onlineMatchEvent(startTime)
}

export const useJoinAsGuest = (isGuest: boolean) => {
  useEffect(() => {
    if (!isGuest) return
    sendDataToServer({
      ...getNetworkPayload(),
      signal: EventSignal.JOIN,
    })
  }, [isGuest])
}

export const useHandShake = (isGuest: boolean, getReady: () => void) => {
  useEffect(() => {
    network.updateHandler(async (d) => {
      if (isGuest) {
        onHandShake2(d)
      } else {
        onHandShake1(d)
      }
      getReady()
    })
  }, [isGuest, getReady])
}

export const Waiting: React.FC<{ isGuest: boolean; getReady: () => void }> = ({
  isGuest,
  getReady,
}) => {
  useHandShake(isGuest, getReady)
  useJoinAsGuest(isGuest)
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

const QRCode = ({ link }: { link: string }) => {
  const ref = useRef<HTMLCanvasElement>(null)
  useEffect(() => {
    if (!ref.current) return
    qrcode.toCanvas(ref.current, link)
  }, [ref, link])
  return <canvas ref={ref}></canvas>
}

const copyToClipboard = async (link: string) => {
  await navigator.clipboard.writeText(link)
  alert('copied the invitation link 😎')
}
