import { sql, where } from 'sql'
import mapUser from 'store/mappers/mapUser'
import { user } from 'store/names'
import User from 'store/types/User'
import createQuery from '../createQuery'
import UserWhere from './helpers/UserWhere'
import userFieldsSql from './helpers/userFieldsSql'
import userPredicateSql from './helpers/userPredicateSql'

export type Args = {
  where?: UserWhere
}

export default createQuery<Args, User>('getUser', (args, { db }) =>
  db.first(
    sql`
      select ${userFieldsSql('u')}
      from "${user}" u
      ${where(userPredicateSql('u', args.where))}
      limit 1
    `,
    mapUser
  )
)
