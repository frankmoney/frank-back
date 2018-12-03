import { REVENUE_CATEGORIES_STEP, TEAM_STEP } from 'api/onboarding/constants'

import createOnboardingCompleteStepMutation from './helpers/createOnboardingCompleteStepMutation'

const mutation = createOnboardingCompleteStepMutation({
  name: 'RevenueCategories',
  from: REVENUE_CATEGORIES_STEP,
  to: TEAM_STEP,
})

export default mutation
