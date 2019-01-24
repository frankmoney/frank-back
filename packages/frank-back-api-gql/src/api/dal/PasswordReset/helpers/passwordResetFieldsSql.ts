import { Sql, join, sql, literal } from 'sql'
import { passwordReset } from 'store/names'

const passwordResetFieldsSql = (alias: string | Sql): Sql => {
  const alias$: Sql = typeof alias === 'string' ? literal(alias) : alias

  return join(
    [
      sql`"${alias$}"."${passwordReset.id}"`,
      sql`"${alias$}"."${passwordReset.token}"`,
      sql`"${alias$}"."${passwordReset.createdAt}"`,
      sql`"${alias$}"."${passwordReset.updatedAt}"`,
      sql`"${alias$}"."${passwordReset.usedAt}"`,
      sql`"${alias$}"."${passwordReset.userId}"`,
    ],
    ',\r\n'
  )
}

export default passwordResetFieldsSql
