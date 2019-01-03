import { URL } from 'url'
import { Context } from 'koa'
import { SourceStatus, SystemUserId } from 'store/enums'
import Id from 'store/types/Id'
import Scope from 'api/Scope'
import updateSource from 'api/dal/Source/updateSource'
import accountAggregationIssues from '@frankmoney/frank-mail/accountAggregationIssues'
import { TeamMemberRole } from 'store/enums'
import listUsers from 'api/dal/User/listUsers'
import getSource from 'api/dal/Source/getSource'

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
      await scope.uow.commit()

      const account = await getSource(
        { where: { id: { eq: updatedSourceId } } },
        scope
      )

      const link = scope.config.MAIL.links.accountAggregationIssues({
        accountPid: account.pid,
      })

      const users = await listUsers(
        {
          where: {
            teamMembers: {
              any: {
                roleId: { eq: TeamMemberRole.administrator },
                team: {
                  accounts: {
                    any: {
                      id: { eq: account.id },
                    },
                  },
                },
              },
            },
          },
        },
        scope
      )

      await Promise.all(
        users.map(async user => {
          const mail = accountAggregationIssues({
            data: {
              account,
              user,
              link,
            },
          })

          await scope.mailer.send({ to: user.email }, mail)
        })
      )

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
