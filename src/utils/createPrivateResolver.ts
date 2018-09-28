import { ContextUser } from 'app/Context'
import createResolver, { ResolverArg } from './createResolver'

export type PrivateResolverArg<TArgs = any> = ResolverArg & {
  user: ContextUser
}

export type PrivateResolver<TArgs = any> = (
  arg: PrivateResolverArg<TArgs>
) => any

export default <TArgs = any>(
  resolver: string | PrivateResolver<TArgs>,
  resolverImpl?: PrivateResolver<TArgs>
) => {
  let name: string | undefined
  let impl: PrivateResolver<TArgs>
  if (resolverImpl) {
    name = <string>resolver
    impl = resolverImpl
  } else {
    name = undefined
    impl = <PrivateResolver<TArgs>>resolver
  }

  return createResolver(name, arg => {
    if (!arg.context.user) {
      throw new Error('Unauthorized')
    }
    return impl(<PrivateResolverArg<TArgs>>arg)
  })
}
