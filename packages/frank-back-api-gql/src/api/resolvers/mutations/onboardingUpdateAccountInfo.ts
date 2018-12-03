import { ACCOUNT_STEP } from 'api/onboarding/constants'
import updateOnboardingByPid from 'api/dal/Onboarding/updateOnboardingByPid'
import createOnboardingMutation from './helpers/createOnboardingMutation'

const mutation = createOnboardingMutation({
  name: 'UpdateAccountInfo',
  step: ACCOUNT_STEP,
  mutationArgs: arg => ({
    title: arg.ofString().nullable(),
    description: arg.ofString().nullable(),
  }),
  resolver: async (onboarding, args, scope) => {
    return await updateOnboardingByPid(
      {
        pid: onboarding.pid,
        account: {
          ...onboarding.account,
          frankTitle: args.title || onboarding.account.frankTitle,
          frankDescription:
            args.description || onboarding.account.frankDescription,
        },
      },
      scope
    )
  },
})

export default mutation
