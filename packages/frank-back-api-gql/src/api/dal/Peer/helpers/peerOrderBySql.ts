import { Sql, join, literal, sql } from 'sql'
import { payment, peer } from 'store/names'
import PeersOrder from 'store/types/PeersOrder'

const peerOrderBySql = (alias: string | Sql, order: PeersOrder) => {
  const alias$: Sql = typeof alias === 'string' ? literal(alias) : alias

  switch (order) {
    case 'name_ASC':
      return sql`"${alias$}"."${peer.name}" asc`
    case 'total_DESC':
      return join(
        [
          sql`(`,
          sql`select sum("${alias$}.p"."${payment.amount}")`,
          sql`from "${payment}" "${alias$}.p"`,
          sql`where "${alias$}"."${peer.id}"`,
          sql`= "${alias$}.p"."${payment.peerId}"`,
          sql`)`,
          sql`desc`,
        ],
        ' '
      )
    case 'lastPaymentOn_DESC':
      return join(
        [
          sql`(`,
          sql`select max("${alias$}.p"."${payment.postedOn}")`,
          sql`from "${payment}" "${alias$}.p"`,
          sql`where "${alias$}"."${peer.id}"`,
          sql`= "${alias$}.p"."${payment.peerId}"`,
          sql`)`,
          sql`desc`,
        ],
        ' '
      )
    default:
      throw new Error(`Unknown payment order: ${order}`)
  }
}

export default peerOrderBySql
