import {
  Category,
  CategoryOrderByInput,
  CategoryWhereInput,
} from 'app/graphql/generated/prisma'
import createPrivateResolver, {
  PrivateResolverArg,
} from 'utils/createPrivateResolver'
import normalizeString from 'utils/normalizeString'

const createCategoriesResolver = <TArgs = any>(
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

    const orderBy: CategoryOrderByInput = 'name_ASC'

    const first = args.first

    const skip = args.skip

    const categories = await query.categories<Category[]>(
      {
        where,
        orderBy,
        first,
        skip,
      },
      `{ id, name, color }`
    )

    return categories
  })

export default createCategoriesResolver
