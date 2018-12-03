import updateOnboardingByPid from 'api/dal/Onboarding/updateOnboardingByPid'
import { ACCOUNT_STEP, ACCOUNTS_STEP } from 'api/onboarding/constants'
import createOnboardingMutation from './helpers/createOnboardingMutation'
import R from 'ramda'

export default createOnboardingMutation({
  name: 'SelectAccount',
  step: ACCOUNTS_STEP,
  mutationArgs: arg => ({
    accountGuid: arg.ofString(),
  }),
  resolver: async (existingOnboarding, args, scope) => {
    const mxAccount = R.find(
      R.propEq('guid', args.accountGuid),
      existingOnboarding.accounts
    )

    return await updateOnboardingByPid(
      {
        pid: existingOnboarding.pid,
        step: ACCOUNT_STEP,
        account: {
          ...mxAccount,
          currencyCode: mxAccount.currencyCode || 'USD',
          frankTitle: null,
          frankDescription: null,
        },
      },
      scope
    )
  },
})
