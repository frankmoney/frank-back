import { Account } from 'app/graphql/generated/prisma'
import { Prisma } from 'prisma-binding'
import humps from 'humps'
import { format, subDays } from 'date-fns'
import createLogger from 'utils/createLogger'
import syncTransactions from './syncTransactions'
import AtriumClient from './atriumClient'

const log = createLogger('import:handleAccount')

const DATE_FORMAT = 'YYYY-MM-DD'

export default async (account: Account, prisma: Prisma, daysAgo = 3) => {

  log.debug(`start - ${account.name}`)

  const { rawData } = account

  const fromDate = subDays(new Date(), daysAgo)

  if (rawData && rawData.userGuid && rawData.guid) {

    const mxResponse = await AtriumClient.listAccountTransactions({
      params: {
        userGuid: rawData.userGuid,
        accountGuid: rawData.guid,
        from_date: format(fromDate, DATE_FORMAT),
      },
    })

    const mxPayments = <any[]>humps.camelizeKeys(mxResponse.transactions)

    log.debug(`processing ${mxPayments.length} payments`)

    await syncTransactions(account, mxPayments, prisma)

  } else {

    log.debug(`account haven't data`)
  }
}
