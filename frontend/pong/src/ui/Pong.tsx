import { AspectRatio, DefaultHeight, DefaultWidth, FPS } from '../config'
import { consumeFrame, onlineGameStart } from '../service'
import { ContainerSize } from './container'
import { makeP5Canvas } from './p5canvas'

const setupCanvas = () => {
  p.createCanvas(DefaultWidth, DefaultHeight)
  p.frameRate(FPS)

  resizeCanvas()
  onlineGameStart()
}

const resizeCanvas = () => {
  const canvas = document.getElementsByTagName('canvas')[0]
  canvas.style.width = '100%'
  canvas.style.height = '100%'
}

export const getCanvasContainerSize = ({ width, height }: ContainerSize) => {
  if (width > height) {
    return {
      width: height * AspectRatio,
      height,
    }
  } else {
    return {
      width,
      height: width / AspectRatio,
    }
  }
}

export const GameCanvas = makeP5Canvas({
  setup: setupCanvas,
  draw: consumeFrame,
})
