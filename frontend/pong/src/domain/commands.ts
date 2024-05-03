import { PlayerCommand, PlayerNumber } from '../data/types'

export interface CommandManager {
  playerNumber: PlayerNumber
  command: PlayerCommand
  update: (command: PlayerCommand) => void
}

export const makeCommandBuffer = (playerNumber: PlayerNumber): CommandManager => {
  let command: PlayerCommand = null
  return {
    get playerNumber() {
      return playerNumber
    },
    get command() {
      return command
    },
    update(newCommand) {
      command = newCommand
    },
  }
}

export const buffer1 = makeCommandBuffer(1)
export const buffer2 = makeCommandBuffer(2)
