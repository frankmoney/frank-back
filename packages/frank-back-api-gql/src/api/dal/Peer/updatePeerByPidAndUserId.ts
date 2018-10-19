import { Sql, join, sql } from 'sql'
import mapPeer from 'store/mappers/mapPeer'
import { account, peer, team, teamMember } from 'store/names'
import Id from 'store/types/Id'
import Peer from 'store/types/Peer'
import Pid from 'store/types/Pid'
import createQuery from '../createQuery'

export type Args = {
  userId: Id
  pid: Pid
  name?: string
}

export default createQuery<Args, undefined | Peer>(
  'updatePeerByPidAndUserId',
  async (args, { db }) => {
    const updateSqlParts: Sql[] = []

    if (args.name !== undefined) {
      updateSqlParts.push(sql`${peer.name} = ${args.name}`)
    }

    const whereSql = sql`
      where exists (
        select 1
        from ${teamMember}
        join ${team}
        on ${teamMember}.${teamMember.teamId} = ${team}.${team.id}
        join ${account}
        on ${team}.${team.id} = ${account}.${account.teamId}
        where ${account}.${account.id} = ${peer}.${peer.accountId}
        and ${teamMember}.${teamMember.userId} = ${args.userId}
      )
      and ${peer}.${peer.pid} = ${args.pid}
    `

    const selectSql = sql`
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
      ${whereSql}
      limit 1;
    `

    if (updateSqlParts.length > 0) {
      const updateSql = join(updateSqlParts, '\n          ')

      await db.command(
        sql`
          update ${peer}
          set
            ${peer.updatedAt} = now() at time zone 'utc',
            ${peer.updaterId} = ${args.userId},
            ${updateSql}
          ${whereSql};
        `
      )
    }

    const result = await db.first(selectSql, mapPeer)

    return result
  }
)
