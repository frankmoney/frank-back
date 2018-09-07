import { ID, String, Bool } from 'gql'
import createPrivateResolver from 'utils/createPrivateResolver'
import humps from 'humps'
import OnboardingType, {
  CREDENTIALS_STEP,
  AWAITING_INPUT_STATUS,
  findExistedOnboarding,
  AtriumClient,
} from 'app/graphql/schema/OnboardingType'
import { throwArgumentError } from 'app/errors/ArgumentError'

const selectInstitution = createPrivateResolver(
  'Mutation:onboarding:selectInstitution',
  async ({
           user,
           args: { institutionCode },
           prisma,
         }) => {

    const credentials = (await AtriumClient.listCredentials({
      params: {
        institutionCode,
      },
    }))['credentials']

    const institution = (await AtriumClient.readInstitution({ params: { institutionCode } }))['institution']

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

export default (field: any) => field
  .ofType(OnboardingType)
  .args((arg: any) => ({
    institutionCode: arg.ofType(String),
  }))
  .resolve(selectInstitution)
