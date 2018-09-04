import { AccountWhereInput } from 'app/graphql/generated/prisma'
import createPrivateResolver from 'utils/createPrivateResolver'
import normalizeString from 'utils/normalizeString'

export default createPrivateResolver(
  'accounts',
  async ({ user, args, prisma: { query } }) => {
    const where: AccountWhereInput = {
      members_some: {
        teamMember: {
          user: {
            id: user.id,
          },
        },
      },
    }

    if (args.search) {
      const searchNormalized = normalizeString(args.search)
      where.nameNormalized_contains = searchNormalized
    }

    const accounts = await query.accounts<Account[]>({ where })

    return accounts
  }
)
