import { PlayerCommand, PlayerNumber } from "../../data/types"
import { NetworkPayload } from "../output"

export const makeInputBuffer = (playerNumber: PlayerNumber = 1) => {
  let networkPayload: NetworkPayload | null = null
  const localInput: { [k in PlayerNumber]: PlayerCommand } = {
    1: 'still',
    2: 'still'
  }
  return {
    pushNetworkPayload: (payload: NetworkPayload) => {
      networkPayload = payload
    },
    pushLocalInput: (input: PlayerCommand, pn = playerNumber) => {
      localInput[pn] = input
    },
    get latestInputs() {
      return {
        networkPayload, localInput
      }
    },
    set playerNumber(pn: PlayerNumber) {
      playerNumber = pn
    }
  }
}
