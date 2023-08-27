import {
  isValidDuration,
  isValidGenres,
  validateAndExtractGetMoviesQuery
} from '../movies.helpers'

describe('isValidDuration', () => {
  it('should return true for valid duration', () => {
    expect(isValidDuration(10)).toBe(true)
  })

  it('should return false for invalid duration', () => {
    expect(isValidDuration(-5)).toBe(false)
    expect(isValidDuration('test')).toBe(false)
    expect(isValidDuration(null)).toBe(false)
  })
})

describe('isValidGenres', () => {
  it('should return true for valid genres', () => {
    expect(isValidGenres(['Action', 'Adventure'])).toBe(true)
  })

  it('should return false for invalid genres', () => {
    expect(isValidGenres([])).toBe(false)
    expect(isValidGenres('string')).toBe(false)
    expect(isValidGenres(null)).toBe(false)
  })
})

describe('validateAndExtractGetMoviesQuery', () => {
  it('should validate and extract query correctly', () => {
    const result = validateAndExtractGetMoviesQuery('10', ['Action', 'Adventure'])
    expect(result.duration).toBe(10)
    expect(result.genres).toEqual(['Action', 'Adventure'])
  })

  it('should return error for invalid duration', () => {
    const result = validateAndExtractGetMoviesQuery('-5', ['Action', 'Adventure'])
    expect(result.error).toBe('Incorrect duration value')
  })

  it('should return error for invalid genres', () => {
    const result = validateAndExtractGetMoviesQuery('10', [])
    expect(result.error).toBe('Incorrect genres value')
  })
})
