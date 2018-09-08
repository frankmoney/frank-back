import { Bool, Json } from 'gql'
import createPrivateResolver from 'utils/createPrivateResolver'
import Atrium from 'mx-atrium'

const AtriumClient = new Atrium.Client(
  process.env.MX_API_KEY,
  process.env.MX_CLIENT_ID,
  Atrium.environments.development
)
// const MX_TEMP_USER = 'USR-5a980496-bcec-5a05-436e-fb81ab7c8677'

const enterCredentials = createPrivateResolver(
  'Mutation:onboarding:enterCredentials',
  async ({ user, args: { institutionCode }, prisma: { mutation } }) => {
    await new Promise(resolve => setTimeout(resolve, 1000))

    return true
  }
)

export default (field: any) =>
  field
    .ofType(Bool)
    .args((arg: any) => ({
      credentials: arg.listOf(Json),
    }))
    .resolve(enterCredentials)
