import qrcode from 'qrcode'
import { useEffect, useRef } from 'react'

export const Invitation = () => {
  const invitationLink = `${window.location.origin}/?player=2`
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
