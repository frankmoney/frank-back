import R from 'ramda'
import { Sql, join, sql } from 'sql'
import mapOnboarding from 'store/mappers/mapOnboarding'
import { onboarding } from 'store/names'
import Id from 'store/types/Id'
import Json from 'store/types/Json'
import Onboarding from 'store/types/Onboarding'
import Pid from 'store/types/Pid'
import { throwArgumentError } from 'api/errors/ArgumentError'
import createMutation from '../createMutation'

type Args = {
  pid: Pid
  step?: string
  credentials?: Json
  mfa?: Json
  accounts?: Json
  account?: Json
  categories?: Json
  team?: Json
  mxMemberId?: Id
  clearMember?: boolean
  clearMfa?: boolean
}

export default createMutation<Args, Onboarding>(
  'updateOnboardingByPid',
  async (args, { db }) => {
    const updateSqlParts: Sql[] = []

    if (R.isNil(args.pid)) {
      throwArgumentError()
    }

    if (!R.isNil(args.step)) {
      updateSqlParts.push(sql`${onboarding.step} = ${args.step}`)
    }

    if (!R.isNil(args.credentials)) {
      updateSqlParts.push(
        sql`${onboarding.credentials} = ${JSON.stringify(args.credentials)}`
      )
    }

    if (!R.isNil(args.mfa)) {
      updateSqlParts.push(sql`${onboarding.mfa} = ${JSON.stringify(args.mfa)}`)
    }

    if (!R.isNil(args.accounts)) {
      updateSqlParts.push(
        sql`${onboarding.accounts} = ${JSON.stringify(args.accounts)}`
      )
    }

    if (!R.isNil(args.account)) {
      updateSqlParts.push(
        sql`${onboarding.account} = ${JSON.stringify(args.account)}`
      )
    }

    if (!R.isNil(args.categories)) {
      updateSqlParts.push(
        sql`${onboarding.categories} = ${JSON.stringify(args.categories)}`
      )
    }

    if (!R.isNil(args.team)) {
      updateSqlParts.push(
        sql`${onboarding.team} = ${JSON.stringify(args.team)}`
      )
    }

    if (!R.isNil(args.mxMemberId)) {
      updateSqlParts.push(sql`${onboarding.mxMemberId} = ${args.mxMemberId}`)
    }

    if (args.clearMember === true) {
      updateSqlParts.push(sql`${onboarding.mxMemberId} = NULL`)
    }

    if (args.clearMfa === true) {
      updateSqlParts.push(sql`${onboarding.mfa} = NULL`)
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
          ${onboarding.mfa},
          ${onboarding.accounts},
          ${onboarding.account},
          ${onboarding.categories},
          ${onboarding.team},
          ${onboarding.mxMemberId}
      `,
      mapOnboarding
    )

    return result
  }
)
