import Team from 'store/models/Team'
import createQuery from 'api/dal/createAction'
import { sql } from 'sql'
import { t_team, t_user } from 'store/names'

export type Args = {
  userId: number
}

export default createQuery<Args, Team>('getTeamByUserId', (args, { db }) =>
  db.first(sql`
    select t.${t_team.id}, t.${t_team.pid}, t.${t_team.name}
    from ${t_team} t
    join ${t_user} u
    on t.${t_team.id} = u.${t_user.team_id}
    where u.${t_user.id} = ${args.userId};
  `)
)
