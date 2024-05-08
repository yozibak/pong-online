# 🏓 pong-online
![pong](https://github.com/yozibak/pong-online/assets/58211188/71751680-9bfe-437d-b9f9-a759fa18c747)

Online multi-player classic pong game. 

## How to Play

1. visit [https://www.play-pong-online.site/](https://www.play-pong-online.site/)
2. click PLAY
3. send the invitation link to your friend
4. when your friend joins, the match starts🔥
5. play till you win😤

## Motivation

I wanted to play pong with my partner in long-distance. We didn't find any on the Internet. So I decided to build one.

I also wanted to try things further with my Full-stack SAM application pattern blueprint (https://github.com/yozibak/serverless-chat)

## Development

```sh
# Install deps
pnpm i

# Deploy backend resources to dev environment
pnpm deploy:backend # -> prints API endpoint url

# Create .env
cd frontend/app
cp .env.default .env # <- write API endpoint url & key

# Run frontend
pnpm dev

# Optionally, you can deploy your frontend build onto dev s3 bucket
pnpm deploy:frontend
```

## Design

### Match

```mermaid
sequenceDiagram
	actor player1
	participant server
	actor player2
	
	player1 ->> player1: initiate game as a host
	player1 ->> server: subscribe
	player1 ->> player2: send invitation link or show QR
	player2 ->> player2: access the game
	player2 ->> server: subscribe
	player2 ->> server: initial message
	server -->> player1: receive initial message
	player1 ->> player1: locally set the start time
	player1 ->> server: start sending starting time constantly
	server -->> player2: receive starting time
	
	rect rgb(80, 80, 80)
		player1 --> player2: waiting, set up initial state and stuff
	end
	rect rgb(100,100,100)
		player1 --> player2: start game at time, counting frames
	end
```

### Process

```mermaid
sequenceDiagram
	actor player1 as player1(local)
	participant server
	actor player2 as player2(opponent)
	

	loop frame at n-x
	player2 ->> server: send state payload
	server -->> player1: receive opponent's state as frame[n-x]
	note right of player1: save the payload
	end
	loop frame at n
		player1 ->> player1: import input & get snapshot
		note right of player1: combine network state & local
		alt if ball is on p1 side 
			player1 ->> player1: calc next ball position based on local data
		else
			player1 ->> player1: calc next ball position based on network data
		end
		player1 ->> server: send final state as frame[n]
		server -->>player2: receive state
		player1 ->> player1: render state
	end
```

### Frame resolution

|  | player bar | opponent’s bar | ball |
| --- | --- | --- | --- |
| when ball is on player's side | once | recursive | once |
| when ball is on opponent's side | once | recursive | recursive |

```mermaid
flowchart LR
	localInput --> merged
	localSnapshot --> receiverState
	networkPayload --> receiverState
	receiverState --> merged
	merged --recursively resolve frames--> finalSnapshot
```



## Deployment / CICD

You can basically deploy to your AWS environment by selecting `test` or `prod` as `sam deploy --config-env` just as same as `dev` environment.

To setup CICD, follow steps below. 

### Prerequisite: Create Github Connection

Go to AWS console -> Pipeline -> Settings -> Create connection

Select your repository & create connection. Copy the connection ARN. 

### Deploy Pipeline and other resources

Once Github connection is created, deploy pipeline by running:

```sh
sam deploy 
    \--config-env pipeline 
    \--parameter-overrides ConnectionArn=GITHUB_CONN_ARN,FullRepositoryId=<username>/<repository_name>
```

### Pipeline overview

The entire stages and actions are as follows:

```mermaid
flowchart TD
  subgraph Source
    ConnectionArn
  end
  subgraph Build
    BuildStack
  end
  subgraph Test
    deployStackTest(DeployStack)
    buildFrontTest(BuildFrontEnd)
    test(TestApplication)
    deployTest(DeployFrontEnd)
    
    BuildArtifactAsZip --> deployStackTest
    deployStackTest --stack info --> buildFrontTest
    buildFrontTest --build--> test
    buildFrontTest --build--> deployTest
  end
  subgraph Deploy
    deployStackProd(DeployStack)
    buildFrontProd(BuildFrontEnd)
    deployProd(DeployFrontEnd)
    deployStackProd --stack info --> buildFrontProd
    buildFrontProd --build--> deployProd
  end
  Source --✅--> Build
  Build --✅--> Test
  Test --✅--> Deploy
```
