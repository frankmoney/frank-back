import humps from 'humps'
import { format, subDays } from 'date-fns'
import createLogger from './createLogger'
import syncPayments from './syncPayments'
import atriumClient from './atriumClient'
import Source from './model/source'

const log = createLogger('import:handleSource')

const DATE_FORMAT = 'YYYY-MM-DD'

export default async (sourceId, daysAgo) => {

  const source = await Source.findByPk(sourceId)

  if (!source) {
    throw new Error(`Can't find source. sourceId: ${sourceId}`);
  }

  log.trace(`start: ${source.name}`)

  const { data } = source

  const fromDate = subDays(new Date(), daysAgo)

  if (data && data.userGuid && data.guid) {

    const mxResponse = await atriumClient.listAccountTransactions({
      params: {
        userGuid: data.userGuid,
        accountGuid: data.guid,
        from_date: format(fromDate, DATE_FORMAT),
      },
    })

    if (mxResponse.transactions) {

      if (mxResponse.transactions.length > 0) {

        const mxPayments = humps.camelizeKeys(mxResponse.transactions)

        log.trace(`processing MX payments: ${mxPayments.length}`)

        await syncPayments(source, mxPayments)

      } else {

        log.trace(`MX has no payments`)
      }


    } else {

      // maybe mxUser or mxAccount were deleted
      throw new Error(`MX response isn't normal. sourceId: ${sourceId}, status: ${mxResponse.status}`);
    }

  } else {

    throw new Error(`Source haven't MX guid. sourceId: ${sourceId}`);
  }
}
