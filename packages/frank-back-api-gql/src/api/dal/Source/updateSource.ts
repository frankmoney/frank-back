import { sql, where } from 'sql'
import { SourceStatus } from 'store/enums'
import { source } from 'store/names'
import Id from 'store/types/Id'
import createMutation from '../createMutation'
import createUpdateSetSql from '../helpers/createUpdateSetSql'
import sourcePredicateSql from './helpers/sourcePredicateSql'
import SourceWhere from './helpers/SourceWhere'

export type Args = {
  userId: Id
  update: {
    status?: SourceStatus
    accountId?: Id
  }
  where: SourceWhere
}

export default createMutation<Args, undefined | null | Id>(
  'updateSource',
  async (args, { db }) => {
    const setSql = createUpdateSetSql({
      values: args.update,
      append: {
        updatedAt: sql`now() at time zone 'utc'`,
        updaterId: args.userId,
      },
      columns: {
        updatedAt: source.updatedAt,
        updaterId: source.updaterId,
        status: source.status,
        accountId: source.accountId,
      },
    })

    const sourceId = setSql
      ? await db.scalar<Id>(
          sql`
            update "${source}"
            set ${setSql}
            where "${source.id}" = (
              select s."${source.id}"
              from "${source}" s
              ${where(sourcePredicateSql('s', args.where))}
              limit 1
            )
            returning "${source.id}"
          `
        )
      : undefined

    return sourceId
  }
)
