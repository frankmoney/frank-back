import ResolverContext from './ResolverContext'

type Resolver<TResult, TArgs> = (
  context: ResolverContext<TArgs>
) => TResult | Promise<TResult>

export default Resolver
