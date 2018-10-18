import { throwArgumentError } from 'api/errors/ArgumentError'
import OnboardingType from 'api/schema/OnboardingType'
import AtriumClient from 'api/onboarding/atriumClient'
import createMutations from 'utils/createMutations'
import createPrivateResolver from 'api/resolvers/utils/createPrivateResolver'
import humps from 'humps'
import {
  CREDENTIALS_STEP,
  AWAITING_INPUT_STATUS,
} from 'api/onboarding/constants'
import createOnboarding from 'api/dal/Onboarding/createOnboarding'
import getOnboardingByUserId from 'api/dal/Onboarding/getOnboardingByUserId'
import mapOnboarding from 'api/mappers/mapOnboarding'

const onboardingSelectInstitution = createPrivateResolver(
  'Mutation:onboarding:selectInstitution',
  async ({ scope, args: { institutionCode } }) => {

    const existingOnboarding = await getOnboardingByUserId({ userId: scope.user.id }, scope)

    if (existingOnboarding) {
      return throwArgumentError()
    }

    const { credentials } = await AtriumClient.listCredentials({
      params: {
        institutionCode,
      },
    })

    const { institution } = await AtriumClient.readInstitution({
      params: { institutionCode },
    })


    return mapOnboarding(await createOnboarding({
      step: CREDENTIALS_STEP,
      institution: humps.camelizeKeys(institution),
      credentials: {
        status: AWAITING_INPUT_STATUS,
        fields: humps.camelizeKeys(credentials),
      },
      userId: scope.user.id
    }, scope))
  },
)

export default createMutations(field => ({
  onboardingSelectInstitution: field
    .ofType(OnboardingType)
    .args(arg => ({
      institutionCode: arg.ofString(),
    }))
    .resolve(onboardingSelectInstitution),
}))
