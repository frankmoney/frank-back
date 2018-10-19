import { Sql, join, sql } from 'sql'
import Pid from 'store/types/Pid'
import Id from 'store/types/Id'
import mapOnboarding from 'store/mappers/mapOnboarding'
import Onboarding from 'store/types/Onboarding'
import { onboarding } from 'store/names'
import Json from 'store/types/Json'
import { throwArgumentError } from '../../errors/ArgumentError'
import createMutation from '../createMutation'
import R from 'ramda'

type Args = {
  pid: Pid
  step?: string
  clearMember?: boolean
  clearMfa?: boolean
  credentials?: Json
  mxMemberId?: Id
}

export default createMutation<Args, Onboarding>(
  'updateOnboardingByPid',
  async (args, { db }) => {
    const updateSqlParts: Sql[] = []

    if (R.isNil(args.pid)) {
      throwArgumentError()
    }

    if (!R.isNil(args.step)) {
      updateSqlParts.push(
        sql`${onboarding.step} = ${args.step}`,
      )
    }

    if (args.clearMember === true) {
      updateSqlParts.push(
        sql`${onboarding.mxMemberId} = NULL`,
      )
    }

    if (args.clearMfa === true) {
      updateSqlParts.push(
        sql`${onboarding.mfa} = NULL`,
      )
    }

    if (!R.isNil(args.credentials)) {
      updateSqlParts.push(
        sql`${onboarding.credentials} = ${JSON.stringify(args.credentials)}`,
      )
    }

    if (!R.isNil(args.mxMemberId)) {
      updateSqlParts.push(
        sql`${onboarding.mxMemberId} = ${args.mxMemberId}`,
      )
    }

    const updateSql = join(updateSqlParts, ', ')

    const result = await db.first(
      sql`
        update ${onboarding}
        set ${updateSql}
        where ${onboarding.pid} = ${args.pid}
        returning
          ${onboarding.id},
          ${onboarding.pid},
          ${onboarding.createdAt},
          ${onboarding.creatorId},
          ${onboarding.updatedAt},
          ${onboarding.updaterId},
          ${onboarding.step},
          ${onboarding.institution},
          ${onboarding.credentials},
          ${onboarding.mxMemberId}
      `,
      mapOnboarding,
    )

    return result
  },
)
