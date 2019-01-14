import { sql, where } from 'sql'
import mapTeamMember from 'store/mappers/mapTeamMember'
import { teamMember } from 'store/names'
import TeamMember from 'store/types/TeamMember'
import createQuery from '../createQuery'
import TeamMemberWhere from './helpers/TeamMemberWhere'
import teamMemberFieldsSql from './helpers/teamMemberFieldsSql'
import teamMemberPredicateSql from './helpers/teamMemberPredicateSql'

export type Args = {
  where: TeamMemberWhere
}

export default createQuery<Args, TeamMember>(
  'getTeamMember',
  (args, { db }) =>
    db.first(
      sql`
        select ${teamMemberFieldsSql('m')}
        from "${teamMember}" m
        ${where(teamMemberPredicateSql('m', args.where))}
        limit 1
      `,
      mapTeamMember
    )
)
