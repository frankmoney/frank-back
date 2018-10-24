import createMutations from 'utils/createMutations'
import { throwArgumentError } from 'api/errors/ArgumentError'
import getOnboardingByUserId from 'api/dal/Onboarding/getOnboardingByUserId'
import updateOnboardingByPid from 'api/dal/Onboarding/updateOnboardingByPid'
import mapOnboarding from 'api/mappers/mapOnboarding'
import { ACCOUNT_STEP, CATEGORIES_STEP } from 'api/onboarding/constants'
import OnboardingType from 'api/schema/OnboardingType'
import createPrivateResolver from '../utils/createPrivateResolver'

const onboardingCompleteAccountInfo = createPrivateResolver(
  'Mutation:onboarding:completeAccountInfo',
  async ({ scope }) => {
    const existingOnboarding = await getOnboardingByUserId(
      { userId: scope.user.id },
      scope
    )

    if (!existingOnboarding || existingOnboarding.step !== ACCOUNT_STEP) {
      return throwArgumentError()
    }

    return mapOnboarding(
      await updateOnboardingByPid(
        {
          pid: existingOnboarding.pid,
          step: CATEGORIES_STEP,
        },
        scope
      )
    )
  }
)

export default createMutations(field => ({
  onboardingCompleteAccountInfo: field
    .ofType(OnboardingType)
    .resolve(onboardingCompleteAccountInfo),
}))
