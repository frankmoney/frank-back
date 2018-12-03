import {
  ACCOUNT_STEP,
  SPENDING_CATEGORIES_STEP,
} from 'api/onboarding/constants'

import createOnboardingCompleteStepMutation from './helpers/createOnboardingCompleteStepMutation'

const mutation = createOnboardingCompleteStepMutation({
  name: 'AccountInfo',
  from: ACCOUNT_STEP,
  to: SPENDING_CATEGORIES_STEP,
})

export default mutation
