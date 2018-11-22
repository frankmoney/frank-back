import { GraphQLResolveInfo, SelectionNode } from 'graphql'
import { argumentError } from 'api/errors/ArgumentError'

export default function extractFieldNames<T>(
  info: GraphQLResolveInfo
): (keyof T)[] {
  if (info.fieldNodes.length !== 1) {
    throw argumentError(`Wrong GraphQL info?\r\n${JSON.stringify(info)}`)
  }

  return info.fieldNodes[0].selectionSet!.selections.map(
    (node: SelectionNode) => {
      if (node.kind !== 'Field') {
        throw argumentError(`Wrong GraphQL info?\r\n${JSON.stringify(info)}`)
      }

      return <keyof T>node.name.value
    }
  )
}
