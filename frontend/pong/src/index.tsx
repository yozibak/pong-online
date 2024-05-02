import pjson from '../package.json'
import { FPS } from './config'
import { makeP5Canvas } from './p5canvas'
import { Interface } from './service/interface'
import { renderState } from './service/render'
import { CanvasSize } from './types'

const setup =
  ({ width, height }: CanvasSize) =>
  () => {
    p.createCanvas(width, height)
    p.angleMode(p.DEGREES)
    p.frameRate(FPS)
    p.pixelDensity(1)
  }

const VERSION = pjson.version

const Pong = makeP5Canvas({
  setup,
  draw: renderState,
})

const PongGame: React.FC<{ size: CanvasSize }> = ({ size }) => (
  <>
    <Pong size={size}>
      <Interface version={VERSION} />
    </Pong>
  </>
)

export default PongGame
