import { Sql, literal, sql } from 'sql'
import { payment } from 'store/names'
import PaymentsOrder from 'store/types/PaymentsOrder'

const paymentOrderBySql = (alias: string | Sql, order: PaymentsOrder) => {
  const alias$: Sql = typeof alias === 'string' ? literal(alias) : alias

  switch (order) {
    case 'postedOn_ASC':
      return sql`"${alias$}"."${payment.postedOn}" asc`
    case 'postedOn_DESC':
      return sql`"${alias$}"."${payment.postedOn}" desc`
    case 'amount_DESC':
      return sql`"${alias$}"."${payment.amount}" desc`
    default:
      throw new Error(`Unknown payment order: ${order}`)
  }
}

export default paymentOrderBySql
