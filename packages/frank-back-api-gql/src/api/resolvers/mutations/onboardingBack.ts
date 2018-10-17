import { throwArgumentError } from 'api/errors/ArgumentError'
import OnboardingType from 'api/schema/OnboardingType'
import {
  ACCOUNT_STEP,
  ACCOUNTS_STEP,
  AWAITING_INPUT_STATUS,
  CATEGORIES_STEP,
  CREDENTIALS_STEP,
  MFA_STEP,
  TEAM_STEP,
} from 'api/onboarding/constants'
import findExistingOnboarding from 'api/onboarding/findExistingOnboarding'
import createMutations from 'utils/createMutations'
import createPrivateResolver from 'api/resolvers/utils/createPrivateResolver'

const onboardingBack = createPrivateResolver(
  'Mutation:onboarding:finish',
  async ({ scope }) => {
    const existingOnboarding = await findExistingOnboarding(scope.user.id, prisma)

    if (!existingOnboarding) {
      return throwArgumentError()
    }

    if (existingOnboarding.step === CREDENTIALS_STEP) {
      return existingOnboarding
    }

    let newStep = CREDENTIALS_STEP

    switch (existingOnboarding.step) {
      case TEAM_STEP:
        newStep = CATEGORIES_STEP
        break
      case CATEGORIES_STEP:
        newStep = ACCOUNT_STEP
        break
      case ACCOUNT_STEP:
        newStep = ACCOUNTS_STEP
        break
      case ACCOUNTS_STEP:
      case MFA_STEP:
        newStep = CREDENTIALS_STEP
        break
    }

    const data = { step: newStep }

    if (newStep === CREDENTIALS_STEP) {
      data.member = { disconnect: true }
      data.credentials = {
        ...existingOnboarding.credentials,
        status: AWAITING_INPUT_STATUS,
      }
      data.mfa = null
    }

    return await prisma.mutation.updateOnboarding({
      where: { id: existingOnboarding.id },
      data,
    })
  }
)

export default createMutations(field => ({
  onboardingBack: field.ofType(OnboardingType).resolve(onboardingBack),
}))
