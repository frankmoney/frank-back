import { sql, where } from 'sql'
import { category } from 'store/names'
import Id from 'store/types/Id'
import createMutation from '../createMutation'
import createUpdateSetSql from '../helpers/createUpdateSetSql'
import CategoryWhere from './helpers/CategoryWhere'
import categoryPredicateSql from './helpers/categoryPredicateSql'

export type Args = {
  userId: Id
  update: {
    name?: string
    color?: string
  }
  where?: CategoryWhere
}

export default createMutation<Args, undefined | null | Id>(
  'updateCategory',
  async (args, { db }) => {
    const setSql = createUpdateSetSql({
      values: args.update,
      append: {
        updatedAt: sql`now() at time zone 'utc'`,
        updaterId: args.userId,
      },
      columns: {
        name: category.name,
        color: category.color,
        updatedAt: category.updatedAt,
        updaterId: category.updaterId,
      },
    })

    const categoryId = setSql
      ? await db.scalar<Id>(
          sql`
        update "${category}"
        set ${setSql}
        where "${category.id}" = (
          select c."${category.id}"
          from "${category}" c
          ${where(categoryPredicateSql('c', args.where))}
          limit 1
        )
        returning "${category.id}"
      `
        )
      : undefined

    return categoryId
  }
)
