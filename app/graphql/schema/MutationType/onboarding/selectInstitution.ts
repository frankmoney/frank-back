import { ID, String, Bool } from 'gql'
import createPrivateResolver from 'utils/createPrivateResolver'
import Atrium from 'mx-atrium'
import humps from 'humps'
import OnboardingType, {
  CREDENTIALS_STEP,
  AWAITING_INPUT_STATUS,
  findExistedOnboarding,
} from 'app/graphql/schema/OnboardingType'
import { throwArgumentError } from 'app/errors/ArgumentError'

const AtriumClient = new Atrium.Client(process.env.MX_API_KEY, process.env.MX_CLIENT_ID, Atrium.environments.development)

const selectInstitution = createPrivateResolver(
  'Mutation:onboarding:selectInstitution',
  async ({
           user,
           args: { institutionCode },
           prisma: { query, mutation },
         }) => {

    const credentials = (await AtriumClient.listCredentials({
      params: {
        institutionCode,
      },
    }))['credentials']

    const institution = (await AtriumClient.readInstitution({ params: { institutionCode } }))['institution']

    const existedOnboarding = await findExistedOnboarding(user.id, query)

    if (existedOnboarding) {
      throwArgumentError()
    }

    const onboarding = (await mutation.createOnboarding({
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
