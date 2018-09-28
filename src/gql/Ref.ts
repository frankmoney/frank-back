import { GraphQLNamedType } from 'graphql'
import TypeRef from './nodes/TypeRef'

const Ref = <T extends GraphQLNamedType>(type: T) => new TypeRef<T>(type)

export default Ref
