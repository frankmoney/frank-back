import { GraphQLScalarType } from 'graphql'
import ScalarType from '../nodes/ScalarType'
import IBuildContext from './IBuildContext'

const buildScalarType = (
  context: IBuildContext,
  node: ScalarType
): GraphQLScalarType => {
  return new GraphQLScalarType(node.config)
}

export default buildScalarType
