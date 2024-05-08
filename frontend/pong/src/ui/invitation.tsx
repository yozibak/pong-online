import qrcode from 'qrcode'
import { useContext, useEffect, useRef } from 'react'
import { getInvitationLink } from '../service/params'
import { OnlineMatchContext } from './entrance'

export const Invitation = () => {
  const { gameID } = useContext(OnlineMatchContext)
  const invitationLink = getInvitationLink(gameID)
  return (
    <div
      onClick={() => copyToClipboard(invitationLink)}
      style={{ fontStyle: 'italic', padding: '2em', fontSize: '.75rem' }}
    >
      <div>Send the invitation link:</div>
      <QRCode link={invitationLink} />
      <div style={{ cursor: 'pointer', textDecoration: 'underline' }}>{invitationLink}</div>
    </div>
  )
}

const QRCode = ({ link }: { link: string }) => {
  const ref = useRef<HTMLCanvasElement>(null)
  useEffect(() => {
    if (!ref.current) return
    qrcode.toCanvas(ref.current, link, { width: 200 })
  }, [ref, link])
  return (
    <div style={{ padding: '1em' }}>
      <canvas ref={ref}></canvas>
    </div>
  )
}

const copyToClipboard = async (link: string) => {
  await navigator.clipboard.writeText(link)
  alert('copied the invitation link 😎')
}
