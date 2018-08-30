import { Lazy } from './Lazy'
import ObjectTypeField from './ObjectTypeField'

export default class ObjectType {
  public readonly config: {
    readonly name: string
    readonly fields: Lazy<{ [fieldName: string]: ObjectTypeField }>
  }

  public constructor(config: {
    name: string
    fields: Lazy<{ [fieldName: string]: ObjectTypeField }>
  }) {
    this.config = config
  }
}
