import { throwForbidden } from 'api/errors/ForbiddenError'
import PrivateResolver from 'api/resolvers/PrivateResolver'
import PrivateResolverContext from 'api/resolvers/PrivateResolverContext'
import createResolver from './createResolver'

const createPrivateResolver = <TResult, TArgs = any>(
  name: string,
  resolver: PrivateResolver<TResult, TArgs>
) =>
  createResolver(name, async context => {
    if (!context.scope.user) {
      return throwForbidden()
    }
    return await resolver(<PrivateResolverContext<TArgs>>context)
  })

export default createPrivateResolver
