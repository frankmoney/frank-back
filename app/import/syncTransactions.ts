import { Account, Payment } from 'app/graphql/generated/prisma'
import { Prisma } from 'prisma-binding'
import createLogger from 'utils/createLogger'
import R from 'ramda'
import handleNewPayment from './handleNewPayment'

const log = createLogger('import:syncTransactions')

export default async (account: Account, mxPayments: any[], prisma: Prisma) => {

  const payments = await prisma.query.payments({ where: { account: { id: account.id } } })

  for (const mxPayment of mxPayments) {

    const { guid } = mxPayment

    const existingPayment = R.find(R.propEq('mxGuid', guid), payments)

    if (R.isNil(existingPayment)) {

      log.debug('new payment - create')

      await prisma.mutation.createPayment({
        data: handleNewPayment(mxPayment, account, payments),
      })

    } else {

      log.debug('payment already in system - do nothing')
    }
  }
}
