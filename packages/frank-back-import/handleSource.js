import humps from 'humps'
import { format, subDays } from 'date-fns'
import createLogger from './createLogger'
import syncPayments from './syncPayments'
import atriumClient from './atriumClient'
import Source from './model/source'

const log = createLogger('import:handleSource')

const IMPORT_FAILED_URL = process.env.IMPORT_FAILED_URL

const DATE_FORMAT = 'YYYY-MM-DD'

const sendFailedNotification = (sourceId) => {
  if (IMPORT_FAILED_URL) {
    request.get(`${IMPORT_FAILED_URL}?source_id=${sourceId}`)
  }
}

export default async (sourceId, daysAgo) => {

  const source = await Source.findByPk(sourceId)

  if (!source) {
    throw new Error(`Can't find source. sourceId: ${sourceId}`)
  }

  log.trace(`start: ${source.name}`)

  const { data } = source

  const fromDate = subDays(new Date(), daysAgo)

  if (data && data.userGuid && data.guid) {

    const params = {
      userGuid: data.userGuid,
      accountGuid: data.guid,
    }

    const mxResponseAccount = await atriumClient.readAccount({ params })

    if (!mxResponseAccount.account) {

      sendFailedNotification(sourceId)

      throw new Error(`MX account response isn't normal. sourceId: ${sourceId}, status: ${mxResponseAccount.status}`)
    }

    const mxResponseTransactions = await atriumClient.listAccountTransactions({
      params: Object.assign({}, params, { from_date: format(fromDate, DATE_FORMAT) }),
    })

    if (!mxResponseTransactions.transactions) {

      sendFailedNotification(sourceId)

      throw new Error(`MX transactions response isn't normal. sourceId: ${sourceId}, status: ${mxResponseTransactions.status}`)
    }

    if (mxResponseTransactions.transactions.length > 0) {

      const mxPayments = humps.camelizeKeys(mxResponseTransactions.transactions)

      log.trace(`processing MX payments: ${mxPayments.length}`)

      await syncPayments(source, mxPayments)

    } else {

      log.trace(`MX has no payments`)
    }

    const sourceDataList = [
      source.data,
      { lastUpdateDate: (new Date()).toISOString() },
      humps.camelizeKeys(mxResponseAccount.account),
    ]

    await source.update({
      data: Object.assign({}, ...sourceDataList),
    })

  } else {

    throw new Error(`Source haven't MX guid. sourceId: ${sourceId}`)
  }
}
