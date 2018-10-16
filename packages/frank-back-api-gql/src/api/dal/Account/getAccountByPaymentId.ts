import createQuery from 'api/dal/createQuery'
import { sql } from 'sql'
import mapAccount from 'store/mappers/mapAccount'
import { account, payment } from 'store/names'
import Account from 'store/types/Account'
import Id from 'store/types/Id'

export type Args = {
  paymentId: Id
}

export default createQuery<Args, Account>(
  'getAccountByPaymentId',
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
        join ${payment}
        on ${account}.${account.id} = ${payment}.${payment.accountId}
        where ${payment}.${payment.id} = ${args.paymentId}
        limit 1;
      `,
      mapAccount
    )
)
