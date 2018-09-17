import { CANCELED_STEP } from 'app/onboarding/constants'
import findExistingOnboarding from 'app/onboarding/findExistingOnboarding'
import createMutations from 'utils/createMutations'
import createPrivateResolver from 'utils/createPrivateResolver'

const onboardingCancel = createPrivateResolver(
  'Mutation:onboarding:cancel',
  async ({ user, args: { institutionCode }, prisma }) => {

    const existingOnboarding = await findExistingOnboarding(user.id, prisma)

    if (existingOnboarding) {

      await prisma.mutation.updateOnboarding({
        where: { id: existingOnboarding.id },
        data: {
          step: CANCELED_STEP,
        },
      })
    }

    return true
  },
)

export default createMutations(field => ({
  onboardingCancel: field.ofBool().resolve(onboardingCancel),
}))
