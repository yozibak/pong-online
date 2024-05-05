import { inputBuffer } from '../../../domain'

const isMobile = () => {
  return window.innerWidth < 768
}

export const detectControl = () => {
  if (isMobile()) {
    // detectTouch()
  } else {
    detectKey()
  }
}

const detectKey = () => {
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

const detectTouch = () => {
  if (p.mouseX > (window.innerWidth * 2) / 3) {
    inputBuffer.pushLocalInput('up')
  } else if (p.mouseX < window.innerWidth / 3) {
    inputBuffer.pushLocalInput('down')
  } else {
    inputBuffer.pushLocalInput('still')
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
