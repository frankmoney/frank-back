import { Json } from 'gql'
import createMutations from 'utils/createMutations'
import getOnboardingByUserId from 'api/dal/Onboarding/getOnboardingByUserId'
import updateOnboardingByPid from 'api/dal/Onboarding/updateOnboardingByPid'
import { throwArgumentError } from 'api/errors/ArgumentError'
import mapOnboarding from 'api/mappers/mapOnboarding'
import { CHECKING_STATUS, CREDENTIALS_STEP } from 'api/onboarding/constants'
import enterCredentials from 'api/onboarding/enterCredentials'
import OnboardingType from 'api/schema/OnboardingType'
import createPrivateResolver from '../utils/createPrivateResolver'

const onboardingEnterCredentials = createPrivateResolver(
  'Mutation:onboarding:enterCredentials',
  async ({ scope, args: { credentials } }) => {
    const existingOnboarding = await getOnboardingByUserId(
      { userId: scope.user.id },
      scope
    )

    if (
      !existingOnboarding ||
      existingOnboarding.step !== CREDENTIALS_STEP ||
      existingOnboarding.credentials.status === CHECKING_STATUS
    ) {
      return throwArgumentError()
    }

    const updatedOnboarding = await updateOnboardingByPid(
      {
        pid: existingOnboarding.pid,
        credentials: {
          ...existingOnboarding.credentials,
          status: CHECKING_STATUS,
        },
      },
      scope
    )

    // background
    await enterCredentials(updatedOnboarding, scope, credentials)

    return mapOnboarding(updatedOnboarding)
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
