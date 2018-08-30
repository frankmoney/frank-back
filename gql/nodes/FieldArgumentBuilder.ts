import FieldArgumentBuilderType from './FieldArgumentBuilderType'
import FieldArgumentType from './FieldArgumentType'

export default class FieldArgumentBuilder {
  public ofType(type: FieldArgumentType): FieldArgumentBuilderType {
    return new FieldArgumentBuilderType({ type, nullable: false })
  }
}
