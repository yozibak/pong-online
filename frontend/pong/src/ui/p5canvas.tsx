import p5 from 'p5'
import { useEffect, useRef, useState } from 'react'
import { ContainerSize } from './container'

declare global {
  var p: p5 // eslint-disable-line
}

type Sketch = {
  setup: () => void
  draw: () => void
}

export const makeP5Canvas =
  (sketch: Sketch): React.FC<{ size: ContainerSize }> =>
  ({ size }) => {
    const [canvas, setCanvas] = useState<p5>()
    const containerRef = useRef<HTMLDivElement>(null)

    let mount = false
    useEffect(() => {
      if (containerRef.current && !canvas) {
        if (!mount) {
          setCanvas(new p5(makeSketch(sketch), containerRef.current))
          mount = true
        }
      }
      return () => {
        canvas && canvas.remove()
      }
    }, [containerRef])

    return <div style={styles(size)} ref={containerRef} />
  }

const makeSketch = (s: Sketch) => (p: p5) => {
  globalThis.p = p
  p.setup = () => s.setup()
  p.draw = () => s.draw()
}

const styles = ({ width, height }: ContainerSize): React.CSSProperties => ({
  zIndex: 10,
  width: width,
  height: height,
})
