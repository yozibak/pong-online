import { useState } from 'react'
import pjson from '../package.json'
import { Pong } from './ui/Pong'
import { Container } from './ui/container'
import { Control } from './ui/control'
import { Entrance } from './ui/entrance'
import { CanvasSize } from './ui/p5canvas'

const VERSION = pjson.version

const PongGame: React.FC<{ size: CanvasSize }> = ({ size }) => {
  const [ready, setReady] = useState(false)
  return (
    <Container size={size}>
      {ready ? (
        <>
          <Pong size={size} />
          <Control />
        </>
      ) : (
        <Entrance version={VERSION} getReady={() => setReady(true)} />
      )}
    </Container>
  )
}

export default PongGame
