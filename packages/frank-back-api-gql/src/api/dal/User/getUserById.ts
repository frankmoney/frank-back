import createQuery from 'api/dal/createQuery'
import { sql } from 'sql'
import mapUser from 'store/mappers/mapUser'
import { user } from 'store/names'
import Id from 'store/types/Id'
import User from 'store/types/User'

export type Args = {
  id: Id
}

export default createQuery<Args, User>('getUserById', (args, { db }) =>
  db.first(
    sql`
      select
        ${user.id},
        ${user.pid},
        ${user.createdAt},
        ${user.creatorId},
        ${user.updatedAt},
        ${user.updaterId},
        ${user.email},
        ${user.lastName},
        ${user.firstName},
        ${user.avatar}
      from ${user}
      where ${user.id} = ${args.id}
      limit 1;
    `,
    mapUser
  )
)
