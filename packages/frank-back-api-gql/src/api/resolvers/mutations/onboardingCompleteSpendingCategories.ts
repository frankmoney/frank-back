import {
  REVENUE_CATEGORIES_STEP,
  SPENDING_CATEGORIES_STEP,
} from 'api/onboarding/constants'

import createOnboardingCompleteStepMutation from './helpers/createOnboardingCompleteStepMutation'

const mutation = createOnboardingCompleteStepMutation({
  name: 'SpendingCategories',
  from: SPENDING_CATEGORIES_STEP,
  to: REVENUE_CATEGORIES_STEP,
})

export default mutation
