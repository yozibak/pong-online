import { store } from '../../../data'
import { inputBuffer } from '../../../domain'

export const isMobile = () => {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
}

export const detectKeyControl = () => {
  if (isMobile()) return
  if (store.current.playMode === 'online-multi') {
    detectOnlineKey()
  } else {
    detectOfflineKey()
  }
}

const detectOnlineKey = () => {
  if (p.keyIsDown(p.UP_ARROW)) {
    inputBuffer.pushLocalInput('up')
  } else if (p.keyIsDown(p.DOWN_ARROW)) {
    inputBuffer.pushLocalInput('down')
  } else {
    inputBuffer.pushLocalInput('still')
  }
}

const detectOfflineKey = () => {
  if (isKeyDown('w')) {
    inputBuffer.pushLocalInput('up', 1)
  } else if (isKeyDown('s')) {
    inputBuffer.pushLocalInput('down', 1)
  } else {
    inputBuffer.pushLocalInput('still', 1)
  }
  if (isKeyDown('o')) {
    inputBuffer.pushLocalInput('up', 2)
  } else if (isKeyDown('k')) {
    inputBuffer.pushLocalInput('down', 2)
  } else {
    inputBuffer.pushLocalInput('still', 2)
  }
}

const KeyCodes = {
  w: 87,
  s: 83,
  o: 79,
  k: 75,
} as const

const isKeyDown = (key: keyof typeof KeyCodes) => {
  return p.keyIsDown(KeyCodes[key])
}
