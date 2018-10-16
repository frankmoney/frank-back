import createQuery from 'api/dal/createQuery'
import { sql } from 'sql'
import mapAccount from 'store/mappers/mapAccount'
import { account, teamMember } from 'store/names'
import Account from 'store/types/Account'
import Id from 'store/types/Id'
import Pid from 'store/types/Pid'

export type Args = {
  pid: Pid
  userId: Id
}

export default createQuery<Args, Account>(
  'getAccountByPidAndUserId',
  (args, { db }) =>
    db.first(
      sql`
        select
          ${account}.${account.id},
          ${account}.${account.pid},
          ${account}.${account.createdAt},
          ${account}.${account.creatorId},
          ${account}.${account.updatedAt},
          ${account}.${account.updaterId},
          ${account}.${account.data},
          ${account}.${account.name},
          ${account}.${account.teamId}
        from ${account}
        join ${teamMember}
        on ${account}.${account.teamId} = ${teamMember}.${teamMember.id}
        where ${teamMember}.${teamMember.userId} = ${args.userId}
        and ${account}.${account.pid} = ${args.pid}
        limit 1;
      `,
      mapAccount
    )
)
