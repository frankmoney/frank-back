import { GraphQLFieldResolver, GraphQLType } from 'graphql'
import EnumType from '../nodes/EnumType'
import FieldArgument from '../nodes/FieldArgument'
import FieldArgumentType from '../nodes/FieldArgumentType'
import InputType from '../nodes/InputType'
import InputTypeField from '../nodes/InputTypeField'
import InputTypeFieldType from '../nodes/InputTypeFieldType'
import ListType from '../nodes/ListType'
import ObjectType from '../nodes/ObjectType'
import ObjectTypeField from '../nodes/ObjectTypeField'
import ObjectTypeFieldType from '../nodes/ObjectTypeFieldType'
import Resolver from '../nodes/Resolver'
import ScalarType from '../nodes/ScalarType'
import Schema from '../nodes/Schema'
import TypeRef from '../nodes/TypeRef'

interface IBuildContext {
  shouldVisit(
    node:
      | Schema
      | TypeRef
      | EnumType
      | ScalarType
      | ObjectType
      | ObjectTypeField
      | InputType
      | InputTypeField
      | FieldArgument
      | ListType
  ): boolean

  tryAddTypeRef(type: GraphQLType): void

  tryAddType<TNode>(
    name: string,
    node: TNode,
    getter: (context: IBuildContext, node: TNode) => GraphQLType
  ): void

  getType<T extends GraphQLType>(
    node:
      | TypeRef
      | EnumType
      | ScalarType
      | ObjectType
      | InputType
      | ObjectTypeField
      | InputTypeField
      | ObjectTypeFieldType
      | InputTypeFieldType
      | FieldArgument
      | FieldArgumentType
      | ListType
  ): T

  getResolver(resolver?: Resolver): GraphQLFieldResolver<any, any> | undefined
}

export default IBuildContext
