import { GraphQLList, GraphQLNonNull } from 'graphql'
import ListType from '../nodes/ListType'
import IBuildContext from './IBuildContext'

const buildListType = (
  context: IBuildContext,
  node: ListType
): GraphQLList<any> => {
  const rawItemType = context.getType(node.config.itemType)
  const itemType = node.config.itemsNullable
    ? rawItemType
    : new GraphQLNonNull(rawItemType)
  return new GraphQLList(itemType)
}

export default buildListType
