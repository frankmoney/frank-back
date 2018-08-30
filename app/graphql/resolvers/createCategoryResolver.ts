import { Category, CategoryWhereInput } from 'app/graphql/generated/prisma'
import createPrivateResolver, {
  PrivateResolverArg,
} from 'utils/createPrivateResolver'

const createCategoryResolver = <TArgs = any>(
  name: string,
  predicate: (
    arg: PrivateResolverArg<TArgs>
  ) => CategoryWhereInput | Promise<CategoryWhereInput>
) =>
  createPrivateResolver(name, async arg => {
    const {
      prisma: { query },
    } = arg

    const where = await Promise.resolve(predicate(arg))

    const first = 1

    const categories = await query.categories<Category[]>(
      { where, first },
      `{ id, name, color }`
    )

    const category = (categories && categories[0]) || undefined

    return category
  })

export default createCategoryResolver
