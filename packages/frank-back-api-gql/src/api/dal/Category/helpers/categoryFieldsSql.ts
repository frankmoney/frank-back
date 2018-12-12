import { Sql, join, sql, literal } from 'sql'
import { category } from 'store/names'

const categoryFieldsSql = (alias: string | Sql): Sql => {
  const alias$: Sql = typeof alias === 'string' ? literal(alias) : alias

  return join(
    [
      sql`"${alias$}"."${category.id}"`,
      sql`"${alias$}"."${category.pid}"`,
      sql`"${alias$}"."${category.createdAt}"`,
      sql`"${alias$}"."${category.creatorId}"`,
      sql`"${alias$}"."${category.updatedAt}"`,
      sql`"${alias$}"."${category.updaterId}"`,
      sql`"${alias$}"."${category.name}"`,
      sql`"${alias$}"."${category.color}"`,
      sql`"${alias$}"."${category.accountId}"`,
      sql`"${alias$}"."${category.type}"`,
    ],
    ',\r\n'
  )
}

export default categoryFieldsSql
