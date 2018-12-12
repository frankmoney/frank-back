import { isNil, mergeDeepRight } from 'ramda'
import CategoryType from 'api/types/CategoryType'
import CategoryWhere from 'api/dal/Category/helpers/CategoryWhere'

const createCategoryWhere = (
  args: {
    type?: null | CategoryType
    search?: null | string
  },
  extensions?: Partial<CategoryWhere>
): CategoryWhere => {
  const where: CategoryWhere = {}

  if (args) {
    if (!isNil(args.type)) {
      where.type = { eq: args.type }
    }

    if (args.search) {
      where.name = { contains: args.search }
    }
  }

  return extensions ? mergeDeepRight(where, extensions) : where
}

export default createCategoryWhere
