import ListTypeItemType from './ListTypeItemType'

export default class ListType {
  public readonly config: {
    readonly itemType: ListTypeItemType
    readonly itemsNullable: boolean
  }

  public constructor(config: {
    itemType: ListTypeItemType
    itemsNullable: boolean
  }) {
    this.config = config
  }
}
