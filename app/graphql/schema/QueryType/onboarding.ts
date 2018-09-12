import syncOnboardingState from 'app/onboarding/sync'
import findExistedOnboarding from 'app/onboarding/findExistedOnboarding'
import createPrivateResolver from 'utils/createPrivateResolver'

export default createPrivateResolver(
  'onboarding',
  async ({ user, prisma }) => {

    const existingOnboarding = await findExistedOnboarding(user.id, prisma)

    if (existingOnboarding) {

      return await syncOnboardingState(existingOnboarding, prisma)
    } else {
      return null
    }
  },
)
