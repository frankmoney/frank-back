import R from 'ramda'
import { Sql, join, sql } from 'sql'
import mapPayment from 'store/mappers/mapPayment'
import { payment } from 'store/names'
import Payment from 'store/types/Payment'
import Pid from 'store/types/Pid'
import { throwArgumentError } from 'api/errors/ArgumentError'
import createMutation from '../createMutation'

type Args = {
  pid: Pid
  published?: boolean
}

export default createMutation<Args, Payment>(
  'updatePaymentByPid',
  async (args, { db }) => {
    const updateSqlParts: Sql[] = []

    if (R.isNil(args.pid)) {
      throwArgumentError()
    }

    if (!R.isNil(args.published)) {
      updateSqlParts.push(sql`${payment.published} = ${args.published}`)
    }

    const updateSql = join(updateSqlParts, ', ')

    const result = await db.first(
      sql`
        update ${payment}
        set ${updateSql}
        where ${payment.pid} = ${args.pid}
        returning
          ${payment}.${payment.id},
          ${payment}.${payment.pid},
          ${payment}.${payment.createdAt},
          ${payment}.${payment.creatorId},
          ${payment}.${payment.updatedAt},
          ${payment}.${payment.updaterId},
          ${payment}.${payment.data},
          ${payment}.${payment.postedOn},
          ${payment}.${payment.amount},
          ${payment}.${payment.peerName},
          ${payment}.${payment.description},
          ${payment}.${payment.published},
          ${payment}.${payment.accountId},
          ${payment}.${payment.peerId},
          ${payment}.${payment.categoryId}
      `,
      mapPayment,
    )

    return result
  },
)
