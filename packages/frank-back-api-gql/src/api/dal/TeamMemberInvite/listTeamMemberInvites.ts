import { sql, where } from 'sql'
import mapTeamMemberInvite from 'store/mappers/mapTeamMemberInvite'
import { teamMemberInvite } from 'store/names'
import TeamMemberInvite from 'store/types/TeamMemberInvite'
import createQuery from '../createQuery'
import TeamMemberInviteWhere from './helpers/TeamMemberInviteWhere'
import teamMemberInviteFieldsSql from './helpers/teamMemberInviteFieldsSql'
import teamMemberInvitePredicateSql from './helpers/teamMemberInvitePredicateSql'

export type Args = {
  where: TeamMemberInviteWhere
  take?: number
  skip?: number
}

export default createQuery<Args, TeamMemberInvite[]>(
  'listTeamMemberInvites',
  (args, { db }) =>
    db.query(
      sql`
        select ${teamMemberInviteFieldsSql('i')}
        from "${teamMemberInvite}" i
        ${where(teamMemberInvitePredicateSql('i', args.where))}
        order by "${teamMemberInvite.createdAt}" asc
      `,
      mapTeamMemberInvite
    )
)
