import Pong from 'pong'
import { AppContainer } from './container'

export default () => {
  const size = determineAppSize()
  return (
    <AppContainer>
      <Pong size={size} />
    </AppContainer>
  )
}

const determineAppSize = () => {
  const width = Math.min(window.innerWidth, 1000)
  const height = width > 800 ? width / (4 / 3) : (width * 4) / 3
  return {
    width,
    height: height,
  }
}
