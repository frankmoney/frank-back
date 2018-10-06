import {
  GraphQLEnumType,
  GraphQLInputObjectType,
  GraphQLInterfaceType,
  GraphQLScalarType,
  GraphQLUnionType,
} from 'graphql'
import EnumType from './EnumType'
import InputType from './InputType'
import ListType from './ListType'
import ScalarType from './ScalarType'
import TypeRef from './TypeRef'

type FieldArgumentType =
  | TypeRef<GraphQLEnumType>
  | TypeRef<GraphQLScalarType>
  | TypeRef<GraphQLInputObjectType>
  | TypeRef<GraphQLInterfaceType>
  | TypeRef<GraphQLUnionType>
  | EnumType
  | ScalarType
  | InputType
  | ListType

export default FieldArgumentType
