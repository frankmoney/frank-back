import { sql, where } from 'sql'
import { category } from 'store/names'
import Id from 'store/types/Id'
import createMutation from '../createMutation'
import categoryPredicateSql from './helpers/categoryPredicateSql'
import CategoryWhere from './helpers/CategoryWhere'

type Args = {
  userId: Id
  where: CategoryWhere
}

export default createMutation<Args, number>('deleteCategory', (args, { db }) =>
  db.command(
    sql`
      delete from "${category}"
      where "${category.id}" = (
        select c."${category.id}"
        from "${category}" c
        ${where(categoryPredicateSql('c', args.where))}
        limit 1
      )
    `
  )
)
