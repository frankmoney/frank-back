import { Sql, join, sql } from 'sql'
import mapPayment from 'store/mappers/mapPayment'
import { payment } from 'store/names'
import Payment from 'store/types/Payment'
import Id from 'store/types/Id'
import createMutation from '../createMutation'
import paymentFieldsSql from './helpers/paymentFieldsSql'

type Args = {
  sourceId: Id
  accountId?: Id
}

export default createMutation<Args, Payment[]>(
  'updatePaymentsBySourceId',
  async (args, scope) => {

    const updateSqlParts: Sql[] = []

    if (args.accountId !== undefined) {
      updateSqlParts.push(sql`${payment.accountId} = ${args.accountId}`)
    }

    updateSqlParts.push(sql`${payment.updatedAt} = ${new Date()}`)

    const updateSql = join(updateSqlParts, ', ')

    const result = await scope.db.query(
      sql`
        update ${payment}
        set ${updateSql}
        where ${payment.sourceId} = ${args.sourceId}
        returning ${paymentFieldsSql(payment)}
      `,
      mapPayment,
    )

    return result
  },
)
