import humps from 'humps'
import { format, subDays } from 'date-fns'
import createLogger from './createLogger'
import syncTransactions from './syncTransactions'
import atriumClient from './atriumClient'

const log = createLogger('import:handleAccount')

const DATE_FORMAT = 'YYYY-MM-DD'

export default async (account, daysAgo = 3) => {

  log.trace(`start: ${account.name}`)

  const { data } = account

  const fromDate = subDays(new Date(), daysAgo)

  if (data && data.userGuid && data.guid) {

    const mxResponse = await atriumClient.listAccountTransactions({
      params: {
        userGuid: data.userGuid,
        accountGuid: data.guid,
        from_date: format(fromDate, DATE_FORMAT),
      },
    })

    const mxPayments = humps.camelizeKeys(mxResponse.transactions)

    log.trace(`processing payments: ${mxPayments.length}`)

    await syncTransactions(account, mxPayments)

  } else {

    log.trace(`account haven't data`)
  }
}
