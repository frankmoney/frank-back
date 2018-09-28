import { Payment, PaymentWhereInput } from 'app/graphql/generated/prisma'
import createPrivateResolver, {
  PrivateResolverArg,
} from 'utils/createPrivateResolver'

const createCountPaymentsRevenueResolver = <TArgs = any>(
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

    where.amount_gt = 0

    const payments = await query.payments<Payment[]>({ where })

    const value = payments.reduce((a, b) => a + b.amount, 0)

    return { value }
  })

export default createCountPaymentsRevenueResolver
