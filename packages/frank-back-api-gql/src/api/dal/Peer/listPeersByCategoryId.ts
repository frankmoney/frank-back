import { SqlFragment, Sql, and, sql, limit } from 'sql'
import mapPeer from 'store/mappers/mapPeer'
import { payment, peer } from 'store/names'
import Peer from 'store/types/Peer'
import Id from 'store/types/Id'
import createQuery from 'api/dal/createQuery'
import PeersOrder from 'api/types/PeersOrder'

export type Args = {
  categoryId: Id
  donors: boolean
  recipients: boolean
  search?: string
  take?: number
  skip?: number
  orderBy: PeersOrder
}

export default createQuery<Args, Peer[]>(
  'listPeersByCategoryId',
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

    let orderBySql: Sql

    switch (args.orderBy) {
      case 'name_ASC':
        orderBySql = sql`${peer}.${peer.name} asc`
        break
      case 'total_DESC':
        orderBySql = sql`(
          select sum(${payment}.${payment.amount})
          from ${payment}
          where ${payment}.${payment.peerId} = ${peer}.${peer.id}
        ) DESC`
        break
      case 'lastPaymentOn_DESC':
        orderBySql = sql`(
          select max(${payment}.${payment.postedOn})
          from ${payment}
          where ${payment}.${payment.peerId} = ${peer}.${peer.id}
        ) DESC`
        break
      default:
        throw new Error(`Unknown peer order: ${args.orderBy}`)
    }

    return db.query(
      sql`
        select
          ${peer}.${peer.id},
          ${peer}.${peer.pid},
          ${peer}.${peer.createdAt},
          ${peer}.${peer.creatorId},
          ${peer}.${peer.updatedAt},
          ${peer}.${peer.updaterId},
          ${peer}.${peer.name},
          ${peer}.${peer.accountId}
        from ${peer}
        where exists (
          select 1
          from ${payment}
          where ${payment}.${payment.peerId} = ${peer}.${peer.id}
          and ${payment}.${payment.categoryId} = ${args.categoryId}
        )
        ${kindSql}
        ${searchSql}
        order by ${orderBySql}
        ${limit({ take: args.take, skip: args.skip })};
      `,
      mapPeer
    )
  }
)
