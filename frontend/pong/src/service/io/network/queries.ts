export const sendData = /* GraphQL */ `
  mutation MyMutation(
    $ball: BallInput!
    $bar: BarInput!
    $frameCount: Int!
    $gameID: String!
    $playerNumber: Int!
    $score: ScoreInput!
    $signal: String
  ) {
    sendData(
      bar: $bar
      frameCount: $frameCount
      gameID: $gameID
      playerNumber: $playerNumber
      ball: $ball
      score: $score
      signal: $signal
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
      score {
        one
        two
      }
      frameCount
      gameID
      playerNumber
      signal
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
      score {
        one
        two
      }
      gameID
      playerNumber
      frameCount
      signal
    }
  }
`
