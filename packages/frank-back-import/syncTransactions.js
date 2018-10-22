import createLogger from './createLogger'
import R from 'ramda'
import Payment from './model/payment'
// import handleNewPayment from './handleNewPayment'

const log = createLogger('import:syncTransactions')

export default async (account, mxPayments) => {

  log.trace(`start: ${account.name}`)

  const payments = await Payment.findAll({ where: { accountId: account.id } })

  log.trace(`existing payments: ${payments.length}`)

  for (const mxPayment of mxPayments) {

    log.trace(`processing payment: ${mxPayment.amount} ${mxPayment.date}`)

    const { guid } = mxPayment

    const existingPayment = R.find(R.propEq('mxGuid', guid), payments)

    if (R.isNil(existingPayment)) {

      log.trace('new payment - create')

      // const data = await handleNewPayment(mxPayment, account, payments, prisma)

      // await prisma.mutation.createPayment({
      //   data,
      // })

    } else {

      log.trace('payment already in system - do nothing')
    }
  }
}
