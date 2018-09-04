import { AccountWhereUniqueInput } from 'app/graphql/generated/prisma'
import createPrivateResolver from 'utils/createPrivateResolver'

export default createPrivateResolver(
  'account',
  async ({ assert, args, prisma: { query } }) => {
    await assert.accountAccess(args.id)

    const where: AccountWhereUniqueInput = {
      id: args.id,
    }

    const account = await query.account<Account>({ where })

    return account
  }
)
