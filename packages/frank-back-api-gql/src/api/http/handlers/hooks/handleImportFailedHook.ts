import { URL } from 'url'
import { Context } from 'koa'
import { SourceStatus, SystemUserId } from 'store/enums'
import Id from 'store/types/Id'
import Scope from 'api/Scope'
import updateSource from 'api/dal/Source/updateSource'

const handleImportFailedHook = async (
  ctx: Context,
  next: () => Promise<any>,
  {
    scope,
    url,
  }: {
    scope: Scope
    url: URL
  }
) => {
  const log = scope.logFor('http:hooks:import_failed')

  try {
    const sourceId: Id = Number(url.searchParams.get('source_id'))

    log.warn(`import failed for source #${sourceId}`)

    const updatedSourceId = await updateSource(
      {
        userId: SystemUserId.import,
        update: { status: SourceStatus.broken },
        where: { id: { eq: sourceId } },
      },
      scope
    )

    if (updatedSourceId) {
      ctx.response.status = 200
      ctx.response.body = { code: 'ok' }
    } else {
      ctx.response.status = 404
      ctx.response.body = { code: 'not_found' }
    }
  } catch (exc) {
    log.error(exc)

    ctx.response.status = 500
    ctx.response.body = { code: 'internal_error' }
  }
}

export default handleImportFailedHook
