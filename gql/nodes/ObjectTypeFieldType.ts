import {
  GraphQLEnumType,
  GraphQLInterfaceType,
  GraphQLObjectType,
  GraphQLScalarType,
  GraphQLUnionType,
} from 'graphql'
import EnumType from './EnumType'
import ListType from './ListType'
import ObjectType from './ObjectType'
import ScalarType from './ScalarType'
import TypeRef from './TypeRef'

type ObjectTypeFieldType =
  | TypeRef<GraphQLEnumType>
  | TypeRef<GraphQLScalarType>
  | TypeRef<GraphQLObjectType>
  | TypeRef<GraphQLInterfaceType>
  | TypeRef<GraphQLUnionType>
  | EnumType
  | ScalarType
  | ObjectType
  | ListType

export default ObjectTypeFieldType
