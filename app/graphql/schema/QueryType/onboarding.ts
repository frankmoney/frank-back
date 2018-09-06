import { OnboardingWhereInput } from 'app/graphql/generated/prisma'
import createPrivateResolver from 'utils/createPrivateResolver'

const COMPLETED_STEP = 'completed'

export default createPrivateResolver(
  'onboarding',
  async ({ user, prisma: { query } }) => {

    const existedOnboarding = (await query.onboardings({
      where: {
        AND: [
          { step_not: COMPLETED_STEP },
          { user: { id: user.id } },
        ],
      },
    }))[0]

    return existedOnboarding
  },
)
