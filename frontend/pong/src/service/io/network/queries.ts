export const sendData = /* GraphQL */ `
  mutation MyMutation(
    $ball: BallInput!
    $bar: BarInput!
    $frameCount: Int!
    $gameID: String!
    $playerNumber: Int!
    $score: ScoreInput!
  ) {
    sendData(
      bar: $bar
      frameCount: $frameCount
      gameID: $gameID
      playerNumber: $playerNumber
      ball: $ball
      score: $score
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
    }
  }
`

export const sendHandShake = /* GraphQL */ `
  mutation MyMutation($body: String!, $gameID: String!, $playerNumber: Int!) {
    sendHandShake(body: $body, gameID: $gameID, playerNumber: $playerNumber) {
      body
      gameID
      playerNumber
    }
  }
`

export const subscribeHandShake = /* GraphQL */ `
  subscription MySubscription($gameID: String!, $playerNumber: Int!) {
    subscribeHandShake(gameID: $gameID, playerNumber: $playerNumber) {
      body
      gameID
      playerNumber
    }
  }
`
