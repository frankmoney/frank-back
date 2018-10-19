import { join, sql } from 'sql'
import mapMxUser from 'store/mappers/mapMxUser'
import MxUser from 'store/types/MxUser'
import { mxUser } from 'store/names'
import { throwArgumentError } from 'api/errors/ArgumentError'
import createMutation from '../createMutation'
import R from 'ramda'

type Args = {
  guid: string
}

export default createMutation<Args, MxUser>(
  'createUser',
  async (args, { db }) => {

    if (R.isNil(args.guid)) {

      throwArgumentError()
    }

    const columns = [
      mxUser.mxGuid,
    ]

    const values = [
      args.guid,
    ]

    return await db.first(
      sql`
        insert into ${mxUser} (${join(columns, ', ')})
        values (${join(R.map(s => `'${s}'`, values), ', ')})
        returning
          ${mxUser.id},
          ${mxUser.pid},
          ${mxUser.mxGuid}
      `,
      mapMxUser,
    )
  },
)
