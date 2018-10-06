import Scope from 'api/Scope'
import User from 'api/User'
import ResolverContext from './ResolverContext'

type PrivateResolverContext<TArgs> = ResolverContext<TArgs> & {
  scope: Scope & {
    user: User
  }
}

export default PrivateResolverContext
