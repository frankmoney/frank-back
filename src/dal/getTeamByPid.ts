import Team from 'app/entities/Team'
import createAction from './createAction'
import { sql } from './sql'

export type Args = {
  pid: number
}

const getTeamByPid = createAction<Args, Team>(
  'getTeamByPid',
  async ({ pid }, { uow }) => {
    const team = uow.first(
      sql`
        select "id", "pid", "name"
        from "t_team"
        where "pid" = ${pid}
      `
    )

    return team
  }
)

export default getTeamByPid
