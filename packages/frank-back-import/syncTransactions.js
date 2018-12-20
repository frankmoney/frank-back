import createLogger from './createLogger'
import R from 'ramda'
import Payment from './model/payment'
import User from './model/user'
import handleNewPayment from './handleNewPayment'

const log = createLogger('import:syncTransactions')

const SYSTEM_USER_TYPE_ID = 1
const IMPORT_USER_NAME = 'import'

export default async (source, mxPayments) => {

  log.trace(`start: ${source.name}`)

  const { id: importUserId } = await User.findOne({ where: { typeId: SYSTEM_USER_TYPE_ID, name: IMPORT_USER_NAME } })

  const payments = await Payment.findAll({ where: { sourceId: source.id } })
  const filledPayments = R.filter(
    p => p.verified && p.peerId && p.categoryId && p.description,
    payments
  )

  log.trace(`existing payments: ${payments.length}`)

  for (const mxPayment of mxPayments) {

    log.trace(`processing payment: ${mxPayment.amount} ${mxPayment.date}`)

    const { guid } = mxPayment

    const existingPayment = R.find(p => p.data.guid === guid, payments)

    if (R.isNil(existingPayment)) {

      log.trace('new payment - create')

      const data = handleNewPayment(mxPayment, filledPayments, importUserId)

      data.sourceId = source.id
      data.accountId = source.accountId

      await Payment.create(data)

    } else {

      log.trace('payment already in system - do nothing')
    }
  }
}
