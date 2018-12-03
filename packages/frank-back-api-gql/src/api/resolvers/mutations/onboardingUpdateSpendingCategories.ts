import { SPENDING_CATEGORIES_STEP } from 'api/onboarding/constants'
import OnboadingCategoryCreateInput from 'api/schema/OnboadingCategoryCreateInput'
import createOnboardingUpdateStepMutation from './helpers/createOnboardingUpdateStepMutation'

const mutation = createOnboardingUpdateStepMutation({
  name: 'SpendingCategories',
  step: SPENDING_CATEGORIES_STEP,
  mutationArgs: arg => ({
    categories: arg.listOf(OnboadingCategoryCreateInput),
  }),
  resolve: (onboading, args) => ({
    categories: {
      ...onboading.categories,
      spending: args.categories,
    },
  }),
})

export default mutation
