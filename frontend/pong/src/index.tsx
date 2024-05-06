import { useState } from 'react'
import pjson from '../package.json'
import { AspectRatio, DefaultHeight, DefaultWidth, FPS } from './config'
import { makeP5Canvas } from './p5canvas'
import { gameStart, resolveFrame } from './service'
import { CanvasSize } from './types'
import { Container } from './ui/container'
import { Control } from './ui/control'
import { Welcome } from './ui/welcome'

const VERSION = pjson.version

const setup =
  ({ width, height }: CanvasSize) =>
  () => {
    p.createCanvas(DefaultWidth, DefaultHeight)
    p.frameRate(FPS)

    resizeCanvas(width, height)
    gameStart()
  }

const resizeCanvas = (width: number, height: number) => {
  const canvas = document.getElementsByTagName('canvas')[0]
  if (width > height) {
    canvas.style.width = `${height * AspectRatio}px`
    canvas.style.height = `${height}px`
  } else {
    canvas.style.width = `${width}px`
    canvas.style.height = `${width / AspectRatio}px`
  }
}

const Pong = makeP5Canvas({
  setup,
  draw: resolveFrame,
})

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
        <Welcome version={VERSION} getReady={() => setReady(true)} />
      )}
    </Container>
  )
}

export default PongGame
