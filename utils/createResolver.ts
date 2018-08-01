import { GraphQLResolveInfo } from 'graphql'
import { Context, ContextUser } from 'app/Context'
import { Prisma } from 'app/graphql/generated/prisma'

export type ResolverArg<TArgs = any> = {
  parent: any
  args: TArgs
  context: Context
  info: GraphQLResolveInfo
  user?: ContextUser
  prisma: Prisma
}

export type Resolver<TArgs = any> = (arg: ResolverArg<TArgs>) => any

const createResolver = <TArgs = any>(resolver: Resolver<TArgs>) => (
  parent: any,
  args: TArgs,
  context: Context,
  info: GraphQLResolveInfo
) =>
  resolver({
    parent,
    args,
    context,
    info,
    user: context.user,
    prisma: context.prisma,
  })

export default createResolver
