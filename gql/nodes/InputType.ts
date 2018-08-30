import InputTypeField from './InputTypeField'
import { Lazy } from './Lazy'

export default class InputType {
  public readonly config: {
    name: string
    readonly fields: Lazy<{ [fieldName: string]: InputTypeField }>
  }

  public constructor(config: {
    name: string
    fields: Lazy<{ [fieldName: string]: InputTypeField }>
  }) {
    this.config = config
  }
}
