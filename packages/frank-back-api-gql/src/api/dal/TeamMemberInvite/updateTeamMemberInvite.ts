import { Sql, sql, where } from 'sql'
import { teamMemberInvite } from 'store/names'
import Id from 'store/types/Id'
import Date from 'store/types/Date'
import createMutation from '../createMutation'
import TeamMemberInviteWhere from './helpers/TeamMemberInviteWhere'
import createUpdateSetSql from '../helpers/createUpdateSetSql'
import teamMemberInvitePredicateSql from './helpers/teamMemberInvitePredicateSql'

export type Args = {
  update: {
    userId?: Id | Sql
    usedAt?: Date | Sql
  }
  where?: TeamMemberInviteWhere
}

export default createMutation<Args, undefined | null | Id>(
  'updateTeamMemberInvite',
  async (args, { db }) => {
    const setSql = createUpdateSetSql({
      values: args.update,
      append: {
        updatedAt: sql`now() at time zone 'utc'`,
      },
      columns: {
        usedAt: teamMemberInvite.usedAt,
        userId: teamMemberInvite.userId,
        updatedAt: teamMemberInvite.updatedAt,
      },
    })

    const teamMemberInviteId = setSql
      ? await db.scalar<Id>(
          sql`
            update "${teamMemberInvite}"
            set ${setSql}
            where "${teamMemberInvite.id}" = (
              select m."${teamMemberInvite.id}"
              from "${teamMemberInvite}" m
              ${where(teamMemberInvitePredicateSql('m', args.where))}
              limit 1
            )
            returning "${teamMemberInvite.id}"
          `
        )
      : undefined

    return teamMemberInviteId
  }
)
