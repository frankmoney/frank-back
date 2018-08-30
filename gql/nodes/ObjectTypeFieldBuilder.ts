import ListType from 'gql/nodes/ListType'
import ObjectTypeFieldBuilderType from './ObjectTypeFieldBuilderType'
import ObjectTypeFieldType from './ObjectTypeFieldType'

export default class ObjectTypeFieldBuilder {
  public ofType(type: ObjectTypeFieldType): ObjectTypeFieldBuilderType {
    return new ObjectTypeFieldBuilderType({ type, nullable: false })
  }

  public listOf(itemType: ObjectTypeFieldType): ObjectTypeFieldBuilderType {
    return this.ofType(new ListType({ itemType, itemsNullable: false }))
  }
}
