import { throwArgumentError } from 'app/errors/ArgumentError'
import OnboardingType from 'app/graphql/schema/OnboardingType/OnboardingType'
import {
  ACCOUNT_STEP,
  ACCOUNTS_STEP,
  CATEGORIES_STEP,
  CREDENTIALS_STEP,
} from 'app/onboarding/constants'
import findExistingOnboarding from 'app/onboarding/findExistingOnboarding'
import createMutations from 'utils/createMutations'
import createPrivateResolver from 'utils/createPrivateResolver'

const onboardingBack = createPrivateResolver(
  'Mutation:onboarding:finish',
  async ({ user, prisma }) => {

    const existingOnboarding = await findExistingOnboarding(user.id, prisma)

    if (!existingOnboarding) {
      return throwArgumentError()
    }

    const steps = [CREDENTIALS_STEP, ACCOUNTS_STEP, ACCOUNT_STEP, CATEGORIES_STEP]

    const step = steps[steps.indexOf(existingOnboarding.step) - 1] || CREDENTIALS_STEP

    return await prisma.mutation.updateOnboarding({
      where: { id: existingOnboarding.id },
      data: {
        step,
      },
    })
  },
)

export default createMutations(field => ({
  onboardingBack: field.ofType(OnboardingType).resolve(onboardingBack),
}))
