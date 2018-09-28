import FieldArgumentType from './FieldArgumentType'

export default class FieldArgument {
  public readonly config: {
    readonly type: FieldArgumentType
    readonly nullable: boolean
    readonly defaultValue: any
  }

  public constructor({
    type,
    nullable,
    defaultValue,
  }: {
    type: FieldArgumentType
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
