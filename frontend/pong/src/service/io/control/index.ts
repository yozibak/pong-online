import { inputBuffer } from '../../../domain'

export const detectControl = () => {
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
