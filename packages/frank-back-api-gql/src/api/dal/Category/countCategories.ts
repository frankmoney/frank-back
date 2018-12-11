import { sql, where } from 'sql'
import { category } from 'store/names'
import createQuery from '../createQuery'
import CategoryWhere from './helpers/CategoryWhere'
import categoryPredicateSql from './helpers/categoryPredicateSql'

export type Args = {
  where: CategoryWhere
}

export default createQuery<Args, number>('countCategories', (args, { db }) =>
  db.scalar(
    sql`
      select count(*)
      from "${category}" c
      ${where(categoryPredicateSql('c', args.where))}
    `
  )
)
