import { SPENDING_CATEGORIES_STEP } from 'api/onboarding/constants'
import OnboardingCategoryCreateInput from 'api/schema/OnboardingCategoryCreateInput'
import updateOnboardingByPid from '../../dal/Onboarding/updateOnboardingByPid'
import createOnboardingMutation from './helpers/createOnboardingMutation'

const mutation = createOnboardingMutation({
  name: 'UpdateSpendingCategories',
  step: SPENDING_CATEGORIES_STEP,
  mutationArgs: arg => ({
    categories: arg.listOf(OnboardingCategoryCreateInput),
  }),
  resolver: async (onboarding, args, scope) => {
    return await updateOnboardingByPid(
      {
        pid: onboarding.pid,
        categories: {
          ...onboarding.categories,
          spending: args.categories,
        },
      },
      scope
    )
  },
})

export default mutation
