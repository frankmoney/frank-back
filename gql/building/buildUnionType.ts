import { GraphQLObjectType, GraphQLUnionType } from 'graphql'
import UnionType from '../nodes/UnionType'
import IBuildContext from './IBuildContext'

const buildUnionType = (
  context: IBuildContext,
  node: UnionType
): GraphQLUnionType => {
  const name = node.config.name
  const types = () =>
    node.config.types.map(x => <GraphQLObjectType>context.getType(x))
  return new GraphQLUnionType({ name, types })
}

export default buildUnionType
