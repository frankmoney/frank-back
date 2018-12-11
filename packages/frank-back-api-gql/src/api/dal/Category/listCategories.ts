import { limit, sql, where } from 'sql'
import mapCategory from 'store/mappers/mapCategory'
import { category } from 'store/names'
import Category from 'store/types/Category'
import createQuery from '../createQuery'
import CategoryWhere from './helpers/CategoryWhere'
import categoryFieldsSql from './helpers/categoryFieldsSql'
import categoryPredicateSql from './helpers/categoryPredicateSql'

export type Args = {
  where?: CategoryWhere
  take?: number
  skip?: number
}

export default createQuery<Args, Category[]>('listCategories', (args, { db }) =>
  db.query(
    sql`
      select ${categoryFieldsSql('c')}
      from "${category}" c
      ${where(categoryPredicateSql('c', args.where))}
      ${limit({ take: args.take, skip: args.skip })};
    `,
    mapCategory
  )
)
