import { lazy } from './Lazy'
import ObjectTypeBuilderFields from './ObjectTypeBuilderFields'
import ObjectTypeField from './ObjectTypeField'
import ObjectTypeFieldBuilder from './ObjectTypeFieldBuilder'

export default class ObjectTypeBuilder {
  public readonly name: string

  public constructor(name: string) {
    this.name = name
  }

  public fields(
    build: (
      field: ObjectTypeFieldBuilder
    ) => { [fieldName: string]: ObjectTypeField }
  ): ObjectTypeBuilderFields {
    return new ObjectTypeBuilderFields({
      name: this.name,
      fields: lazy(() => build(new ObjectTypeFieldBuilder())),
    })
  }
}
