import { Sql, sql, where } from 'sql'
import { passwordReset } from 'store/names'
import Id from 'store/types/Id'
import createMutation from '../createMutation'
import createUpdateSetSql from '../helpers/createUpdateSetSql'
import PasswordResetWhere from './helpers/PasswordResetWhere'
import passwordResetPredicateSql from './helpers/passwordResetPredicateSql'

export type Args = {
  update: {
    usedAt?: Sql | string
  }
  where: PasswordResetWhere
}

export default createMutation<Args, undefined | null | Id>(
  'updateUser',
  async (args, { db }) => {
    const setSql = createUpdateSetSql({
      values: args.update,
      append: {
        updatedAt: sql`now() at time zone 'utc'`,
      },
      columns: {
        usedAt: passwordReset.usedAt,
        updatedAt: passwordReset.updatedAt,
      },
    })

    const userId = setSql
      ? await db.scalar<Id>(
          sql`
            update "${passwordReset}"
            set ${setSql}
            where "${passwordReset.id}" = (
              select pr."${passwordReset.id}"
              from "${passwordReset}" pr
              ${where(passwordResetPredicateSql('pr', args.where))}
              limit 1
            )
            returning "${passwordReset.id}"
          `
        )
      : undefined

    return userId
  }
)
