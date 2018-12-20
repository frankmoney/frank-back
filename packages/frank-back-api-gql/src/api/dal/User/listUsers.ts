import { limit, sql, where } from 'sql'
import mapUser from 'store/mappers/mapUser'
import { user } from 'store/names'
import User from 'store/types/User'
import createQuery from '../createQuery'
import UserWhere from './helpers/UserWhere'
import userFieldsSql from './helpers/userFieldsSql'
import userPredicateSql from './helpers/userPredicateSql'

export type Args = {
  where?: UserWhere
  take?: number
  skip?: number
}

export default createQuery<Args, User[]>('listUsers', (args, { db }) =>
  db.query(
    sql`
      select ${userFieldsSql('u')}
      from "${user}" u
      ${where(userPredicateSql('u', args.where))}
      ${limit({ take: args.take, skip: args.skip })}
    `,
    mapUser
  )
)
