import Team from 'store/models/Team'
import createQuery from 'api/dal/createAction'
import { SqlNode, sql } from 'sql'
import { t_team } from 'store/names'

export type Args = {
  predicate: SqlNode
}

export default createQuery<Args, Team>('getTeam', (args, { db }) =>
  db.first(sql`
    select ${t_team.id}, ${t_team.pid}, ${t_team.name}
    from ${t_team}
    where ${args.predicate}
    limit 1;
  `)
)
