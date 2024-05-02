import { getMiddleByX, reflectDiff } from './position'

test.each([
  [4, 16],
  [15, 15],
  [410, 390],
])(`${reflectDiff.name}`, (val, expected) => {
  expect(reflectDiff(val, 10, 400)).toBe(expected)
})

test.each([
  [{ x: 380, y: 200 }, { x: 420, y: 240 }, 400, 220],
  [{ x: 25, y: 200 }, { x: 15, y: 240 }, 20, 220],
])(`${getMiddleByX.name}`, (position, next, middleX, expectedY) => {
  expect(getMiddleByX(position, next, middleX)).toMatchObject({ x: middleX, y: expectedY })
})
