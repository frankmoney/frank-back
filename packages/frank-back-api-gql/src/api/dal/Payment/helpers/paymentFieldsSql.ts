import { Sql, join, sql, literal } from 'sql'
import { payment } from 'store/names'

const paymentFieldsSql = (alias: string | Sql) => {
  const alias$: Sql = typeof alias === 'string' ? literal(alias) : alias

  return join(
    [
      sql`"${alias$}"."${payment.id}"`,
      sql`"${alias$}"."${payment.pid}"`,
      sql`"${alias$}"."${payment.createdAt}"`,
      sql`"${alias$}"."${payment.creatorId}"`,
      sql`"${alias$}"."${payment.updatedAt}"`,
      sql`"${alias$}"."${payment.updaterId}"`,
      sql`"${alias$}"."${payment.data}"`,
      sql`"${alias$}"."${payment.postedOn}"`,
      sql`"${alias$}"."${payment.amount}"`,
      sql`"${alias$}"."${payment.peerName}"`,
      sql`"${alias$}"."${payment.description}"`,
      sql`"${alias$}"."${payment.verified}"`,
      sql`"${alias$}"."${payment.pending}"`,
      sql`"${alias$}"."${payment.accountId}"`,
      sql`"${alias$}"."${payment.peerId}"`,
      sql`"${alias$}"."${payment.categoryId}"`,
      sql`"${alias$}"."${payment.sourceId}"`,
      sql`"${alias$}"."${payment.descriptionUpdaterId}"`,
      sql`"${alias$}"."${payment.categoryUpdaterId}"`,
      sql`"${alias$}"."${payment.peerUpdaterId}"`,
    ],
    ',\r\n'
  )
}

export default paymentFieldsSql
