import updateOnboardingByPid from 'api/dal/Onboarding/updateOnboardingByPid'
import { CHECKING_STATUS, MFA_STEP } from 'api/onboarding/constants'
import OnboardingMfaChallengesInput from 'api/schema/OnboardingMfaChallengesInput'
import enterMfaChallenges from 'api/onboarding/enterMfaChallenges'
import createOnboardingMutation from './helpers/createOnboardingMutation'

export default createOnboardingMutation({
  name: 'EnterMfaChallenges',
  step: MFA_STEP,
  mutationArgs: arg => ({
    challenges: arg.listOf(OnboardingMfaChallengesInput),
  }),
  resolver: async (existingOnboarding, args, scope) => {
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

    // TODO background
    await enterMfaChallenges(updatedOnboarding, scope, args.challenges)

    return updatedOnboarding
  },
})
