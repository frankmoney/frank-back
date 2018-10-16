import createQuery from 'api/dal/createQuery'
import { sql } from 'sql'
import mapAccount from 'store/mappers/mapAccount'
import { account, peer } from 'store/names'
import Account from 'store/types/Account'
import Id from 'store/types/Id'

export type Args = {
  peerId: Id
}

export default createQuery<Args, Account>(
  'getAccountByPeerId',
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
        join ${peer}
        on ${account}.${account.id} = ${peer}.${peer.accountId}
        where ${peer}.${peer.id} = ${args.peerId}
        limit 1;
      `,
      mapAccount
    )
)
