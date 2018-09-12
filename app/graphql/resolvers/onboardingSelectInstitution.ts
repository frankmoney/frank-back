import OnboardingType from 'app/graphql/schema/OnboardingType/OnboardingType'
import AtriumClient from 'app/onboarding/atriumClient'
import findExistedOnboarding from 'app/onboarding/findExistedOnboarding'
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
  async ({
           user,
           args: { institutionCode },
           prisma,
         }) => {

    const { credentials } = await AtriumClient.listCredentials({
      params: {
        institutionCode,
      },
    })

    const { institution } = await AtriumClient.readInstitution({ params: { institutionCode } })

    const existedOnboarding = await findExistedOnboarding(user.id, prisma)

    if (existedOnboarding) {
      throwArgumentError()
    }

    const onboarding = (await prisma.mutation.createOnboarding({
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
    }))

    return onboarding
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
