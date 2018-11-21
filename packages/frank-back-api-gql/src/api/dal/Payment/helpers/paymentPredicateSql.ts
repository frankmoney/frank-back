import { identity } from 'ramda'
import { Sql, join, sql, literal } from 'sql'
import { payment, peer } from 'store/names'
import createWhereSql from '../../helpers/createWhereSql'
import PaymentWhere from './PaymentWhere'

const conjunction = (...branches: (undefined | Sql)[]) => {
  const effective = branches.filter(identity)
  return effective.length ? join(effective, ' and ') : undefined
}

const disjunction = (...branches: (undefined | Sql)[]) => {
  const effective = branches.filter(identity)
  return effective.length ? join(effective, ' or ') : undefined
}

const paymentPredicateSql = (
  alias: string | Sql,
  where?: PaymentWhere
): undefined | Sql => {
  const alias$: Sql = typeof alias === 'string' ? literal(alias) : alias

  return where
    ? conjunction(
        createWhereSql(sql`"${alias$}"."${payment.amount}"`, where.amount),
        createWhereSql(sql`"${alias$}"."${payment.postedOn}"`, where.postedOn),
        createWhereSql(sql`"${alias$}"."${payment.verified}"`, where.verified),
        where.containsText
          ? disjunction(
              sql`"${alias$}"."${payment.description}" ilike ${`%${
                where.containsText
              }%`}`,
              conjunction(
                sql`"${alias$}"."${payment.peerId}" is null`,
                sql`"${alias$}"."${payment.peerName}" ilike ${`%${
                  where.containsText
                }%`}`
              ),
              conjunction(
                sql`"${alias$}"."${payment.peerId} is not null"`,
                join(
                  [
                    sql`exists (`,
                    sql`  from "${peer}"`,
                    sql`  where "${peer}"."${peer.id}" = "${alias$}"."${
                      payment.peerId
                    }"`,
                    sql`  and "${peer}"."${peer.name}" ilike ${`%${
                      where.containsText
                    }%`}`,
                    sql`)`,
                  ],
                  '\r\n'
                )
              )
            )
          : undefined
      )
    : undefined
}

export default paymentPredicateSql
