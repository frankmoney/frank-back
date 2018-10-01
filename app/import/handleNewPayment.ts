import { Account, Payment, PaymentCreateInput } from 'app/graphql/generated/prisma'
import normalizeString from 'utils/normalizeString'

export default async (
  mxPayment: any,
  account: Account,
  existingPayments: Payment[],
): Promise<PaymentCreateInput> => {

  const { guid, amount, type, date, description } = mxPayment

  const newAmount = type === 'CREDIT' ? amount : amount * -1

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
