import EnumTypeBuilderValues from './EnumTypeBuilderValues'

export default class EnumTypeBuilder {
  public readonly name: string

  public constructor(name: string) {
    this.name = name
  }

  public values<T extends string>(values: T[]): EnumTypeBuilderValues<T> {
    return new EnumTypeBuilderValues<T>(this.name, values)
  }
}
