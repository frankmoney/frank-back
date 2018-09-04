import { GraphQLEnumType } from 'graphql'
import EnumType from '../nodes/EnumType'
import IBuildContext from './IBuildContext'

const buildEnumType = (
  context: IBuildContext,
  node: EnumType
): GraphQLEnumType => {
  const name = node.config.name
  const values = node.config.values
  return new GraphQLEnumType({ name, values })
}

export default buildEnumType
