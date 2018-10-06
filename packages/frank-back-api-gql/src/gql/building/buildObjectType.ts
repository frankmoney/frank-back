import {
  GraphQLFieldConfigArgumentMap,
  GraphQLFieldConfigMap,
  GraphQLObjectType,
} from 'graphql'
import ObjectType from '../nodes/ObjectType'
import IBuildContext from './IBuildContext'

const buildObjectType = (
  context: IBuildContext,
  node: ObjectType
): GraphQLObjectType => {
  const name = node.config.name
  const fields = () => {
    const result: GraphQLFieldConfigMap<any, any> = {}
    const fieldNodes = node.config.fields()
    for (const fieldName of Object.keys(fieldNodes)) {
      const fieldNode = fieldNodes[fieldName]

      let args: GraphQLFieldConfigArgumentMap | undefined
      if (fieldNode.config.args) {
        args = {}
        for (const argName of Object.keys(fieldNode.config.args)) {
          const argNode = fieldNode.config.args[argName]
          args[argName] = {
            type: context.getType(argNode),
            defaultValue: argNode.config.defaultValue,
          }
        }
      } else {
        args = undefined
      }

      result[fieldName] = {
        type: context.getType(fieldNode),
        args,
        resolve: context.getResolver(fieldNode.config.resolve),
        subscribe: context.getResolver(fieldNode.config.subscribe),
      }
    }
    return result
  }
  return new GraphQLObjectType({ name, fields })
}

export default buildObjectType
