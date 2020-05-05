import updateOnboardingByPid from 'api/dal/Onboarding/updateOnboardingByPid'
import hcb from './../../hcb'
import { CHECKING_STATUS, CREDENTIALS_STEP, ACCOUNT_STEP } from 'api/onboarding/constants'
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
    let updatedOnboarding = await updateOnboardingByPid(
      {
        pid: existingOnboarding.pid,
        credentials: {
          ...existingOnboarding.credentials,
          status: CHECKING_STATUS,
        },
      },
      scope
    )

    if (updatedOnboarding.institution.isHcb) {

      const token = args.credentials[0].value

      const account = {
        name: updatedOnboarding.institution.name,
        currencyCode: "USD",
        guid: `hcb_account_guid_${token}`,
        isHcb: true,
        token
      }

      updatedOnboarding = await updateOnboardingByPid(
        {
          pid: updatedOnboarding.pid,
          step: ACCOUNT_STEP,
          accounts: [account],
          account
        },
        scope
      )

    } else {


        // TODO background
        await enterCredentials(updatedOnboarding, scope, args.credentials)

    }


    return updatedOnboarding
  },
})
