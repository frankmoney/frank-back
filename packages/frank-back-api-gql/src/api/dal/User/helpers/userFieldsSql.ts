import { Sql, join, sql, literal } from 'sql'
import { user } from 'store/names'

const userFieldsSql = (alias: string | Sql): Sql => {
  const alias$: Sql = typeof alias === 'string' ? literal(alias) : alias

  return join(
    [
      sql`"${alias$}"."${user.id}"`,
      sql`"${alias$}"."${user.pid}"`,
      sql`"${alias$}"."${user.createdAt}"`,
      sql`"${alias$}"."${user.creatorId}"`,
      sql`"${alias$}"."${user.updatedAt}"`,
      sql`"${alias$}"."${user.updaterId}"`,
      sql`"${alias$}"."${user.typeId}"`,
      sql`"${alias$}"."${user.name}"`,
      sql`"${alias$}"."${user.email}"`,
      sql`"${alias$}"."${user.lastName}"`,
      sql`"${alias$}"."${user.firstName}"`,
      sql`"${alias$}"."${user.avatar}"`,
      sql`"${alias$}"."${user.color}"`,
      sql`"${alias$}"."${user.passwordHash}"`,
      sql`"${alias$}"."${user.phone}"`,
    ],
    ',\r\n'
  )
}

export default userFieldsSql
