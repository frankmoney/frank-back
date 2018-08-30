import debug from 'debug'
import { GraphQLResolveInfo } from 'graphql'
import { Context, ContextUser } from 'app/Context'
import { ContextAssert, createContextAssert } from 'app/assert'
import { Prisma } from 'app/graphql/generated/prisma'

export type ResolverLogger = {
  info(formatter: any, ...args: any[]): void
  error(formatter: any, ...args: any[]): void
}

export type ResolverArg<TArgs = any> = {
  parent: any
  args: TArgs
  context: Context
  info: GraphQLResolveInfo
  user?: ContextUser
  prisma: Prisma
  assert: ContextAssert
  log: ResolverLogger
}

export type Resolver<TArgs = any> = (arg: ResolverArg<TArgs>) => any

const createResolver = <TArgs = any>(
  resolver: string | undefined | Resolver<TArgs>,
  resolverImpl?: Resolver<TArgs>
) => {
  const log = {
    info: debug(`app:resolver:${resolver || '?'}:info`),
    error: debug(`app:resolver:${resolver || '?'}:error`),
  }

  return async (
    parent: any,
    args: TArgs,
    context: Context,
    info: GraphQLResolveInfo
  ) => {
    try {
      const user = context.user
      const prisma = context.prisma
      const assert = createContextAssert(context)

      const arg: ResolverArg<TArgs> = {
        parent,
        args,
        context,
        info,
        user,
        prisma,
        assert,
        log,
      }

      const fn = resolverImpl || <Resolver<TArgs>>resolver

      return await Promise.resolve(fn(arg))
    } catch (exc) {
      log.error(exc)
      throw exc
    }
  }
}

export default createResolver
