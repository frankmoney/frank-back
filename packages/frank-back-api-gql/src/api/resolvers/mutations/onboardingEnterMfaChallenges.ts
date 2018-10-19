import { throwArgumentError } from 'api/errors/ArgumentError'
import OnboardingType from 'api/schema/OnboardingType'
import { CHECKING_STATUS, CREDENTIALS_STEP, MFA_STEP } from 'api/onboarding/constants'
import enterMfaChallenges from 'api/onboarding/enterMfaChallenges'
import { Json } from 'gql/index'
import createMutations from 'utils/createMutations'
import createPrivateResolver from 'api/resolvers/utils/createPrivateResolver'
import getOnboardingByUserId from 'api/dal/Onboarding/getOnboardingByUserId'
import updateOnboardingByPid from 'api/dal/Onboarding/updateOnboardingByPid'
import mapOnboarding from 'api/mappers/mapOnboarding'

const onboardingEnterMfaChallenges = createPrivateResolver(
  'Mutation:onboarding:enterMfaChallenges',
  async ({ scope, args: { challenges } }) => {

    const existingOnboarding = await getOnboardingByUserId({ userId: scope.user.id }, scope)

    if (
      !existingOnboarding ||
      existingOnboarding.step !== MFA_STEP ||
      existingOnboarding.mfa.status === CHECKING_STATUS
    ) {
      return throwArgumentError()
    }

    const updatedOnboarding = await updateOnboardingByPid({
      pid: existingOnboarding.pid,
      mfa: {
        ...existingOnboarding.mfa,
        status: CHECKING_STATUS,
      },
    }, scope)

    // background
    await enterMfaChallenges(updatedOnboarding, scope, challenges)

    return mapOnboarding(updatedOnboarding)
  },
)

export default createMutations(field => ({
  onboardingEnterMfaChallenges: field
    .ofType(OnboardingType)
    .args(arg => ({
      challenges: arg.listOf(Json),
    }))
    .resolve(onboardingEnterMfaChallenges),
}))
