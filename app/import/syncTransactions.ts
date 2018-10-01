import { Account } from 'app/graphql/generated/prisma'
import { Prisma } from 'prisma-binding'
import createLogger from 'utils/createLogger'
import R from 'ramda'
import handleNewPayment from './handleNewPayment'

const log = createLogger('import:syncTransactions')

export default async (account: Account, mxPayments: any[], prisma: Prisma) => {

  log.debug('start')

  const { payments } = await prisma.query.payments({ where: { account: { id: account.id } } })

  for (const mxPayment of mxPayments) {

    const { guid } = mxPayment

    const existingPayment = R.find(R.propEq('mxGuid', guid))(payments)

    if (existingPayment === null) {

      log.debug('not found payment - create new')

      await prisma.mutation.createPayment({
        data: handleNewPayment(mxPayment, account, payments),
      })

    } else {

      log.debug('payment found - do nothing')
    }
  }
}
