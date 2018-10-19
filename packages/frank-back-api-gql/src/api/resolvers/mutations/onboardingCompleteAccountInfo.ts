import { throwArgumentError } from 'api/errors/ArgumentError'
import { ACCOUNT_STEP, CATEGORIES_STEP } from 'api/onboarding/constants'
import createMutations from 'utils/createMutations'
import createPrivateResolver from 'api/resolvers/utils/createPrivateResolver'
import getOnboardingByUserId from 'api/dal/Onboarding/getOnboardingByUserId'
import mapOnboarding from 'api/mappers/mapOnboarding'
import updateOnboardingByPid from 'api/dal/Onboarding/updateOnboardingByPid'
import OnboardingType from 'api/schema/OnboardingType'

const onboardingCompleteAccountInfo = createPrivateResolver(
  'Mutation:onboarding:completeAccountInfo',
  async ({ scope }) => {

    const existingOnboarding = await getOnboardingByUserId({ userId: scope.user.id }, scope)

    if (!existingOnboarding || existingOnboarding.step !== ACCOUNT_STEP) {
      return throwArgumentError()
    }

    return mapOnboarding(await updateOnboardingByPid({
      pid: existingOnboarding.pid,
      step: CATEGORIES_STEP,
    }, scope))
  },
)

export default createMutations(field => ({
  onboardingCompleteAccountInfo: field
    .ofType(OnboardingType)
    .resolve(onboardingCompleteAccountInfo),
}))
