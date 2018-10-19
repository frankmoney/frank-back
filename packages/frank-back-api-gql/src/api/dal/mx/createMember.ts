import { join, sql } from 'sql'
import Id from 'store/types/Id'
import mapMxMember from 'store/mappers/mapMxMember'
import MxMember from 'store/types/MxMember'
import { mxMember } from 'store/names'
import { throwArgumentError } from 'api/errors/ArgumentError'
import createMutation from '../createMutation'
import R from 'ramda'

type Args = {
  guid: string
  institutionCode: string,
  mxUserId: Id,
}

export default createMutation<Args, MxMember>(
  'createMember',
  async (args, { db }) => {

    if (R.isNil(args.guid)
      || R.isNil(args.institutionCode)
      || R.isNil(args.mxUserId)) {

      throwArgumentError()
    }

    const columns = [
      mxMember.mxGuid,
      mxMember.institutionCode,
      mxMember.mxUserId,
    ]

    const values = [
      args.guid,
      args.institutionCode,
      args.mxUserId,
    ]

    return await db.first(
      sql`
        insert into ${mxMember} (${join(columns, ', ')})
        values (${join(R.map(s => `'${s}'`, values), ', ')})
        returning
          ${mxMember.id},
          ${mxMember.pid},
          ${mxMember.mxGuid},
          ${mxMember.institutionCode},
          ${mxMember.mxUserId}
      `,
      mapMxMember,
    )
  },
)
