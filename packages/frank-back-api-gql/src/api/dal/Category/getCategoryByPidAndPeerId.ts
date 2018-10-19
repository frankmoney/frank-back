import { sql } from 'sql'
import mapCategory from 'store/mappers/mapCategory'
import { category, payment } from 'store/names'
import Category from 'store/types/Category'
import Id from 'store/types/Id'
import Pid from 'store/types/Pid'
import createQuery from '../createQuery'

export type Args = {
  peerId: Id
  pid: Pid
}

export default createQuery<Args, Category>(
  'getCategoryByPidAndPeerId',
  (args, { db }) =>
    db.first(
      sql`
        select
          ${category}.${category.id},
          ${category}.${category.pid},
          ${category}.${category.createdAt},
          ${category}.${category.creatorId},
          ${category}.${category.updatedAt},
          ${category}.${category.updaterId},
          ${category}.${category.name},
          ${category}.${category.color},
          ${category}.${category.accountId}
        from ${category}
        where exists (
          select 1
          from ${payment}
          where ${payment}.${payment.categoryId} = ${category}.${category.id}
          and ${payment}.${payment.peerId} = ${args.peerId}
        )
        and ${category.pid} = ${args.pid};
      `,
      mapCategory
    )
)
