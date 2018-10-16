import createQuery from 'api/dal/createQuery'
import { sql } from 'sql'
import mapAccount from 'store/mappers/mapAccount'
import { account, category } from 'store/names'
import Account from 'store/types/Account'
import Id from 'store/types/Id'

export type Args = {
  categoryId: Id
}

export default createQuery<Args, Account>(
  'getAccountByCategoryId',
  (args, { db }) =>
    db.first(
      sql`
        select
          ${account}.${account.id},
          ${account}.${account.pid},
          ${account}.${account.createdAt},
          ${account}.${account.creatorId},
          ${account}.${account.updatedAt},
          ${account}.${account.updaterId},
          ${account}.${account.data},
          ${account}.${account.name},
          ${account}.${account.teamId}
        from ${account}
        join ${category}
        on ${account}.${account.id} = ${category}.${category.accountId}
        where ${category}.${category.id} = ${args.categoryId}
        limit 1;
      `,
      mapAccount
    )
)
