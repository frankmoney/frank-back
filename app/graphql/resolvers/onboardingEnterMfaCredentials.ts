import { throwArgumentError } from 'app/errors/ArgumentError'
import { Onboarding } from 'app/graphql/generated/prisma'
import OnboardingType from 'app/graphql/schema/OnboardingType'
import { CHECKING_STATUS, MFA_STEP } from 'app/onboarding/constants'
import findExistingOnboarding from 'app/onboarding/findExistingOnboarding'
import enterMfaCredentials from 'app/onboarding/enterMfaCredentials'
import { Json } from 'gql'
import createMutations from 'utils/createMutations'
import createPrivateResolver from 'utils/createPrivateResolver'

const onboardingEnterMfaCredentials = createPrivateResolver(
  'Mutation:onboarding:enterMfaCredentials',
  async ({ user, args: { credentials }, prisma }) => {
    const existingOnboarding = await findExistingOnboarding(user.id, prisma)

    if (
      !existingOnboarding
      || existingOnboarding.step !== MFA_STEP
      || existingOnboarding.mfa.status === CHECKING_STATUS
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
    enterMfaCredentials(updatedOnboarding, prisma, credentials)

    return updatedOnboarding
  }
)

export default createMutations(field => ({
  onboardingEnterMfaCredentials: field
    .ofType(OnboardingType)
    .args(arg => ({
      credentials: arg.listOf(Json),
    }))
    .resolve(onboardingEnterMfaCredentials),
}))
