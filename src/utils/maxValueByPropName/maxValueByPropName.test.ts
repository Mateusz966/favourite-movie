import { maxValueByPropName } from './maxValueByPropName' // Replace with the actual path to your utils file

describe('maxValueByPropName', () => {
  it('should return the object with the maximum value of the specified property', () => {
    const data = [
      { id: 1, value: 5 },
      { id: 2, value: 10 },
      { id: 3, value: 7 }
    ]

    const result = maxValueByPropName(data, 'value')

    expect(result).toEqual({ id: 2, value: 10 })
  })

  it('should handle an empty array', () => {
    const emptyArray: [] = []
    const result = maxValueByPropName(emptyArray, 'value')

    expect(result).toBeUndefined()
  })

  it('should handle objects with missing property', () => {
    const data = [
      { id: 1, value: 5 },
      { id: 2 },
      { id: 3, value: 7 }
    ]

    const result = maxValueByPropName(data, 'value')

    expect(result).toEqual({ id: 3, value: 7 })
  })
})
