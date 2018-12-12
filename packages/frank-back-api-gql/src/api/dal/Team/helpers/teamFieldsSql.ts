import { Sql, join, literal, sql } from 'sql'
import { team } from 'store/names'

const teamFieldsSql = (alias: string | Sql): Sql => {
  const alias$: Sql = typeof alias === 'string' ? literal(alias) : alias

  return join(
    [
      sql`"${alias$}"."${team.id}"`,
      sql`"${alias$}"."${team.pid}"`,
      sql`"${alias$}"."${team.createdAt}"`,
      sql`"${alias$}"."${team.creatorId}"`,
      sql`"${alias$}"."${team.updatedAt}"`,
      sql`"${alias$}"."${team.updaterId}"`,
      sql`"${alias$}"."${team.name}"`,
    ],
    ' '
  )
}

export default teamFieldsSql
