import { PlayerNumber } from '../../data/types'
import { Params } from './types'

export const initGameID = (
  playerNumber: PlayerNumber,
  urlParams = new URLSearchParams(window.location.search)
): string => {
  const id = urlParams.get(Params.GameID)
  if (playerNumber === 1) {
    return getRandomGameId()
  } else {
    if (!id) throw Error(`gameID should be given`)
    return id
  }
}

export const getRandomGameId = (() => {
  const id = `g${Math.floor(Math.random() * 1000)}`
  return () => id
})()
