import { GraphQLResolveInfo } from 'graphql'
import RequestContext from 'api/RequestContext'
import Scope from 'api/Scope'
import Log from 'log/Log'

type ResolverContext<TArgs> = {
  parent: any
  args: TArgs
  info: GraphQLResolveInfo
  requestContext?: RequestContext
  scope: Scope
  log: Log
}

export default ResolverContext
