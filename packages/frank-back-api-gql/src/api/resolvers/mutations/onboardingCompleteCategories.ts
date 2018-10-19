import { throwArgumentError } from 'api/errors/ArgumentError'
import { CATEGORIES_STEP, TEAM_STEP } from 'api/onboarding/constants'
import createMutations from 'utils/createMutations'
import createPrivateResolver from 'api/resolvers/utils/createPrivateResolver'
import getOnboardingByUserId from 'api/dal/Onboarding/getOnboardingByUserId'
import mapOnboarding from 'api/mappers/mapOnboarding'
import updateOnboardingByPid from 'api/dal/Onboarding/updateOnboardingByPid'
import OnboardingType from 'api/schema/OnboardingType'

const onboardingCompleteCategories = createPrivateResolver(
  'Mutation:onboarding:completeCategories',
  async ({ scope }) => {

    const existingOnboarding = await getOnboardingByUserId({ userId: scope.user.id }, scope)

    if (!existingOnboarding || existingOnboarding.step !== CATEGORIES_STEP) {
      return throwArgumentError()
    }

    return mapOnboarding(await updateOnboardingByPid({
      pid: existingOnboarding.pid,
      step: TEAM_STEP,
    }, scope))
  },
)

export default createMutations(field => ({
  onboardingCompleteCategories: field
    .ofType(OnboardingType)
    .resolve(onboardingCompleteCategories),
}))
