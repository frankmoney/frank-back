import { Account } from 'app/graphql/generated/prisma'
import { Prisma } from 'prisma-binding'
import humps from 'humps'
import createLogger from 'utils/createLogger'
import syncTransactions from './syncTransactions'
import AtriumClient from './atriumClient'

const log = createLogger('import:handleAccount')

export default async (account: Account, prisma: Prisma) => {

  log.debug(`start - ${account.name}`)

  const { rawData } = account

  if (rawData && rawData.userGuid && rawData.guid) {

    const mxResponse = await AtriumClient.listAccountTransactions({
      params: {
        userGuid: rawData.userGuid,
        accountGuid: rawData.guid,
        from_date: '2018-01-01',
        to_date: '2018-11-11',
      },
    })

    const mxTransactions = <any[]>humps.camelizeKeys(mxResponse.transactions)

    log.debug(`account have ${mxTransactions.length} transactions`)

    await syncTransactions(account, mxTransactions, prisma)

  } else {

    log.debug(`account haven't data`)
  }
}
