export default class EnumType {
  public readonly config: {
    readonly name: string
    readonly values: { [name: string]: {} }
  }

  public constructor(config: { name: string; values: { [name: string]: {} } }) {
    this.config = config
  }
}
