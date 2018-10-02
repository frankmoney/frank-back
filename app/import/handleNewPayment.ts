import { Account, Payment, PaymentCreateInput } from 'app/graphql/generated/prisma'
import createLogger from 'utils/createLogger'
import normalizeString from 'utils/normalizeString'
import R from 'ramda'

const log = createLogger('import:handleNewPayment')

export default (
  mxPayment: any,
  account: Account,
  existingPayments: Payment[],
): PaymentCreateInput => {

  log.debug('start')

  const { guid, amount, type, date, description } = mxPayment

  const newAmount = type === 'CREDIT' ? amount : amount * -1

  const condition = R.whereEq({
    description: description,
    amount: amount,
    type: type,
  })

  const similarPayment = R.find((p: Payment) => condition(p.rawData))(existingPayments)

  return {
    postedOn: date,
    amount: newAmount,
    peerName: description,
    peerNameNormalized: normalizeString(description),
    amountAbs: Math.abs(newAmount),
    rawData: mxPayment,
    mxGuid: guid,
    account: { connect: { id: account.id } },
  }
}
