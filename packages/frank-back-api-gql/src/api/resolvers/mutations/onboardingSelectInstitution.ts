import OnboardingType from 'app/graphql/schema/OnboardingType/OnboardingType'
import AtriumClient from 'app/onboarding/atriumClient'
import findExistingOnboarding from 'app/onboarding/findExistingOnboarding'
import createMutations from 'utils/createMutations'
import createPrivateResolver from 'utils/createPrivateResolver'
import humps from 'humps'
import {
  CREDENTIALS_STEP,
  AWAITING_INPUT_STATUS,
} from 'app/onboarding/constants'
import { throwArgumentError } from 'app/errors/ArgumentError'

const onboardingSelectInstitution = createPrivateResolver(
  'Mutation:onboarding:selectInstitution',
  async ({ user, args: { institutionCode }, prisma }) => {
    const existingOnboarding = await findExistingOnboarding(user.id, prisma)

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

    const onboarding = await prisma.mutation.createOnboarding({
      data: {
        step: CREDENTIALS_STEP,
        institution: humps.camelizeKeys(institution),
        credentials: {
          status: AWAITING_INPUT_STATUS,
          fields: humps.camelizeKeys(credentials),
        },
        user: {
          connect: { id: user.id },
        },
      },
    })

    return onboarding
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
