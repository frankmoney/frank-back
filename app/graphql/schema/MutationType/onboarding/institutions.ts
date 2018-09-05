import { ID, String, Json, Int } from 'gql'
import humps from 'humps'
import createPrivateResolver from 'utils/createPrivateResolver'
import Atrium from 'mx-atrium'

// const FIRST_DEFAULT = 25

const AtriumClient = new Atrium.Client(process.env.MX_API_KEY, process.env.MX_CLIENT_ID, Atrium.environments.development)

const onboardingInstitutions = createPrivateResolver(
  'Mutation:onboarding:institutions',
  async ({ assert, args: { name, first, skip } }) => {

    // const records_per_page = first || FIRST_DEFAULT
    // const page = Math.floor((skip || 0) / records_per_page) + 1

    const institutions = (await AtriumClient.listInstitutions({
      params: {
        name,
      },
    }))['institutions']

    return humps.camelizeKeys(institutions)
  },
)

export default (field: any) => field
  .listOf(Json)
  .args((arg: any) => ({
    name: arg.ofType(String).nullable(),
  }))
  .resolve(onboardingInstitutions)
