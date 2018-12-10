import { Sql, join, sql, literal } from 'sql'
import { peer } from 'store/names'

const peerFieldsSql = (alias: string | Sql) => {
  const alias$: Sql = typeof alias === 'string' ? literal(alias) : alias

  return join(
    [
      sql`"${alias$}"."${peer.id}"`,
      sql`"${alias$}"."${peer.pid}"`,
      sql`"${alias$}"."${peer.createdAt}"`,
      sql`"${alias$}"."${peer.creatorId}"`,
      sql`"${alias$}"."${peer.updatedAt}"`,
      sql`"${alias$}"."${peer.updaterId}"`,
      sql`"${alias$}"."${peer.name}"`,
      sql`"${alias$}"."${peer.accountId}"`,
    ],
    ',\r\n'
  )
}

export default peerFieldsSql
