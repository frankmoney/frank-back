import createQuery from 'api/dal/createQuery'
import { sql } from 'sql'
import mapUser from 'store/mappers/mapUser'
import { user } from 'store/names'
import User from 'store/types/User'

export type Args = {
  ids: number[]
}

export default createQuery<Args, User[]>('listUsersByIds', (args, { db }) =>
  db.query(
    sql`
      select
        ${user.id},
        ${user.pid},
        ${user.email},
        ${user.lastName},
        ${user.firstName},
        ${user.avatar}
      from ${user}
      where ${user.id} in (${args.ids});
    `,
    mapUser
  )
)
