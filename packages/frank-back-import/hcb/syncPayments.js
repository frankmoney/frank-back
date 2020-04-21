import createLogger from '../createLogger'
import R from 'ramda'
import Payment from '../model/payment'
import User from '../model/user'
import Source from '../model/source'
import handleNewPayment from './handleNewPayment'

const log = createLogger('import:syncHcbPayments')

const SYSTEM_USER_TYPE_ID = 1
const IMPORT_USER_NAME = 'import'

export default async (source, paymentsData) => {

  log.trace(`start: ${source.name}`)

  const { id: importUserId } = await User.findOne({ where: { typeId: SYSTEM_USER_TYPE_ID, name: IMPORT_USER_NAME } })

  const payments = await Payment.findAll({ where: { sourceId: source.id } })
  const filledPayments = R.filter(
    p => p.verified && p.peerId && p.categoryId && p.description,
    payments,
  )

  log.trace(`existing payments: ${payments.length}`)

  const newPayments = []

  for (const paymentData of paymentsData) {

    log.trace(`processing payment: ${paymentData.amount} ${paymentData.created_at}`)

    const { uuid } = paymentData

    const existingPayment = R.find(p => p.data.uuid === uuid, payments)

    if (R.isNil(existingPayment)) {

      log.trace('new payment - create')

      const data = handleNewPayment(paymentData, filledPayments, importUserId)

      data.sourceId = source.id
      data.accountId = source.accountId

      newPayments.push(await Payment.create(data))

    } else {

      log.trace('payment already in system - do nothing')
    }
  }

  const updateSource = await Source.findByPk(source.id)

  if (updateSource.accountId !== source.accountId) {

    await Payment.update(
      { accountId: updateSource.accountId },
      { where: { sourceId: updateSource.id } },
    )
  }

  return newPayments
}
