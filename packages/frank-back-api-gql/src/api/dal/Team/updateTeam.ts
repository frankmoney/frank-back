import { sql, where } from 'sql'
import { team } from 'store/names'
import Id from 'store/types/Id'
import createMutation from '../createMutation'
import createUpdateSetSql from '../helpers/createUpdateSetSql'
import TeamWhere from './helpers/TeamWhere'
import teamPredicateSql from './helpers/teamPredicateSql'

export type Args = {
  updaterId: Id
  update: {
    name?: string
  }
  where?: TeamWhere
}

export default createMutation<Args, undefined | null | Id>(
  'updateTeam',
  async (args, { db }) => {
    const setSql = createUpdateSetSql({
      values: args.update,
      append: {
        updatedAt: sql`now() at time zone 'utc'`,
        updaterId: args.updaterId,
      },
      columns: {
        name: team.name,
        updatedAt: team.updatedAt,
        updaterId: team.updaterId,
      },
    })

    const teamId = setSql
      ? await db.scalar<Id>(
          sql`
            update "${team}"
            set ${setSql}
            where "${team.id}" = (
              select t."${team.id}"
              from "${team}" t
              ${where(teamPredicateSql('t', args.where))}
              limit 1
            )
            returning "${team.id}"
          `
        )
      : undefined

    return teamId
  }
)
