import syncOnboardingState from 'app/onboarding/sync'
import findExistedOnboarding from 'app/onboarding/findExistedOnboarding'
import createPrivateResolver from 'utils/createPrivateResolver'

export default createPrivateResolver(
  'onboarding',
  async ({ user, prisma }) => {

    const existedOnboarding = await findExistedOnboarding(user.id, prisma)

    if (existedOnboarding) {

      return await syncOnboardingState(existedOnboarding, prisma)
    } else {
      return null
    }
  },
)
