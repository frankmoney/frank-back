import { sql, where } from 'sql'
import { teamMember } from 'store/names'
import createQuery from '../createQuery'
import TeamMemberWhere from './helpers/TeamMemberWhere'
import teamMemberPredicateSql from './helpers/teamMemberPredicateSql'

export type Args = {
  where: TeamMemberWhere
}

export default createQuery<Args, number>('countTeamMembers', (args, { db }) =>
  db.scalar(
    sql`
      select count(*)
      from "${teamMember}" m
      ${where(teamMemberPredicateSql('m', args.where))}
    `
  )
)
