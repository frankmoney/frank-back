import R from 'ramda'
import { Sql, join, sql } from 'sql'
import mapPayment from 'store/mappers/mapPayment'
import { payment } from 'store/names'
import Payment from 'store/types/Payment'
import Pid from 'store/types/Pid'
import getAccountByPid from '../Account/getAccountByPid'
import getCategoryByPidAndAccountId from '../Category/getCategoryByPidAndAccountId'
import createMutation from '../createMutation'
import createPeer from '../Peer/createPeer'
import getPeerByPidAndAccountId from '../Peer/getPeerByPidAndAccountId'

type Args = {
  accountPid: Pid
  paymentPid: Pid
  published?: boolean
  description?: string
  categoryPid?: Pid
  peerPid?: Pid
  newPeerName: string
}

export default createMutation<Args, Payment>(
  'updatePaymentByPidAndAccountPid',
  async (args, scope) => {
    const account = await getAccountByPid({ pid: args.accountPid }, scope)

    const updateSqlParts: Sql[] = []

    if (!R.isNil(args.published)) {
      updateSqlParts.push(sql`${payment.published} = ${args.published}`)
    }

    if (!R.isNil(args.description)) {
      updateSqlParts.push(sql`${payment.description} = ${args.description}`)
    }

    if (!R.isNil(args.categoryPid)) {
      const category = await getCategoryByPidAndAccountId(
        { pid: args.categoryPid, accountId: account.id },
        scope
      )

      updateSqlParts.push(sql`${payment.categoryId} = ${category.id}`)
    }

    if (!R.isNil(args.peerPid)) {
      const peer = await getPeerByPidAndAccountId(
        { pid: args.peerPid, accountId: account.id },
        scope
      )

      updateSqlParts.push(sql`${payment.peerId} = ${peer.id}`)
    } else if (!R.isNil(args.newPeerName)) {
      const peer = await createPeer(
        { accountId: account.id, name: args.newPeerName },
        scope
      )

      updateSqlParts.push(sql`${payment.peerId} = ${peer.id}`)
    }

    const updateSql = join(updateSqlParts, ', ')

    const result = await scope.db.first(
      sql`
        update ${payment}
        set ${updateSql}
        where ${payment.pid} = ${args.paymentPid}
        and ${payment.accountId} = ${account.id}
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
      mapPayment
    )

    return result
  }
)
