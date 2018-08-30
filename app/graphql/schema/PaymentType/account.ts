import { Account, AccountWhereInput } from 'app/graphql/generated/prisma'
import createPrivateResolver from 'utils/createPrivateResolver'

export default createPrivateResolver(
  'Payment:account',
  async ({ parent, prisma: { query } }) => {
    const paymentId = parent.id

    const where: AccountWhereInput = {
      payments_some: {
        id: paymentId,
      },
    }

    const accounts = await query.accounts<Account[]>({ where })

    return accounts && accounts[0]
  }
)
