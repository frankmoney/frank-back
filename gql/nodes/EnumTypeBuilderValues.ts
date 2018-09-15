import EnumType from './EnumType'

const convertValueArray = (values: string[]) => {
  const result: { [name: string]: {} } = {}
  for (const value of values) {
    result[value] = {}
  }
  return result
}

export default class EnumTypeBuilderValues<T extends string> extends EnumType {
  public readonly keys: T[]
  public readonly values: { [name in T]: T }

  public constructor(name: string, values: T[]) {
    super({
      name,
      values: convertValueArray(values),
    })

    this.keys = values
    this.values = <{ [valueName in T]: T }>{}
    for (const value of values) {
      this.values[value] = value
    }
  }
}
