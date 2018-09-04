import { GraphQLObjectType } from 'graphql'
import ObjectType from './ObjectType'
import TypeRef from './TypeRef'

type UnionTypeMemberType = TypeRef<GraphQLObjectType> | ObjectType

export default UnionTypeMemberType
