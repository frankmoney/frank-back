import { OnboardingWhereInput } from 'app/graphql/generated/prisma'
import createPrivateResolver from 'utils/createPrivateResolver'
import { findExistedOnboarding, syncOnboardingState } from 'app/graphql/schema/OnboardingType'

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
