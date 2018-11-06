export const throwArgumentError = () => {
  throw new Error('ArgumentError')
}

export const argumentError = (name: string, value?: any) =>
  new Error(
    value === undefined
      ? `Invalid argument "${name}"`
      : `Invalid argument "${name}" value: ${value}`
  )
