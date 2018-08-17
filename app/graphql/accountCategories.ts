import {
  Category,
  CategoryOrderByInput,
  CategoryWhereInput,
} from 'app/graphql/generated/prisma'
import createPrivateResolver from 'utils/createPrivateResolver'

type AccountCategories = Category[]

export default createPrivateResolver(
  'accountCategories',
  async ({
    assert,
    args: { accountId },
    prisma: { query },
    info,
  }): Promise<AccountCategories> => {
    await assert.accountAccess(accountId)

    const where: CategoryWhereInput = { account: { id: accountId } }

    const orderBy: CategoryOrderByInput = 'name_ASC'

    const categories = await query.categories({ where, orderBy }, info)

    return categories
  }
)
