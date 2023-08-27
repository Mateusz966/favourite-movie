import { generateRandomNumberInRange } from './generateRandomNumberInRange'

describe('generateRandomNumberInRange', () => {
  it('generates a random number within the specified range', () => {
    const min = 5
    const max = 10
    const randomNumber = generateRandomNumberInRange(min, max)

    expect(randomNumber).toBeGreaterThanOrEqual(min)
    expect(randomNumber).toBeLessThanOrEqual(max)
  })

  it('generates a random number within the specified range multiple times', () => {
    const min = 1
    const max = 3
    const numberOfTests = 1000

    for (let i = 0; i < numberOfTests; i++) {
      const randomNumber = generateRandomNumberInRange(min, max)
      expect(randomNumber).toBeGreaterThanOrEqual(min)
      expect(randomNumber).toBeLessThanOrEqual(max)
    }
  })
})
