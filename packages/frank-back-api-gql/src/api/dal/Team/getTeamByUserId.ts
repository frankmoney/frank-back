import { sql } from 'sql'
import mapTeam from 'store/mappers/mapTeam'
import { team, teamMember } from 'store/names'
import Id from 'store/types/Id'
import Team from 'store/types/Team'
import createQuery from '../createQuery'

export type Args = {
  userId: Id
}

export default createQuery<Args, Team>('getTeamByUserId', (args, { db }) =>
  db.first(
    sql`
      select
        ${team}.${team.id},
        ${team}.${team.pid},
        ${team}.${team.createdAt},
        ${team}.${team.creatorId},
        ${team}.${team.updatedAt},
        ${team}.${team.updaterId},
        ${team}.${team.name}
      from ${team}
      join ${teamMember}
      on ${team}.${team.id} = ${teamMember}.${teamMember.teamId}
      where ${teamMember}.${teamMember.userId} = ${args.userId}
      limit 1
    `,
    mapTeam
  )
)
