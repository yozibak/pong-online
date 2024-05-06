import { AspectRatio, DefaultHeight, DefaultWidth, FPS } from '../config'
import { onlineGameStart, consumeFrame } from '../service'
import { CanvasSize, makeP5Canvas } from './p5canvas'

const setupCanvas =
  ({ width, height }: CanvasSize) =>
  () => {
    p.createCanvas(DefaultWidth, DefaultHeight)
    p.frameRate(FPS)

    resizeCanvas(width, height)
    onlineGameStart()
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

export const Pong = makeP5Canvas({
  setup: setupCanvas,
  draw: consumeFrame,
})
