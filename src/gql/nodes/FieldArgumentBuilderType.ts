import FieldArgument from './FieldArgument'

export default class FieldArgumentBuilderType extends FieldArgument {
  public nullable(nullable?: boolean): FieldArgumentBuilderType {
    return new FieldArgumentBuilderType({
      ...this.config,
      nullable: nullable !== false,
    })
  }

  public default(defaultValue?: any) {
    return new FieldArgumentBuilderType({
      ...this.config,
      defaultValue,
    })
  }
}
