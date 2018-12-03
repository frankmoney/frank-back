import { sql } from 'sql'
import mapCategory from 'store/mappers/mapCategory'
import { category, payment } from 'store/names'
import Category from 'store/types/Category'
import Id from 'store/types/Id'
import Pid from 'store/types/Pid'
import createQuery from '../createQuery'
import categoryFieldsSql from './helpers/categoryFieldsSql'

export type Args = {
  peerId: Id
  pid: Pid
}

export default createQuery<Args, Category>(
  'getCategoryByPidAndPeerId',
  (args, { db }) =>
    db.first(
      sql`
        select ${categoryFieldsSql('c')}
        from ${category} c
        where exists (
          select 1
          from ${payment}
          where ${payment}.${payment.categoryId} = c.${category.id}
          and ${payment}.${payment.peerId} = ${args.peerId}
        )
        and c.${category.pid} = ${args.pid};
      `,
      mapCategory
    )
)
