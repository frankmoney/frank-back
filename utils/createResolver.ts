import { Prisma } from '../app/graphql/generated/prisma'
import { GraphQLResolveInfo } from "graphql";
import { Context } from '../app/Context'

export type Resolver<TArgs> = (
  args: TArgs,
  prisma: Prisma,
  info: GraphQLResolveInfo,
  context: Context,
  parent: any
) => any

const createResolver = <TArgs = any>(resolver: Resolver<TArgs>) =>
  (parent: any, args: TArgs, context: Context, info: GraphQLResolveInfo) =>
    resolver(args, context.prisma, info, context, parent)

export default createResolver
