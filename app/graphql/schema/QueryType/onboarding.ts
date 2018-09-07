import { OnboardingWhereInput } from 'app/graphql/generated/prisma'
import createPrivateResolver from 'utils/createPrivateResolver'
import { findExistedOnboarding } from 'app/graphql/schema/OnboardingType'

export default createPrivateResolver(
  'onboarding',
  async ({ user, prisma: { query } }) => {

    const existedOnboarding = await findExistedOnboarding(user.id, query)

    return existedOnboarding
  },
)
