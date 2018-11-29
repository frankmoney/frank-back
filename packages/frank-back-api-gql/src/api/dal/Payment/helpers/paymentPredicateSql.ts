import { Sql, join, sql, literal } from 'sql'
import { category, payment, peer } from 'store/names'
import categoryPredicateSql from '../../Category/helpers/categoryPredicateSql'
import conjunction from '../../helpers/conjunction'
import createWhereSql from '../../helpers/createWhereSql'
import disjunction from '../../helpers/disjunction'
import PaymentWhere from './PaymentWhere'

const paymentPredicateSql = (
  alias: string | Sql,
  where?: PaymentWhere
): undefined | Sql => {
  const alias$: Sql = typeof alias === 'string' ? literal(alias) : alias

  const categoryAlias = sql`${alias$}.category`
  const categorySql = categoryPredicateSql(categoryAlias, where && where.category)

  return where
    ? conjunction(
        createWhereSql(sql`"${alias$}"."${payment.amount}"`, where.amount),
        createWhereSql(sql`"${alias$}"."${payment.postedOn}"`, where.postedOn),
        createWhereSql(sql`"${alias$}"."${payment.verified}"`, where.verified),
        createWhereSql(sql`"${alias$}"."${payment.pending}"`, where.pending),
        createWhereSql(
          sql`"${alias$}"."${payment.accountId}"`,
          where.accountId
        ),
        createWhereSql(
          sql`"${alias$}"."${payment.categoryId}"`,
          where.categoryId
        ),
        createWhereSql(sql`"${alias$}"."${payment.peerId}"`, where.peerId),
        where.containsText
          ? disjunction(
              sql`"${alias$}"."${payment.description}" ilike ${`%${
                where.containsText
              }%`}`,
              conjunction(
                sql`"${alias$}"."${payment.peerId}" is null`,
                join(
                  [
                    sql`"${alias$}"."${payment.peerName}"`,
                    sql`ilike ${`%${where.containsText}%`}`,
                  ],
                  ' '
                )
              ),
              conjunction(
                sql`"${alias$}"."${payment.peerId}" is not null`,
                join(
                  [
                    sql`exists (`,
                    sql`select 1`,
                    sql`from "${peer}"`,
                    sql`where "${peer}"."${peer.id}"`,
                    sql`= "${alias$}"."${payment.peerId}"`,
                    sql`and "${peer}"."${peer.name}"`,
                    sql`ilike ${`%${where.containsText}%`}`,
                    sql`)`,
                  ],
                  ' '
                )
              )
            )
          : undefined,
        categorySql && join(
          [
            sql`exists (`,
            sql`select 1`,
            sql`from "${category}" "${categoryAlias}"`,
            sql`where "${categoryAlias}"."${category.id}"`,
            sql`= "${alias$}"."${payment.categoryId}"`,
            sql`and ${categorySql}`,
            sql`)`,
          ],
          ' '
        )
      )
    : undefined
}

export default paymentPredicateSql
