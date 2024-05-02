import { getMiddleYByRatio, getMiddleRatio, reflectDiff } from './position'

test.each([
  [4, 16],
  [15, 15],
  [410, 390],
])(`${reflectDiff.name}`, (val, expected) => {
  expect(reflectDiff(val, 10, 400)).toBe(expected)
})

test.each([
  [{ x: 380, y: 200 }, { x: 420, y: 240 }, 0.5, 220],
  [{ x: 25, y: 200 }, { x: 15, y: 240 }, 0.5, 220],
])(`${getMiddleYByRatio.name}`, (position, next, ratio, expectedY) => {
  expect(getMiddleYByRatio(position, next, ratio)).toBe(expectedY)
})

test.each([
  [{ x: 380, y: 200 }, { x: 420, y: 240 }, 400, 0.5],
  [{ x: 25, y: 200 }, { x: 15, y: 240 }, 20, 0.5],
])(`${getMiddleRatio.name}`, (position, next, middleX, ratio) => {
  expect(getMiddleRatio(position, next, middleX)).toBeCloseTo(ratio)
})
