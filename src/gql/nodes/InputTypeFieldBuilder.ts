import InputTypeFieldBuilderType from './InputTypeFieldBuilderType'
import InputTypeFieldType from './InputTypeFieldType'

export default class InputTypeFieldBuilder {
  public ofType(type: InputTypeFieldType): InputTypeFieldBuilderType {
    return new InputTypeFieldBuilderType({ type, nullable: false })
  }
}
