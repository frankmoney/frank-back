import { sql, where } from 'sql'
import { teamMemberInvite } from 'store/names'
import TeamMemberInvite from 'store/types/TeamMemberInvite'
import createQuery from '../createQuery'
import TeamMemberInviteWhere from './helpers/TeamMemberInviteWhere'
import teamMemberInviteFieldsSql from './helpers/teamMemberInviteFieldsSql'
import teamMemberInvitePredicateSql from './helpers/teamMemberInvitePredicateSql'

export type Args = {
  where: TeamMemberInviteWhere
}

export default createQuery<Args, TeamMemberInvite>(
  'getTeamMemberInvite',
  (args, { db }) =>
    db.first(
      sql`
      select ${teamMemberInviteFieldsSql('i')}
      from "${teamMemberInvite}" i
      ${where(teamMemberInvitePredicateSql('i', args.where))}
      limit 1
    `
    )
)
