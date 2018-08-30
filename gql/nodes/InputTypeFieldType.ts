import {
  GraphQLEnumType,
  GraphQLInterfaceType,
  GraphQLObjectType,
  GraphQLScalarType,
  GraphQLUnionType,
} from 'graphql'
import EnumType from './EnumType'
import InputType from './InputType'
import ListType from './ListType'
import ScalarType from './ScalarType'
import TypeRef from './TypeRef'

type InputTypeFieldType =
  | TypeRef<GraphQLEnumType>
  | TypeRef<GraphQLScalarType>
  | TypeRef<GraphQLObjectType>
  | TypeRef<GraphQLInterfaceType>
  | TypeRef<GraphQLUnionType>
  | EnumType
  | ScalarType
  | InputType
  | ListType

export default InputTypeFieldType
