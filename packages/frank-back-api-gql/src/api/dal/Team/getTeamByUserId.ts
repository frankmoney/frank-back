import { sql } from 'sql'
import mapTeam from 'store/mappers/mapTeam'
import { team, teamMember } from 'store/names'
import Team from 'store/types/Team'
import createQuery from '../createQuery'

export type Args = {
  userId: number
}

export default createQuery<Args, Team>('getTeamByUserId', (args, { db }) =>
  db.first(
    sql`
      select
        ${team}.${team.id},
        ${team}.${team.pid},
        ${team}.${team.name}
      from ${team}
      join ${teamMember}
      on ${team}.${team.id} = ${teamMember}.${teamMember.id}
      where ${teamMember}.${teamMember.userId} = ${args.userId}
      limit 1
    `,
    mapTeam
  )
)
