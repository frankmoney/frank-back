import R from 'ramda'
import { Sql, join, sql } from 'sql'
import mapPayment from 'store/mappers/mapPayment'
import { payment } from 'store/names'
import Payment from 'store/types/Payment'
import Pid from 'store/types/Pid'
import Id from 'store/types/Id'
import getCategoryByPidAndAccountId from '../Category/getCategoryByPidAndAccountId'
import createMutation from '../createMutation'
import getPeerByPidAndAccountId from '../Peer/getPeerByPidAndAccountId'

type Args = {
  paymentId: Id
  published?: boolean
  description?: string
  peerName?: string
  categoryId?: Id | null
  peerId?: Id | null
  descriptionUpdaterId?: Id
  peerUpdaterId?: Id
  categoryUpdaterId?: Id
}

export default createMutation<Args, Payment>(
  'updatePaymentByPidAndAccountPid',
  async (args, scope) => {
    const updateSqlParts: Sql[] = []

    if (!R.isNil(args.published)) {
      updateSqlParts.push(sql`${payment.published} = ${args.published}`)
    }

    if (args.description !== undefined) {
      updateSqlParts.push(sql`${payment.description} = ${args.description}`)
    }

    if (args.peerName !== undefined) {
      updateSqlParts.push(sql`${payment.peerName} = ${args.peerName}`)
    }

    // category
    if (args.categoryId !== undefined) {
      updateSqlParts.push(sql`${payment.categoryId} = ${args.categoryId}`)
    }

    // peer
    if (args.peerId !== undefined) {
      updateSqlParts.push(sql`${payment.peerId} = ${args.peerId}`)
    }

    // updaters
    if (args.descriptionUpdaterId !== undefined) {
      updateSqlParts.push(
        sql`${payment.descriptionUpdaterId} = ${args.descriptionUpdaterId}`,
      )
    }

    if (args.peerUpdaterId !== undefined) {
      updateSqlParts.push(sql`${payment.peerUpdaterId} = ${args.peerUpdaterId}`)
    }

    if (args.categoryUpdaterId !== undefined) {
      updateSqlParts.push(
        sql`${payment.categoryUpdaterId} = ${args.categoryUpdaterId}`,
      )
    }

    const updateSql = join(updateSqlParts, ', ')

    const result = await scope.db.first(
      sql`
        update ${payment}
        set ${updateSql}
        where ${payment.id} = ${args.paymentId}
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
          ${payment}.${payment.categoryId},
          ${payment}.${payment.descriptionUpdaterId},
          ${payment}.${payment.peerUpdaterId},
          ${payment}.${payment.categoryUpdaterId}
      `,
      mapPayment,
    )

    return result
  },
)
