import ListType from './nodes/ListType'
import ListTypeItemType from './nodes/ListTypeItemType'

const ListOf = (type: ListTypeItemType) =>
  new ListType({ itemType: type, itemsNullable: false })

export default ListOf
