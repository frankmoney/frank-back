import createMutations from 'utils/createMutations'
import getOnboardingByUserId from 'api/dal/Onboarding/getOnboardingByUserId'
import updateOnboardingByPid from 'api/dal/Onboarding/updateOnboardingByPid'
import { throwArgumentError } from 'api/errors/ArgumentError'
import mapOnboarding from 'api/mappers/mapOnboarding'
import { ACCOUNT_STEP } from 'api/onboarding/constants'
import OnboardingType from 'api/schema/OnboardingType'
import createPrivateResolver from '../utils/createPrivateResolver'

const onboardingUpdateAccountInfo = createPrivateResolver(
  'Mutation:onboarding:updateAccountInfo',
  async ({ scope, args: { title, description } }) => {
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
          account: {
            ...existingOnboarding.account,
            frankTitle: title || existingOnboarding.account.frankTitle,
            frankDescription:
              description || existingOnboarding.account.frankDescription,
          },
        },
        scope
      )
    )
  }
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
