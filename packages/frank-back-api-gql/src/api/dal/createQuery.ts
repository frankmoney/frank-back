import Scope from 'api/Scope'
import UnitOfWork from 'api/UnitOfWork'
import Logger from 'log/Log'
import Database from 'store/Database'

type ActionScope = { [K in keyof Scope]?: any } & {
  logFor: typeof Scope.prototype.logFor
}

type DefaultActionScope = {
  logFor: typeof Scope.prototype.logFor
  uow: UnitOfWork
  db: Database
}

export default function createQuery<
  TArgs,
  TResult = any,
  TScope extends ActionScope = DefaultActionScope
>(
  name: string,
  query: (args: TArgs, scope: TScope & { log: Logger }) => Promise<TResult>
) {
  return async (args: TArgs, scope: TScope) => {
    const log = scope.logFor(`app:dal:${name}`)
    const queryResult = await query(
      args,
      Object.create(scope, { log: { value: log } })
    )
    return queryResult
  }
}
