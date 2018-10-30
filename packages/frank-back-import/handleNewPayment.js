import createLogger from './createLogger'
import R from 'ramda'

const log = createLogger('import:handleNewPayment')

export default async (
  mxPayment,
  account,
  existingPayments,
) => {

  log.debug('start')

  const { amount, type, date, description } = mxPayment

  const newAmount = type === 'CREDIT' ? amount : amount * -1

  const condition = R.whereEq({
    description,
    amount,
    type,
  })

  const result = {
    postedOn: date,
    amount: newAmount,
    peerName: description,
    data: mxPayment,
    accountId: account.id,
  }

  const similarPayment = R.find(p => p.categoryId && p.peerId && condition(p.data))(existingPayments)

  if (similarPayment) {

    log.debug('found similar payment')

    result.categoryId = similarPayment.categoryId
    result.peerId = similarPayment.peerId
  }

  return result
}
