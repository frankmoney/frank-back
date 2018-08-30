import { GraphQLInputFieldConfigMap, GraphQLInputObjectType } from 'graphql'
import InputType from '../nodes/InputType'
import IBuildContext from './IBuildContext'

const buildInputType = (
  context: IBuildContext,
  node: InputType
): GraphQLInputObjectType => {
  const name = node.config.name
  const fields = () => {
    const result: GraphQLInputFieldConfigMap = {}
    const fieldNodes = node.config.fields()
    for (const fieldName of Object.keys(fieldNodes)) {
      const fieldNode = fieldNodes[fieldName]
      result[fieldName] = {
        type: context.getType(fieldNode),
        defaultValue: fieldNode.config.defaultValue,
      }
    }
    return result
  }
  return new GraphQLInputObjectType({ name, fields })
}

export default buildInputType
