import { sql, where } from 'sql'
import { user } from 'store/names'
import Id from 'store/types/Id'
import createMutation from '../createMutation'
import createUpdateSetSql from '../helpers/createUpdateSetSql'
import UserWhere from './helpers/UserWhere'
import userPredicateSql from './helpers/userPredicateSql'

export type Args = {
  userId: Id
  update: {
    passwordHash?: string
  }
  where?: UserWhere
}

export default createMutation<Args, undefined | null | Id>(
  'updateUser',
  async (args, { db }) => {
    const setSql = createUpdateSetSql({
      values: args.update,
      append: {
        updatedAt: sql`now() at time zone 'utc'`,
        updaterId: args.userId,
      },
      columns: {
        passwordHash: user.passwordHash,
        updatedAt: user.updatedAt,
        updaterId: user.updaterId,
      },
    })

    const userId = setSql
      ? await db.scalar<Id>(
          sql`
            update "${user}"
            set ${setSql}
            where "${user.id}" = (
              select u."${user.id}"
              from "${user}" u
              ${where(userPredicateSql('u', args.where))}
              limit 1
            )
            returning "${user.id}"
          `
        )
      : undefined

    return userId
  }
)
