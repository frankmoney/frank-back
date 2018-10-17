import { throwArgumentError } from 'app/errors/ArgumentError'
import { Onboarding } from 'app/graphql/generated/prisma'
import OnboardingType from 'app/graphql/schema/OnboardingType'
import { CHECKING_STATUS, CREDENTIALS_STEP } from 'app/onboarding/constants'
import findExistingOnboarding from 'app/onboarding/findExistingOnboarding'
import enterCredentials from 'app/onboarding/enterCredentials'
import { Json } from 'gql/index'
import createMutations from 'utils/createMutations'
import createPrivateResolver from 'utils/createPrivateResolver'

const onboardingEnterCredentials = createPrivateResolver(
  'Mutation:onboarding:enterCredentials',
  async ({ user, args: { credentials }, prisma }) => {
    const existingOnboarding = await findExistingOnboarding(user.id, prisma)

    if (
      !existingOnboarding ||
      existingOnboarding.step !== CREDENTIALS_STEP ||
      existingOnboarding.credentials.status === CHECKING_STATUS
    ) {
      return throwArgumentError()
    }

    const updatedOnboarding = await prisma.mutation.updateOnboarding<
      Onboarding
    >({
      where: { id: existingOnboarding.id },
      data: {
        step: CREDENTIALS_STEP,
        credentials: {
          ...existingOnboarding.credentials,
          status: CHECKING_STATUS,
        },
      },
    })

    // background
    enterCredentials(updatedOnboarding, prisma, credentials)

    return updatedOnboarding
  }
)

export default createMutations(field => ({
  onboardingEnterCredentials: field
    .ofType(OnboardingType)
    .args(arg => ({
      credentials: arg.listOf(Json),
    }))
    .resolve(onboardingEnterCredentials),
}))
