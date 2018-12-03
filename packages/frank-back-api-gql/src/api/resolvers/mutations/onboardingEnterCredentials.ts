import updateOnboardingByPid from 'api/dal/Onboarding/updateOnboardingByPid'
import { CHECKING_STATUS, CREDENTIALS_STEP } from 'api/onboarding/constants'
import enterCredentials from 'api/onboarding/enterCredentials'
import OnboardingCredentialsInput from 'api/schema/OnboardingCredentialsInput'
import createOnboardingMutation from './helpers/createOnboardingMutation'

export default createOnboardingMutation({
  name: 'EnterCredentials',
  step: CREDENTIALS_STEP,
  mutationArgs: arg => ({
    credentials: arg.listOf(OnboardingCredentialsInput),
  }),
  resolver: async (existingOnboarding, args, scope) => {
    const updatedOnboarding = await updateOnboardingByPid(
      {
        pid: existingOnboarding.pid,
        credentials: {
          ...existingOnboarding.credentials,
          status: CHECKING_STATUS,
        },
      },
      scope
    )

    // TODO background
    await enterCredentials(updatedOnboarding, scope, args.credentials)

    return updatedOnboarding
  },
})
