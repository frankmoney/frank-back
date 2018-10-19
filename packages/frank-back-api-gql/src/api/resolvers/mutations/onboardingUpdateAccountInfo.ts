import { throwArgumentError } from 'api/errors/ArgumentError'
import { ACCOUNT_STEP } from 'api/onboarding/constants'
import createMutations from 'utils/createMutations'
import createPrivateResolver from 'api/resolvers/utils/createPrivateResolver'
import getOnboardingByUserId from 'api/dal/Onboarding/getOnboardingByUserId'
import mapOnboarding from 'api/mappers/mapOnboarding'
import updateOnboardingByPid from 'api/dal/Onboarding/updateOnboardingByPid'
import OnboardingType from 'api/schema/OnboardingType'

const onboardingUpdateAccountInfo = createPrivateResolver(
  'Mutation:onboarding:updateAccountInfo',
  async ({ scope, args: { title, description } }) => {

    const existingOnboarding = await getOnboardingByUserId({ userId: scope.user.id }, scope)

    if (!existingOnboarding || existingOnboarding.step !== ACCOUNT_STEP) {
      return throwArgumentError()
    }

    return mapOnboarding(await updateOnboardingByPid({
      pid: existingOnboarding.pid,
      step: ACCOUNT_STEP,
      account: {
        ...existingOnboarding.account,
        frankTitle: title || existingOnboarding.account.frankTitle,
        frankDescription:
        description || existingOnboarding.account.frankDescription,
      },
    }, scope))
  },
)

export default createMutations(field => ({
  onboardingUpdateAccountInfo: field
    .ofType(OnboardingType)
    .args(arg => ({
      title: arg.ofString().nullable(),
      description: arg.ofString().nullable(),
    }))
    .resolve(onboardingUpdateAccountInfo),
}))
