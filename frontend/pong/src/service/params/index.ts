import { PlayerNumber } from '../../data/types'
import { Params } from './types'

export const getInvitationLink = (gameID: string) => {
  return `${window.location.origin}/?${Params.GameID}=${gameID}&${Params.PlayerNumber}=2`
}

export const getPlayerNumberFromParams = (): PlayerNumber => {
  const urlParams = new URLSearchParams(window.location.search)
  const number = Number(urlParams.get(Params.PlayerNumber))
  if (number === 1 || number === 2) return number
  return 1
}
