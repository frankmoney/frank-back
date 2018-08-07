import debug from 'debug'
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

const createResolver = <TArgs = any>(
  resolver: string | undefined | Resolver<TArgs>,
  resolverImpl?: Resolver<TArgs>
) => {
  const error = debug(`app:resolver:${resolver || '?'}:error`)
  return (
    parent: any,
    args: TArgs,
    context: Context,
    info: GraphQLResolveInfo
  ) =>
    Promise.resolve(
      (resolverImpl || <Resolver<TArgs>>resolver)({
        parent,
        args,
        context,
        info,
        user: context.user,
        prisma: context.prisma,
      })
    ).then(null, err => {
      error(err)
      throw err
    })
}

export default createResolver
