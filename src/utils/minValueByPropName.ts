export const minValueByPropName = <T>(data: T[], propName: keyof T): T => {
  return data.reduce((prev, current) => (prev[propName] < current[propName]) ? prev : current)
}