import humps from 'humps'
import { format, subDays } from 'date-fns'
import createLogger from './createLogger'
import syncTransactions from './syncTransactions'
import atriumClient from './atriumClient'
import Account from './model/account'

const log = createLogger('import:handleAccount')

const DATE_FORMAT = 'YYYY-MM-DD'

export default async (accountId, daysAgo) => {

  const account = await Account.findByPk(accountId)

  if (!account) {
    throw new Error(`Can't find account. accountId: ${accountId}`);
  }

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

    if (mxResponse.transactions) {

      if (mxResponse.transactions.length > 0) {

        const mxPayments = humps.camelizeKeys(mxResponse.transactions)

        log.trace(`processing MX payments: ${mxPayments.length}`)

        await syncTransactions(account, mxPayments)

      } else {

        log.trace(`MX haven't payments`)
      }


    } else {

      // maybe mxUser or mxAccount were deleted
      throw new Error(`MX response isn't normal. accountId: ${accountId}`);
    }

  } else {

    throw new Error(`Account haven't MX guid. accountId: ${accountId}`);
  }
}
