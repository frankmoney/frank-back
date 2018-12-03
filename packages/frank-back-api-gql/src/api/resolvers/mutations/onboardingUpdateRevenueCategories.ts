import { REVENUE_CATEGORIES_STEP } from 'api/onboarding/constants'
import OnboadingCategoryCreateInput from 'api/schema/OnboadingCategoryCreateInput'
import createOnboardingUpdateStepMutation from './helpers/createOnboardingUpdateStepMutation'

const mutation = createOnboardingUpdateStepMutation({
  name: 'RevenueCategories',
  step: REVENUE_CATEGORIES_STEP,
  mutationArgs: arg => ({
    categories: arg.listOf(OnboadingCategoryCreateInput),
  }),
  resolve: (onboading, args) => ({
    categories: {
      ...onboading.categories,
      revenue: args.categories,
    },
  }),
})

export default mutation
