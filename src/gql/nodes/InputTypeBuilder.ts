import InputTypeField from './InputTypeField'
import InputTypeFieldBuilder from './InputTypeFieldBuilder'
import InputTypeBuilderFields from './InputTypeBuilderFields'
import { lazy } from './Lazy'

export default class InputTypeBuilder {
  public readonly name: string

  public constructor(name: string) {
    this.name = name
  }

  public fields(
    build: (
      field: InputTypeFieldBuilder
    ) => { [fieldName: string]: InputTypeField }
  ): InputTypeBuilderFields {
    return new InputTypeBuilderFields({
      name: this.name,
      fields: lazy(() => build(new InputTypeFieldBuilder())),
    })
  }
}
