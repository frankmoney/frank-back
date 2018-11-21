import { identity } from 'ramda'
import { Sql, fragment, join, sql, literal } from 'sql'
import { payment, peer } from 'store/names'
import createWhereSql from '../../helpers/createWhereSql'
import PaymentWhere from './PaymentWhere'

const conjunction = (...branches: (undefined | Sql)[]) => {
  const effective = branches.filter(identity)
  return effective.length
    ? fragment([literal('('), join(effective, ' and '), literal(')')])
    : undefined
}

const disjunction = (...branches: (undefined | Sql)[]) => {
  const effective = branches.filter(identity)
  return effective.length
    ? fragment([literal('('), join(effective, ' or '), literal(')')])
    : undefined
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
          : undefined
      )
    : undefined
}

export default paymentPredicateSql
