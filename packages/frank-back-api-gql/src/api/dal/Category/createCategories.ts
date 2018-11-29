import R from 'ramda'
import { join, sql } from 'sql'
import mapCategory from 'store/mappers/mapCategory'
import { category } from 'store/names'
import Category from 'store/types/Category'
import { throwArgumentError } from 'api/errors/ArgumentError'
import createMutation from '../createMutation'
import Id from 'store/types/Id'
import categoryFieldsSql from './helpers/categoryFieldsSql'

type CategoryData = {
  name: string
  color: string
}

type Args = {
  accountId: Id
  categories: CategoryData[]
}

export default createMutation<Args, Category[]>(
  'createCategories',
  async (args, { db }) => {
    if (R.isNil(args.accountId)) {
      throwArgumentError()
    }

    const columns = [category.accountId, category.name, category.color]

    const values = args.categories.map(
      x => sql`( ${args.accountId}, ${x.name}, ${x.color} )`
    )

    return await db.query(
      sql`
        insert into ${category} (${join(columns, ', ')})
        values ${join(values, ', ')}
        returning ${categoryFieldsSql(category)}
      `,
      mapCategory
    )
  }
)
