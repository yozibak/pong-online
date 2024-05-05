import { PlayerCommand, PlayerNumber } from '../../data/types'
import { NetworkPayload } from '../output'

type InputBuffer = ReturnType<typeof makeInputBuffer>
export type LatestInputs = ReturnType<InputBuffer['getLatestInputs']>

export const makeInputBuffer = (playerNumber: PlayerNumber = 1) => {
  const networkBuffer = makeNetworkBuffer()
  const localInput: { [k in PlayerNumber]: PlayerCommand } = {
    1: 'still',
    2: 'still',
  }
  return {
    pushNetworkPayload: (payload: NetworkPayload): void => {
      networkBuffer.push(payload)
    },
    pushLocalInput: (input: PlayerCommand, pn = playerNumber) => {
      localInput[pn] = input
    },
    getLatestInputs(frameCount: number) {
      return {
        networkPayload: networkBuffer.get(frameCount),
        localInput,
      }
    },
    set playerNumber(pn: PlayerNumber) {
      playerNumber = pn
    },
    get playerNumber() {
      return playerNumber
    },
  }
}

export const makeNetworkBuffer = () => {
  const buffer: NetworkPayload[] = []
  return {
    push: (payload: NetworkPayload) => {
      buffer.push(payload)
    },
    get: (frameCount: number): NetworkPayload | null => {
      const idx = buffer.findLastIndex((pl) => pl.frameCount <= frameCount)
      if (idx !== -1) {
        const payload = buffer[idx]
        buffer.splice(0, buffer.length - idx)
        return payload
      }
      return null
    },
    get length() {
      return buffer.length
    },
  }
}
