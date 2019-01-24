import atriumClient from './atriumClient'
import Source from './model/source'
import createLogger from './createLogger'
import * as Sentry from '@sentry/node'

const log = createLogger('import:clearMxUsers')

export default async () => {

  log.trace('start')

  try {
    const sources = await Source.findAll()
    const { users } = await atriumClient.listUsers({ params: { records_per_page: 1000 } })

    log.trace(`sources count: ${sources.length}`)
    log.trace(`MxUsers count: ${users.length}`)

    for(const user of users) {

      const userGuid = user.guid

      const sourceWithThisUser = sources.find(s => s.userGuid === userGuid)

      if (!sourceWithThisUser) {

        log.trace(`delete this MxUser: ${user.guid}`)
        await atriumClient.deleteUser({params: {userGuid}})
      }
    }

    log.trace('end')
  }
  catch (e) {

    log.error(e.message)
    Sentry.captureException(e)
  }
}
