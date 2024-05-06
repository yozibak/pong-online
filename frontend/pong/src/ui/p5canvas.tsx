import p5 from 'p5'
import { useEffect, useRef, useState } from 'react'

declare global {
  var p: p5 // eslint-disable-line
}

type Sketch = {
  setup: (size: CanvasSize) => () => void
  draw: () => void
}

export type CanvasSize = {
  width: number
  height: number
}

export const makeP5Canvas =
  (sketch: Sketch): React.FC<{ size: CanvasSize }> =>
  ({ size }) => {
    const [canvas, setCanvas] = useState<p5>()
    const canvasRef = useRef<HTMLDivElement>(null)

    let mount = false
    useEffect(() => {
      if (canvasRef.current && !canvas) {
        if (!mount) {
          setCanvas(new p5(makeSketch(sketch, size), canvasRef.current))
          mount = true
        }
      }
      return () => {
        canvas && canvas.remove()
      }
    }, [canvasRef])

    return <div style={styles} ref={canvasRef} />
  }

const makeSketch = (s: Sketch, size: CanvasSize) => (p: p5) => {
  globalThis.p = p
  p.setup = s.setup(size)
  p.draw = () => s.draw()
}

const styles: React.CSSProperties = {
  position: 'relative',
  zIndex: 10,
  width: '100%',
  height: '100%',
  overflow: 'hidden',
  backgroundColor: 'rgba(0,0,0,0.9)',
  margin: '0 auto',
  touchAction: 'manipulation',
  overflowX: 'hidden',
  overflowY: 'hidden',
  overscrollBehavior: 'none',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
}
