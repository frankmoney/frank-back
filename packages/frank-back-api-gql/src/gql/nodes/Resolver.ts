import { GraphQLFieldResolver } from 'graphql'

type Resolver = string | GraphQLFieldResolver<any, any, any>

export default Resolver
