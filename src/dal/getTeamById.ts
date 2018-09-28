import Team from 'app/entities/Team'
import { sql } from './sql'
import createAction from './createAction'

export type Args = {
  id: number
}

export default createAction<Args, Team>(
  'getTeamById',
  ({ id }, { uow }) => uow.first(sql`
    select "id", "pid", "name"
    from "t_team"
    where "id" = ${id}
  `)
)
