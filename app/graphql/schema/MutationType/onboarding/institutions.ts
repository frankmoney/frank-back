import { ID, String, Json, Int } from 'gql'
import createPrivateResolver from 'utils/createPrivateResolver'
import Atrium from 'mx-atrium'

// const FIRST_DEFAULT = 25

const AtriumClient = new Atrium.Client('bccef1d16cd9133ff7b70d3d59ca4bba94df10ef', 'bd834157-dd34-47b2-b8f4-afcbf8940566', Atrium.environments.development)

const onboardingInstitutions = createPrivateResolver(
  'Mutation:onboarding:institutions',
  async ({ assert, args: { name, first, skip }, prisma: { query, mutation } }) => {

    // const records_per_page = first || FIRST_DEFAULT
    // const page = Math.floor((skip || 0) / records_per_page) + 1

    const institutions = (await AtriumClient.listInstitutions({
      params: {
        name,
      },
    }))['institutions']

    return institutions
  },
)

export default (field: any) => field
  .listOf(Json)
  .args((arg: any) => ({
    name: arg.ofType(String).nullable(),
  }))
  .resolve(onboardingInstitutions)
