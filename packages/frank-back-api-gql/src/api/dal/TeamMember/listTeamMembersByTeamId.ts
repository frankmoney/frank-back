import { sql } from 'sql'
import mapTeamMember from 'store/mappers/mapTeamMember'
import { teamMember } from 'store/names'
import Id from 'store/types/Id'
import TeamMember from 'store/types/TeamMember'
import createQuery from '../createQuery'

export type Args = {
  teamId: Id
}

export default createQuery<Args, TeamMember[]>(
  'listTeamMembersByTeamId',
  (args, { db }) =>
    db.query(
      sql`
        select
          ${teamMember}.${teamMember.id},
          ${teamMember}.${teamMember.pid},
          ${teamMember}.${teamMember.createdAt},
          ${teamMember}.${teamMember.creatorId},
          ${teamMember}.${teamMember.updatedAt},
          ${teamMember}.${teamMember.updaterId},
          ${teamMember}.${teamMember.teamId},
          ${teamMember}.${teamMember.userId},
          ${teamMember}.${teamMember.roleId}
        from ${teamMember}
        where ${teamMember.teamId} = ${args.teamId}
      `,
      mapTeamMember
    )
)
