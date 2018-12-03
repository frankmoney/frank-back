import { ACCOUNT_STEP } from 'api/onboarding/constants'
import createOnboardingUpdateStepMutation from './helpers/createOnboardingUpdateStepMutation'

const mutation = createOnboardingUpdateStepMutation({
  name: 'AccountInfo',
  step: ACCOUNT_STEP,
  mutationArgs: arg => ({
    title: arg.ofString().nullable(),
    description: arg.ofString().nullable(),
  }),
  resolve: (onboading, args) => ({
    account: {
      ...onboading.account,
      frankTitle: args.title || onboading.account.frankTitle,
      frankDescription: args.description || onboading.account.frankDescription,
    },
  }),
})

export default mutation
