import { sql, where } from 'sql'
import { account } from 'store/names'
import Id from 'store/types/Id'
import createMutation from '../createMutation'
import createUpdateSetSql from '../helpers/createUpdateSetSql'
import AccountWhere from './helpers/AccountWhere'
import accountPredicateSql from './helpers/accountPredicateSql'

export type Args = {
  userId: Id
  update: {
    name?: string
    description?: null | string
    public?: boolean
  }
  where?: AccountWhere
}

export default createMutation<Args, undefined | null | Id>(
  'updateAccount',
  async (args, { db }) => {
    const setSql = createUpdateSetSql({
      values: args.update,
      append: {
        updatedAt: sql`now() at time zone 'utc'`,
        updaterId: args.userId,
      },
      columns: {
        name: account.name,
        description: account.description,
        public: account.public,
        updatedAt: account.updatedAt,
        updaterId: account.updaterId,
      },
    })

    const accountId = setSql
      ? await db.scalar<Id>(
          sql`
        update "${account}"
        set ${setSql}
        where "${account.id}" = (
          select a."${account.id}"
          from "${account}" a
          ${where(accountPredicateSql('a', args.where))}
          limit 1
        )
        returning "${account.id}"
      `
        )
      : undefined

    return accountId
  }
)
