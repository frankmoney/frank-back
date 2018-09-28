import { throwArgumentError } from 'app/errors/ArgumentError'
import { Onboarding } from 'app/graphql/generated/prisma'
import OnboardingType from 'app/graphql/schema/OnboardingType'
import { ACCOUNT_STEP, CATEGORIES_STEP } from 'app/onboarding/constants'
import findExistingOnboarding from 'app/onboarding/findExistingOnboarding'
import createMutations from 'utils/createMutations'
import createPrivateResolver from 'utils/createPrivateResolver'

const onboardingCompleteAccountInfo = createPrivateResolver(
  'Mutation:onboarding:completeAccountInfo',
  async ({ user, args: { accountGuid }, prisma }) => {
    const existingOnboarding = await findExistingOnboarding(user.id, prisma)

    if (!existingOnboarding || existingOnboarding.step !== ACCOUNT_STEP) {
      return throwArgumentError()
    }

    const updatedOnboarding = await prisma.mutation.updateOnboarding<
      Onboarding
    >({
      where: { id: existingOnboarding.id },
      data: {
        step: CATEGORIES_STEP,
      },
    })

    return updatedOnboarding
  }
)

export default createMutations(field => ({
  onboardingCompleteAccountInfo: field
    .ofType(OnboardingType)
    .resolve(onboardingCompleteAccountInfo),
}))
