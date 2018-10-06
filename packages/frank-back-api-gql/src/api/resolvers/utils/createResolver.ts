import { GraphQLResolveInfo } from 'graphql'
import RequestContext from 'api/RequestContext'
import Resolver from 'api/resolvers/Resolver'
import ResolverContext from 'api/resolvers/ResolverContext'

const createResolver = <TResult, TArgs = any>(
  name: string,
  resolver: Resolver<TResult, TArgs>
) => {
  return async (
    parent: any,
    args: TArgs,
    requestContext: RequestContext,
    info: GraphQLResolveInfo
  ) => {
    const scope = requestContext.scope
    const log = scope.logFor(`api:resolvers:${name}`)

    try {
      const context: ResolverContext<TArgs> = {
        parent,
        args,
        info,
        requestContext,
        scope,
        log,
      }

      const result = await Promise.resolve(resolver(context))

      log.trace('result:', result)

      return result
    } catch (exc) {
      log.error('Error executing %s\r\n%O', name, exc)
      throw exc
    }
  }
}

export default createResolver
