import { Payment, PaymentWhereInput } from 'app/graphql/generated/prisma'
import createPrivateResolver, {
  PrivateResolverArg,
} from 'utils/createPrivateResolver'

const createPaymentResolver = <TArgs = any>(
  name: string,
  predicate: (
    arg: PrivateResolverArg<TArgs>
  ) => PaymentWhereInput | Promise<PaymentWhereInput>
) =>
  createPrivateResolver(name, async arg => {
    const {
      prisma: { query },
    } = arg

    const where = await Promise.resolve(predicate(arg))

    const first = 1

    const payments = await query.payments<Payment[]>(
      { where, first },
      `{ id, postedOn, peerName, description, rawData }`
    )

    const payment = (payments && payments[0]) || undefined

    return payment
  })

export default createPaymentResolver
