import InputTypeField from './InputTypeField'

export default class InputTypeFieldBuilderType extends InputTypeField {
  public nullable(nullable?: boolean): InputTypeFieldBuilderType {
    return new InputTypeFieldBuilderType({
      ...this.config,
      nullable: nullable !== false,
    })
  }

  public default(defaultValue: any): InputTypeFieldBuilderType {
    return new InputTypeFieldBuilderType({
      ...this.config,
      defaultValue,
    })
  }
}
