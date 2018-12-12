import { sql, where } from 'sql'
import mapAccount from 'store/mappers/mapAccount'
import { team } from 'store/names'
import Team from 'store/types/Team'
import createQuery from '../createQuery'
import TeamWhere from './helpers/TeamWhere'
import teamFieldsSql from './helpers/teamFieldsSql'
import teamPredicateSql from './helpers/teamPredicateSql'

export type Args = {
  where?: TeamWhere
}

export default createQuery<Args, Team>('getTeam', (args, { db }) =>
  db.first(
    sql`
      select ${teamFieldsSql('t')}
      from "${team}" t
      ${where(teamPredicateSql('t', args.where))}
      limit 1
    `,
    mapAccount
  )
)
