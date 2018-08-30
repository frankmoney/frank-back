import {
  CategoryConnection,
  CategoryWhereInput,
} from 'app/graphql/generated/prisma'
import createPrivateResolver, {
  PrivateResolverArg,
} from 'utils/createPrivateResolver'
import normalizeString from 'utils/normalizeString'

const createCountCategoriesResolver = <TArgs = any>(
  name: string,
  predicate: (
    arg: PrivateResolverArg<TArgs>
  ) => CategoryWhereInput | Promise<CategoryWhereInput>
) =>
  createPrivateResolver(name, async arg => {
    const {
      args,
      prisma: { query },
    } = arg

    const where = await Promise.resolve(predicate(arg))

    if (args.search) {
      const searchNormalized = normalizeString(args.search)
      where.OR = [
        {
          nameNormalized_contains: searchNormalized,
        },
      ]
    }

    const connection = await query.categoriesConnection<CategoryConnection>(
      {
        where,
      },
      `{ aggregate { count } }`
    )

    const value = connection.aggregate.count

    return { value }
  })

export default createCountCategoriesResolver
