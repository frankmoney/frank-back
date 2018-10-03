import { Account, Payment, PaymentCreateInput, Prisma } from 'app/graphql/generated/prisma'
import createLogger from 'utils/createLogger'
import normalizeString from 'utils/normalizeString'
import R from 'ramda'

const log = createLogger('import:handleNewPayment')

export default async (
  mxPayment: any,
  account: Account,
  existingPayments: Payment[],
  prisma: Prisma,
): Promise<PaymentCreateInput> => {

  log.debug('start')

  const { guid, amount, type, date, description } = mxPayment

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
    peerNameNormalized: normalizeString(description),
    amountAbs: Math.abs(newAmount),
    rawData: mxPayment,
    mxGuid: guid,
    account: { connect: { id: account.id } },
    peer: {},
    category: {},
  }

  const similarPayment = R.find((p: Payment) => condition(p.rawData))(existingPayments)

  if (similarPayment) {

    log.debug('found similar payment')

    const { peer, category } = await prisma.query.payment<Payment>({
      where: { id: similarPayment.id },
    }, '{ peer { id }, category { id }}')

    result.peer = { connect: peer }
    result.category = { connect: category }
  }

  return result
}
