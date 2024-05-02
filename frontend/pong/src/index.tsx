import pjson from '../package.json'
import { DefaultHeight, DefaultWidth, FPS } from './config'
import { makeP5Canvas } from './p5canvas'
import { resolveFrame } from './service'
import { CanvasSize } from './types'

const setup =
  ({ width, height }: CanvasSize) =>
  () => {
    if (width < DefaultWidth || height < DefaultHeight) {
      throw Error(`size collision`)
    }
    p.createCanvas(DefaultWidth, DefaultHeight)
    p.angleMode(p.DEGREES)
    p.frameRate(FPS)
    p.pixelDensity(1)
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
