import { join, sql } from 'sql'
import Id from 'store/types/Id'
import mapOnboarding from 'store/mappers/mapOnboarding'
import Onboarding from 'store/types/Onboarding'
import { onboarding } from 'store/names'
import Json from 'store/types/Json'
import { throwArgumentError } from '../../errors/ArgumentError'
import createMutation from '../createMutation'
import R from 'ramda'

type Args = {
  step: string
  institution: Json
  credentials: Json
  userId: Id
}

export default createMutation<Args, Onboarding>(
  'createOnboarding',
  async (args, { db }) => {

    if (R.isNil(args.userId)
      || R.isNil(args.step)
      || R.isNil(args.institution)
      || R.isNil(args.credentials)) {

      throwArgumentError()
    }

    const columns = [
      onboarding.step,
      onboarding.institution,
      onboarding.credentials,
      onboarding.creatorId,
    ]

    const values = [
      args.step,
      JSON.stringify(args.institution),
      JSON.stringify(args.credentials),
      args.userId,
    ]

    const result = await db.first(
      sql`
        insert into ${onboarding} (${join(columns, ', ')})
        values (${join(R.map(s => `'${s}'`, values), ', ')})
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
      mapOnboarding,
    )

    return result
  },
)