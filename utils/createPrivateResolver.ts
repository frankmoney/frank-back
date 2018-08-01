import { ContextUser } from 'app/Context'
import createResolver, { ResolverArg } from './createResolver'

export type PrivateResolverArg<TArgs = any> = ResolverArg & {
  user: ContextUser
}

export type PrivateResolver<TArgs = any> = (
  arg: PrivateResolverArg<TArgs>
) => any

export default <TArgs = any>(resolver: PrivateResolver<TArgs>) =>
  createResolver((arg, ...args) => {
    if (!arg.context.user) {
      throw new Error('Unauthorized')
    }
    return resolver(<PrivateResolverArg<TArgs>>arg, ...args)
  })
