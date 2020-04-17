import humps from 'humps'
import hcb from './../../hcb'
import createMutations from 'utils/createMutations'
import createOnboarding from 'api/dal/Onboarding/createOnboarding'
import getOnboardingByUserId from 'api/dal/Onboarding/getOnboardingByUserId'
import { throwArgumentError } from 'api/errors/ArgumentError'
import {
  CREDENTIALS_STEP,
  AWAITING_INPUT_STATUS,
} from 'api/onboarding/constants'
import mapOnboarding from 'api/mappers/mapOnboarding'
import OnboardingType from 'api/schema/OnboardingType'
import createPrivateResolver from '../utils/createPrivateResolver'

const onboardingSelectInstitution = createPrivateResolver(
  'Mutation:onboarding:selectInstitution',
  async ({ scope, args: { institutionCode } }) => {
    const existingOnboarding = await getOnboardingByUserId(
      { userId: scope.user.id },
      scope
    )

    if (existingOnboarding) {
      return throwArgumentError()
    }

    let institution = null
    let credentials = null

    if (hcb.isHcbCode(institutionCode)) {

      credentials = hcb.credentials
      institution = hcb.institution

    } else {

      credentials = (await scope.mx.listCredentials({ institutionCode })).credentials

      if (!credentials) {
        throw new Error("mx.listCredentials didn't return credentials")
      }

      institution = (await scope.mx.readInstitution({ institutionCode })).institution

      if (!institution) {
        throw new Error("mx.readInstitution didn't return institution")
      }

    }

    return mapOnboarding(
      await createOnboarding(
        {
          step: CREDENTIALS_STEP,
          institution: humps.camelizeKeys(institution),
          credentials: {
            status: AWAITING_INPUT_STATUS,
            fields: humps.camelizeKeys(credentials),
          },
          userId: scope.user.id,
        },
        scope
      )
    )
  }
)

export default createMutations(field => ({
  onboardingSelectInstitution: field
    .ofType(OnboardingType)
    .args(arg => ({
      institutionCode: arg.ofString(),
    }))
    .resolve(onboardingSelectInstitution),
}))
