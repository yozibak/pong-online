import pjson from '../package.json'
import { AspectRatio, DefaultHeight, DefaultWidth, FPS } from './config'
import { makeP5Canvas } from './p5canvas'
import { resolveFrame, setupServices } from './service'
import { CanvasSize } from './types'

const setup =
  ({ width, height }: CanvasSize) =>
  () => {
    p.createCanvas(DefaultWidth, DefaultHeight)
    p.frameRate(FPS)

    // resize
    const canvas = document.getElementsByTagName('canvas')[0]
    canvas.style.width = `${width / AspectRatio}px`
    canvas.style.height = `${height}px`

    setupServices()
  }

const VERSION = pjson.version

const Pong = makeP5Canvas({
  setup,
  draw: resolveFrame,
})

const PongGame: React.FC<{ size: CanvasSize }> = ({ size }) => (
  <>
    <Pong size={size} />
  </>
)

export default PongGame
