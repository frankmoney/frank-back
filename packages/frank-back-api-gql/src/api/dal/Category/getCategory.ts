import { sql, where } from 'sql'
import mapCategory from 'store/mappers/mapCategory'
import { category } from 'store/names'
import Category from 'store/types/Category'
import createQuery from '../createQuery'
import CategoryWhere from './helpers/CategoryWhere'
import categoryFieldsSql from './helpers/categoryFieldsSql'
import categoryPredicateSql from './helpers/categoryPredicateSql'

export type Args = {
  where?: CategoryWhere
}

export default createQuery<Args, Category>('getCategory', (args, { db }) =>
  db.first(
    sql`
      select ${categoryFieldsSql('c')}
      from "${category}" c
      ${where(categoryPredicateSql('c', args.where))}
      limit 1
    `,
    mapCategory
  )
)
