import { buffer1, buffer2 } from '../../domain/commands'

export const detectControl = () => {
  detectKeys()
}

const detectKeys = () => {
  if (isKeyDown('w')) {
    buffer1.update({
      upDown: 'up',
    })
  } else if (isKeyDown('s')) {
    buffer1.update({
      upDown: 'down',
    })
  } else {
    buffer1.update({
      upDown: null,
    })
  }
  if (isKeyDown('o')) {
    buffer2.update({
      upDown: 'up',
    })
  } else if (isKeyDown('k')) {
    buffer2.update({
      upDown: 'down',
    })
  } else {
    buffer2.update({
      upDown: null
    })
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
