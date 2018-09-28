import { Account, AccountWhereInput } from 'app/graphql/generated/prisma'
import createPrivateResolver, {
  PrivateResolverArg,
} from 'utils/createPrivateResolver'

const createAccountResolver = <TArgs = any>(
  name: string,
  predicate: (
    arg: PrivateResolverArg<TArgs>
  ) => AccountWhereInput | Promise<AccountWhereInput>
) =>
  createPrivateResolver(name, async arg => {
    const {
      user,
      prisma: { query },
    } = arg

    const where = await Promise.resolve(predicate(arg))

    const first = 1

    const accounts = await query.categories<Account[]>(
      { where, first },
      `{ id, name }`
    )

    const account = (accounts && accounts[0]) || undefined

    return account
  })

export default createAccountResolver
