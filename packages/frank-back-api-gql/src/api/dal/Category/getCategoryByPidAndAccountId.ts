import { sql } from 'sql'
import mapCategory from 'store/mappers/mapCategory'
import { category } from 'store/names'
import Category from 'store/types/Category'
import Id from 'store/types/Id'
import Pid from 'store/types/Pid'
import createQuery from '../createQuery'
import categoryFieldsSql from './helpers/categoryFieldsSql'

export type Args = {
  accountId: Id
  pid: Pid
}

export default createQuery<Args, Category>(
  'getCategoryByPidAndAccountId',
  (args, { db }) =>
    db.first(
      sql`
        select ${categoryFieldsSql('c')}
        from ${category} c
        where c.${category.accountId} = ${args.accountId}
        and c.${category.pid} = ${args.pid};
      `,
      mapCategory
    )
)
