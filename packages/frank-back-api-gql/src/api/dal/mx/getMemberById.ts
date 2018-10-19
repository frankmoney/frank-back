import { sql } from 'sql'
import mapMxMember from 'store/mappers/mapMxMember'
import mapMxUser from 'store/mappers/mapMxUser'
import { mxMember, mxUser } from 'store/names'
import Id from 'store/types/Id'
import MxMember from 'store/types/MxMember'
import createQuery from '../createQuery'
import R from 'ramda'

export type Args = {
  id: Id
}

export default createQuery<Args, undefined | MxMember>('getMemberById', async (args, { db }) => {

  if (R.isNil(args.id)) {

    return undefined
  }

  const member = await db.first(
    sql`
      select
        ${mxMember.id},
        ${mxMember.pid},
        ${mxMember.mxGuid},
        ${mxMember.institutionCode},
        ${mxMember.mxUserId}
      from ${mxMember}
      where ${mxMember.id} = ${args.id}
      limit 1
    `,
    mapMxMember,
  )

  if (member) {

    member.mxUser = await db.first(
      sql`
      select
        ${mxUser.id},
        ${mxUser.pid},
        ${mxUser.mxGuid}
      from ${mxUser}
      where ${mxUser.id} = ${member.mxUserId}
      limit 1
    `,
      mapMxUser,
    )
  }

  return member
})
