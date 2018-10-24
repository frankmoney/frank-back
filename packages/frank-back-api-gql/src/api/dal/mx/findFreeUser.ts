import R from 'ramda'
import { sql } from 'sql'
import mapMxUser from 'store/mappers/mapMxUser'
import { mxMember, mxUser } from 'store/names'
import MxUser from 'store/types/MxUser'
import { throwArgumentError } from 'api/errors/ArgumentError'
import createQuery from '../createQuery'

export type Args = {
  institutionCode: string
}

export default createQuery<Args, undefined | MxUser>(
  'findFreeUser',
  (args, { db }) => {
    if (R.isNil(args.institutionCode)) {
      throwArgumentError()
    }

    return db.first(
      sql`
        select
          ${mxUser.id},
          ${mxUser.pid},
          ${mxUser.mxGuid}
        from ${mxUser}
        inner join ${mxMember} on ${mxUser.id} = ${mxMember.mxUserId}
        where ${mxMember.institutionCode} = ${args.institutionCode}
        limit 1
      `,
      mapMxUser
    )
  }
)
