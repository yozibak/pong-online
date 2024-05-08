import { getRandomGameId, initGameID } from './gameID'

describe(`${initGameID.name}`, () => {
  it(`should reset id when player is 1 (host)`, () => {
    const params = {
      get: jest.fn(),
      set: jest.fn(),
    } as unknown as URLSearchParams
    jest.spyOn(params, 'get').mockReturnValue('some-existing-id')
    const gameID = initGameID(1, params)
    expect(gameID).not.toBe('some-existing-id')
  })
  it(`should read given gameID when player is 2 (guest)`, () => {
    const params = {
      get: jest.fn(),
      set: jest.fn(),
    } as unknown as URLSearchParams
    jest.spyOn(params, 'get').mockReturnValue('some-existing-id')
    const gameID = initGameID(2, params)
    expect(gameID).toBe('some-existing-id')
  })
})

test(`${getRandomGameId.name}`, () => {
  const id = getRandomGameId()
  expect(getRandomGameId()).toBe(id)
  expect(getRandomGameId()).toBe(id) // only once
})