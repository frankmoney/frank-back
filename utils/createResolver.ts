import { GraphQLResolveInfo } from "graphql";
import { Context } from 'app/Context'
import { Prisma } from 'app/graphql/generated/prisma'

export type ResolverArg<TArgs = any> = {
  args: TArgs,
  prisma: Prisma,
  info: GraphQLResolveInfo,
  context: Context,
  parent: any,
}

export type Resolver<TArgs = any> = (arg: ResolverArg<TArgs>) => any

const createResolver = <TArgs = any>(resolver: Resolver<TArgs>) =>
  (parent: any, args: TArgs, context: Context, info: GraphQLResolveInfo) =>
    resolver({
      parent,
      args,
      context,
      info,
      prisma: context.prisma,
    })

export default createResolver
