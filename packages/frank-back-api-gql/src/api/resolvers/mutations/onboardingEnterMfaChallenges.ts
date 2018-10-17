import { throwArgumentError } from 'app/errors/ArgumentError'
import { Onboarding } from 'app/graphql/generated/prisma'
import OnboardingType from 'app/graphql/schema/OnboardingType'
import { CHECKING_STATUS, MFA_STEP } from 'app/onboarding/constants'
import findExistingOnboarding from 'app/onboarding/findExistingOnboarding'
import enterMfaChallenges from 'app/onboarding/enterMfaChallenges'
import { Json } from 'gql/index'
import createMutations from 'utils/createMutations'
import createPrivateResolver from 'utils/createPrivateResolver'

const onboardingEnterMfaChallenges = createPrivateResolver(
  'Mutation:onboarding:enterMfaChallenges',
  async ({ user, args: { challenges }, prisma }) => {
    const existingOnboarding = await findExistingOnboarding(user.id, prisma)

    if (
      !existingOnboarding ||
      existingOnboarding.step !== MFA_STEP ||
      existingOnboarding.mfa.status === CHECKING_STATUS
    ) {
      return throwArgumentError()
    }

    const updatedOnboarding = await prisma.mutation.updateOnboarding<
      Onboarding
    >({
      where: { id: existingOnboarding.id },
      data: {
        mfa: {
          ...existingOnboarding.mfa,
          status: CHECKING_STATUS,
        },
      },
    })

    // background
    enterMfaChallenges(updatedOnboarding, prisma, challenges)

    return updatedOnboarding
  }
)

export default createMutations(field => ({
  onboardingEnterMfaChallenges: field
    .ofType(OnboardingType)
    .args(arg => ({
      challenges: arg.listOf(Json),
    }))
    .resolve(onboardingEnterMfaChallenges),
}))
