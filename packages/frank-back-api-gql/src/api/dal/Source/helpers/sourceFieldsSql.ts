import { Sql, join, sql, literal } from 'sql'
import { source } from 'store/names'

const sourceFieldsSql = (alias: string | Sql): Sql => {
  const alias$: Sql = typeof alias === 'string' ? literal(alias) : alias

  return join(
    [
      sql`"${alias$}"."${source.id}"`,
      sql`"${alias$}"."${source.pid}"`,
      sql`"${alias$}"."${source.createdAt}"`,
      sql`"${alias$}"."${source.creatorId}"`,
      sql`"${alias$}"."${source.updatedAt}"`,
      sql`"${alias$}"."${source.updaterId}"`,
      sql`"${alias$}"."${source.data}"`,
      sql`"${alias$}"."${source.name}"`,
      sql`"${alias$}"."${source.status}"`,
      sql`"${alias$}"."${source.currencyCode}"`,
      sql`"${alias$}"."${source.accountId}"`,
    ],
    ',\r\n'
  )
}

export default sourceFieldsSql
