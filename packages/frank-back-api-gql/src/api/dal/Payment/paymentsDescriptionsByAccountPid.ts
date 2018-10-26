import { sql } from 'sql'
import { payment, account } from 'store/names'
import Pid from 'store/types/Pid'
import createQuery from '../createQuery'

export type Args = {
  accountPid: Pid
  search?: string
}

export default createQuery<Args, string[]>(
  'paymentsDescriptionsByAccountPid',
  (args, { db }) => {
    const search = args.search || ''

    return db.scalars<string>(
      sql`
        select distinct ${payment}.${payment.description}
        from ${payment}
        join ${account}
        on ${account}.${account.pid} = ${args.accountPid}
        and ${payment}.${payment.accountId} = ${account}.${account.id}
        where ${payment}.${payment.description} ilike ${`%${search}%`}
      `
    )
  }
)
