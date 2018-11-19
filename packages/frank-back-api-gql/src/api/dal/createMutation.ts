import { Log } from 'log'
import ActionScope from './ActionScope'
import DefaultActionScope from './DefaultActionScope'

export default function createMutation<
  TArgs,
  TResult = any,
  TScope extends ActionScope = DefaultActionScope
>(
  name: string,
  command: (args: TArgs, scope: TScope & { log: Log }) => Promise<TResult>
) {
  return async (args: TArgs, scope: TScope) => {
    const log = scope.logFor(`app:dal:${name}`)
    const queryResult = await command(
      args,
      Object.create(scope, { log: { value: log } })
    )
    return queryResult
  }
}
