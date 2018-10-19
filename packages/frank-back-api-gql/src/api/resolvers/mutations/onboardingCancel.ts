import { CANCELED_STEP } from 'api/onboarding/constants'
import createMutations from 'utils/createMutations'
import createPrivateResolver from 'api/resolvers/utils/createPrivateResolver'
import getOnboardingByUserId from 'api/dal/Onboarding/getOnboardingByUserId'
import updateOnboardingByPid from 'api/dal/Onboarding/updateOnboardingByPid'

const onboardingCancel = createPrivateResolver(
  'Mutation:onboarding:cancel',
  async ({ scope }) => {

    const existingOnboarding = await getOnboardingByUserId({ userId: scope.user.id }, scope)

    if (existingOnboarding) {

      await updateOnboardingByPid({
        pid: existingOnboarding.pid,
        step: CANCELED_STEP,
      }, scope)
    }

    return true
  },
)

export default createMutations(field => ({
  onboardingCancel: field.ofBool().resolve(onboardingCancel),
}))
