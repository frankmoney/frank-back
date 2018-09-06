import { ID, String, Json, Int } from 'gql'
import humps from 'humps'
import createPrivateResolver from 'utils/createPrivateResolver'
import Atrium from 'mx-atrium'

const AtriumClient = new Atrium.Client(process.env.MX_API_KEY, process.env.MX_CLIENT_ID, Atrium.environments.development)

export default createPrivateResolver(
  'Mutation:onboarding:institutions',
  async ({ args: { name } }) => {

    const institutions = (await AtriumClient.listInstitutions({
      params: {
        name,
      },
    }))['institutions']

    return humps.camelizeKeys(institutions)
  },
)
