import Scope from 'app/Scope'
import UnitOfWork from 'app/UnitOfWork'
import createLogger, { Logger } from 'utils/createLogger'

type DefaultActionScope = {
  uow: UnitOfWork
}

export default function createAction<
  TArgs,
  TResult,
  TScope extends { [K in keyof Scope]?: any } = DefaultActionScope
>(
  name: string,
  body: (args: TArgs, scope: TScope & { log: Logger }) => Promise<TResult>
) {
  return (args: TArgs, scope: TScope) => {
    const log = createLogger(`app:dal:${name}`)
    return body(args, Object.create(scope, { log: { value: log } }))
    // TODO: currently fails with TS2698
    // return body(args, { ...scope, log })
  }
}
