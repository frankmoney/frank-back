import { ID, String, Json, Int } from 'gql'
import createPrivateResolver from 'utils/createPrivateResolver'
import Atrium from 'mx-atrium'
import humps from 'humps'


const AtriumClient = new Atrium.Client(process.env.MX_API_KEY, process.env.MX_CLIENT_ID, Atrium.environments.development)

const onboardingInstitutionCredentials = createPrivateResolver(
  'Mutation:onboarding:institution:credentials',
  async ({ assert, args: { institutionCode } }) => {

    const credentials = (await AtriumClient.listCredentials({
      params: {
        institutionCode,
      },
    }))['credentials']

    return humps.camelizeKeys(credentials)
  },
)

export default (field: any) => field
  .listOf(Json)
  .args((arg: any) => ({
    institutionCode: arg.ofType(String),
  }))
  .resolve(onboardingInstitutionCredentials)
