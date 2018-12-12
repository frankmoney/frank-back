import { sql, where } from 'sql'
import mapAccount from 'store/mappers/mapAccount'
import { account } from 'store/names'
import Account from 'store/types/Account'
import Id from 'store/types/Id'
import createQuery from '../createQuery'
import AccountWhere from './helpers/AccountWhere'
import accountFieldsSql from './helpers/accountFieldsSql'
import accountPredicateSql from './helpers/accountPredicateSql'

export type Args = {
  userId: undefined | null | Id
  where?: AccountWhere
}

export default createQuery<Args, Account>('getAccount', (args, { db }) =>
  db.first(
    sql`
      select ${accountFieldsSql('a', { userId: args.userId })}
      from "${account}" a
      ${where(accountPredicateSql('a', args.where))}
      limit 1
    `,
    mapAccount
  )
)
