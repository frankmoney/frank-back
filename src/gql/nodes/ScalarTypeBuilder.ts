import ScalarTypeBuilderSerialize from './ScalarTypeBuilderSerialize'

export default class ScalarTypeBuilder<TInternal, TExternal> {
  public readonly name: string

  public constructor(name: string) {
    this.name = name
  }

  public serialize(
    serialize: (value: any) => TExternal
  ): ScalarTypeBuilderSerialize<TInternal, TExternal> {
    return new ScalarTypeBuilderSerialize<TInternal, TExternal>({
      name: this.name,
      serialize,
    })
  }
}
