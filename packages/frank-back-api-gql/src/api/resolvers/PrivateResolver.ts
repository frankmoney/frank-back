import PrivateResolverContext from './PrivateResolverContext'

type PrivateResolver<TResult, TArgs> = (
  context: PrivateResolverContext<TArgs>
) => TResult | Promise<TResult>

export default PrivateResolver
