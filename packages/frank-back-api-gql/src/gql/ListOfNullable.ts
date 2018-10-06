import ListType from './nodes/ListType'
import ListTypeItemType from './nodes/ListTypeItemType'

const ListOfNullable = (type: ListTypeItemType) =>
  new ListType({ itemType: type, itemsNullable: true })

export default ListOfNullable
