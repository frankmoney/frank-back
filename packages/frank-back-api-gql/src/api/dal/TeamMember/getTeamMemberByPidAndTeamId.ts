import { sql } from 'sql'
import mapTeamMember from 'store/mappers/mapTeamMember'
import { teamMember } from 'store/names'
import TeamMember from 'store/types/TeamMember'
import createQuery from '../createQuery'

export type Args = {
  pid: number
  teamId: number
}

export default createQuery<Args, TeamMember>(
  'getTeamMemberByPidAndTeamId',
  (args, { db }) =>
    db.first(
      sql`
      select
        ${teamMember}.${teamMember.id},
        ${teamMember}.${teamMember.pid},
        ${teamMember}.${teamMember.teamId},
        ${teamMember}.${teamMember.userId},
        ${teamMember}.${teamMember.roleId}
      from ${teamMember}
      where ${teamMember.pid} = ${args.pid}
      and ${teamMember.teamId} = ${args.teamId}
      limit 1
    `,
      mapTeamMember
    )
)
