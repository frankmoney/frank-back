import Scope from 'api/Scope'

type ActionScope = { [K in keyof Scope]?: any } & {
  logFor: typeof Scope.prototype.logFor
}

export default ActionScope
