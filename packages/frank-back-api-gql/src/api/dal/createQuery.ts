import Logger from 'log/Log'
import ActionScope from './ActionScope'
import DefaultActionScope from './DefaultActionScope'

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
