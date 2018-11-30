import createMutations from 'utils/createMutations'
import getOnboardingByUserId from 'api/dal/Onboarding/getOnboardingByUserId'
import updateOnboardingByPid from 'api/dal/Onboarding/updateOnboardingByPid'
import { throwArgumentError } from 'api/errors/ArgumentError'
import mapOnboarding from 'api/mappers/mapOnboarding'
import { CHECKING_STATUS, MFA_STEP } from 'api/onboarding/constants'
import enterMfaChallenges from 'api/onboarding/enterMfaChallenges'
import OnboardingType from 'api/schema/OnboardingType'
import OnboardingMfaChallengesInput from 'api/schema/OnboardingMfaChallengesInput'
import createPrivateResolver from '../utils/createPrivateResolver'

const onboardingEnterMfaChallenges = createPrivateResolver(
  'Mutation:onboarding:enterMfaChallenges',
  async ({ scope, args: { challenges } }) => {
    const existingOnboarding = await getOnboardingByUserId(
      { userId: scope.user.id },
      scope
    )

    if (
      !existingOnboarding ||
      existingOnboarding.step !== MFA_STEP ||
      existingOnboarding.mfa.status === CHECKING_STATUS
    ) {
      return throwArgumentError()
    }

    const updatedOnboarding = await updateOnboardingByPid(
      {
        pid: existingOnboarding.pid,
        mfa: {
          ...existingOnboarding.mfa,
          status: CHECKING_STATUS,
        },
      },
      scope
    )

    // background
    await enterMfaChallenges(updatedOnboarding, scope, challenges)

    return mapOnboarding(updatedOnboarding)
  }
)

export default createMutations(field => ({
  onboardingEnterMfaChallenges: field
    .ofType(OnboardingType)
    .args(arg => ({
      challenges: arg.listOf(OnboardingMfaChallengesInput),
    }))
    .resolve(onboardingEnterMfaChallenges),
}))
