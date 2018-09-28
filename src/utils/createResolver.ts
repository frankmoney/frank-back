import debug from 'debug'
import { GraphQLResolveInfo } from 'graphql'
import { Context, ContextUser } from 'app/Context'
import { ContextAssert, createContextAssert } from 'app/assert'
import { Prisma } from 'app/graphql/generated/prisma'
import createLogger, { Logger } from './createLogger'

export type ResolverArg<TArgs = any> = {
  parent: any
  args: TArgs
  context: Context
  info: GraphQLResolveInfo
  user?: ContextUser
  prisma: Prisma
  assert: ContextAssert
  log: Logger
}

export type Resolver<TArgs = any> = (arg: ResolverArg<TArgs>) => any

const createResolver = <TArgs = any>(
  resolver: string | undefined | Resolver<TArgs>,
  resolverImpl?: Resolver<TArgs>
) => {
  const log = createLogger(`app:resolver:${resolver || '?'}`)

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

      const result = await Promise.resolve(fn(arg))

      log.trace('result:', result)

      return result
    } catch (exc) {
      log.error(exc)
      throw exc
    }
  }
}

export default createResolver
