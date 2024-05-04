export const sendData = /* GraphQL */ `
  mutation MyMutation(
    $ball: BallInput!
    $bar: BarInput!
    $frameCount: Int!
    $gameID: String!
    $playerNumber: Int!
  ) {
    sendData(
      bar: $bar
      frameCount: $frameCount
      gameID: $gameID
      playerNumber: $playerNumber
      ball: $ball
    ) {
      ball {
        missed
        movement {
          x
          y
        }
        position {
          x
          y
        }
      }
      bar {
        command
        position {
          x
          y
        }
      }
      frameCount
      gameID
      playerNumber
    }
  }
`

export const subscribeGame = /* GraphQL */ `
  subscription MySubscription($gameID: String!, $playerNumber: Int!) {
    subscribeGame(gameID: $gameID, playerNumber: $playerNumber) {
      ball {
        missed
        movement {
          x
          y
        }
        position {
          x
          y
        }
      }
      bar {
        command
        position {
          x
          y
        }
      }
      gameID
      playerNumber
      frameCount
    }
  }
`
