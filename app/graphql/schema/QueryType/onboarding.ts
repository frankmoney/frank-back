import syncOnboardingState from 'app/onboarding/sync'
import findExistingOnboarding from 'app/onboarding/findExistingOnboarding'
import createPrivateResolver from 'utils/createPrivateResolver'

export default createPrivateResolver(
  'onboarding',
  async ({ user, prisma }) => {

    const existingOnboarding = await findExistingOnboarding(user.id, prisma)

    if (existingOnboarding) {

      return await syncOnboardingState(existingOnboarding, prisma)
    } else {
      return null
    }
  },
)
