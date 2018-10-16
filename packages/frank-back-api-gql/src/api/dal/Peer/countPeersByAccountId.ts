import { SqlFragment, and, sql } from 'sql'
import { payment, peer } from 'store/names'
import Peer from 'store/types/Peer'
import Id from 'store/types/Id'
import createQuery from 'api/dal/createQuery'

export type Args = {
  accountId: Id
  donors: boolean
  recipients: boolean
  search?: string
}

export default createQuery<Args, Peer[]>(
  'countPeersByAccountId',
  (args, { db }) => {
    let kindFragment: undefined | SqlFragment

    if (args.donors) {
      if (args.recipients) {
        kindFragment = undefined
      } else {
        kindFragment = sql`
          exists (
            select 1
            from ${payment}
            where ${payment}.${payment.peerId} = ${peer}.${peer.id}
            and ${payment}.${payment.amount} > 0
          )
        `
      }
    } else {
      if (args.recipients) {
        kindFragment = sql`
          exists (
            select 1
            from ${payment}
            where ${payment}.${payment.peerId} = ${peer}.${peer.id}
            and ${payment}.${payment.amount} < 0
          )
        `
      } else {
        return Promise.resolve([])
      }
    }

    const kindSql = and(kindFragment)

    const searchSql = and(
      args.search
        ? sql`${peer}.${peer.name} ilike ${`%${args.search}%`}`
        : undefined
    )

    return db.scalar(
      sql`
        select count(*)
        from ${peer}
        where ${peer}.${peer.accountId} = ${args.accountId}
        ${kindSql}
        ${searchSql};
      `
    )
  }
)
