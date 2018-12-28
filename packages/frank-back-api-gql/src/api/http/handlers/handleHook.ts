import { URL } from 'url'
import { Context } from 'koa'
import Scope from 'api/Scope'
import handleImportFailedHook from './hooks/handleImportFailedHook'

const handleHook = async (
  ctx: Context,
  next: () => Promise<any>,
  {
    scope,
    url,
    subPath,
  }: {
    scope: Scope
    url: URL
    subPath: string
  }
) => {
  switch (true) {
    case subPath === 'import_failed':
    case subPath === 'import_failed/':
      await handleImportFailedHook(ctx, next, { scope, url })
      break

    default:
      await next()
      break
  }
}

export default handleHook
