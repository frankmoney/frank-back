import InputTypeFieldType from './InputTypeFieldType'

export default class InputTypeField {
  public readonly config: {
    readonly type: InputTypeFieldType
    readonly nullable: boolean
    readonly defaultValue: any
  }

  public constructor({
    type,
    nullable,
    defaultValue,
  }: {
    type: InputTypeFieldType
    nullable: boolean
    defaultValue?: any
  }) {
    this.config = {
      type,
      nullable,
      defaultValue,
    }
  }
}
