import { uniq } from 'ramda'
import { Sql, join, sql, where, fragment, literal } from 'sql'
import { payment } from 'store/names'
import AggregatedPayments from 'store/types/AggregatedPayments'
import { argumentError } from 'api/errors/ArgumentError'
import createQuery from '../createQuery'
import PaymentWhere from './helpers/PaymentWhere'
import paymentPredicateSql from './helpers/paymentPredicateSql'

export type Args = {
  where?: PaymentWhere
  fields: (keyof AggregatedPayments)[]
}

const fieldSqlMap: { [K in keyof AggregatedPayments]: Sql } = {
  count: sql`count(*)`,
  postedOnMin: sql`min(p."${payment.postedOn}")`,
  postedOnMax: sql`max(p."${payment.postedOn}")`,
  amountMin: sql`min(p."${payment.amount}")`,
  amountMax: sql`max(p."${payment.amount}")`,
  totalSum: sql`sum(p."${payment.amount}")`,
}

export default createQuery<Args, AggregatedPayments>(
  'aggregatePayments',
  async (args, { db }) => {
    const fieldsSqls: Sql[] = []

    for (const field of uniq(args.fields)) {
      const fieldSql = fieldSqlMap[field]

      if (!fieldSql) {
        throw argumentError(`Unknown field: ${field}`)
      }

      fieldsSqls.push(fragment([fieldSql, literal(` "${field}"`)]))
    }

    if (!fieldsSqls.length) {
      return {}
    }

    const fieldsSql = join(fieldsSqls, ',\r\n          ')

    return db.first<AggregatedPayments>(
      sql`
        select
          ${fieldsSql}
        from "${payment}" p
        ${where(paymentPredicateSql('p', args.where))}
        limit 1
      `
    )
  }
)
