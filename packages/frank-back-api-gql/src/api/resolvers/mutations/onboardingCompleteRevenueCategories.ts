import createMutations from 'utils/createMutations'
import getOnboardingByUserId from 'api/dal/Onboarding/getOnboardingByUserId'
import updateOnboardingByPid from 'api/dal/Onboarding/updateOnboardingByPid'
import { throwArgumentError } from 'api/errors/ArgumentError'
import mapOnboarding from 'api/mappers/mapOnboarding'
import { REVENUE_CATEGORIES_STEP, TEAM_STEP } from 'api/onboarding/constants'
import OnboardingType from 'api/schema/OnboardingType'
import createPrivateResolver from '../utils/createPrivateResolver'

const onboardingCompleteRevenueCategories = createPrivateResolver(
  'Mutation:onboarding:completeRevenueCategories',
  async ({ scope }) => {
    const existingOnboarding = await getOnboardingByUserId(
      { userId: scope.user.id },
      scope
    )

    if (
      !existingOnboarding ||
      existingOnboarding.step !== REVENUE_CATEGORIES_STEP
    ) {
      return throwArgumentError()
    }

    return mapOnboarding(
      await updateOnboardingByPid(
        {
          pid: existingOnboarding.pid,
          step: TEAM_STEP,
        },
        scope
      )
    )
  }
)

export default createMutations(field => ({
  onboardingCompleteCategories: field
    .ofType(OnboardingType)
    .resolve(onboardingCompleteRevenueCategories),
}))