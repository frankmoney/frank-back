import { REVENUE_CATEGORIES_STEP } from 'api/onboarding/constants'
import OnboardingCategoryCreateInput from 'api/schema/OnboardingCategoryCreateInput'
import updateOnboardingByPid from 'api/dal/Onboarding/updateOnboardingByPid'
import createOnboardingMutation from './helpers/createOnboardingMutation'

const mutation = createOnboardingMutation({
  name: 'UpdateRevenueCategories',
  step: REVENUE_CATEGORIES_STEP,
  mutationArgs: arg => ({
    categories: arg.listOf(OnboardingCategoryCreateInput),
  }),
  resolver: async (onboarding, args, scope) => {
    return await updateOnboardingByPid(
      {
        pid: onboarding.pid,
        categories: {
          ...onboarding.categories,
          revenue: args.categories,
        },
      },
      scope
    )
  },
})

export default mutation
