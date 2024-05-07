import { useState } from 'react'
import pjson from '../package.json'
import { GameCanvas, getCanvasContainerSize } from './ui/Pong'
import { Container, ContainerSize } from './ui/container'
import { Entrance } from './ui/entrance'
import { MobileControl } from './ui/control'

const VERSION = pjson.version

const PongGame: React.FC<{ size: ContainerSize }> = ({ size }) => {
  const [ready, setReady] = useState(false)
  return (
    <Container size={size}>
      {ready ? (
        <>
          <GameCanvas size={getCanvasContainerSize(size)} />
          <MobileControl />
        </>
      ) : (
        <Entrance version={VERSION} getReady={() => setReady(true)} />
      )}
    </Container>
  )
}

export default PongGame
