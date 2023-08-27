export const maxValueByPropName = <T>(data: T[], propName: keyof T): T | undefined => {
  if (data?.length === 0) return
  return data?.reduce?.((prev, current) => (prev[propName] > current[propName]) ? prev : current)
}
