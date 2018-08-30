export type Lazy<T> = () => T

export const lazy = <T>(factory: () => T): Lazy<T> => {
  let result: T
  let flag = false
  return () => {
    if (!flag) {
      result = factory()
      flag = true
    }
    return result
  }
}
