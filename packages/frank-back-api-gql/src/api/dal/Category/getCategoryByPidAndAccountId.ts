import createQuery from 'api/dal/createQuery'
import { sql } from 'sql'
import mapCategory from 'store/mappers/mapCategory'
import { category, payment } from 'store/names'
import Category from 'store/types/Category'
import Id from 'store/types/Id'
import Pid from 'store/types/Pid'

export type Args = {
  accountId: Id
  pid: Pid
}

export default createQuery<Args, Category>(
  'getCategoryByPidAndAccountId',
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
        where ${category.accountId} = ${args.accountId}
        and ${category.pid} = ${args.pid};
      `,
      mapCategory
    )
)
