import { sql } from 'sql'
import mapOnboarding from 'store/mappers/mapOnboarding'
import { onboarding } from 'store/names'
import Id from 'store/types/Id'
import Onboarding from 'store/types/Onboarding'
import { COMPLETED_STEP } from 'api/onboarding/constants'
import createQuery from '../createQuery'

export type Args = {
  userId: Id
}

export default createQuery<Args, Onboarding>('getOnboardingByUserId', (args, { db }) =>
  db.first(
    sql`
      select
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
      from ${onboarding}
      where ${onboarding.creatorId} = ${args.userId} 
      and ${onboarding.step} != ${COMPLETED_STEP}
      limit 1
    `,
    mapOnboarding,
  ),
)
