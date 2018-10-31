import createQuery from 'api/dal/createQuery'
import { sql } from 'sql'
import mapAccount from 'store/mappers/mapAccount'
import { account } from 'store/names'
import Account from 'store/types/Account'
import Pid from 'store/types/Pid'

export type Args = {
  pid: Pid
}

export default createQuery<Args, Account>('getAccountByPid', (args, { db }) =>
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
        where ${account}.${account.pid} = ${args.pid}
        limit 1;
      `,
    mapAccount
  )
)
