import Atrium from 'mx-atrium'
import { Json } from 'gql'
import createMutations from 'utils/createMutations'
import createPrivateResolver from 'utils/createPrivateResolver'

const AtriumClient = new Atrium.Client(
  process.env.MX_API_KEY,
  process.env.MX_CLIENT_ID,
  Atrium.environments.development
)
// const MX_TEMP_USER = 'USR-5a980496-bcec-5a05-436e-fb81ab7c8677'

const onboardingEnterCredentials = createPrivateResolver(
  'Mutation:onboardingEnterCredentials',
  async ({ user, args: { institutionCode }, prisma: { mutation } }) => {
    await new Promise(resolve => setTimeout(resolve, 1000))

    return true
  }
)

export default createMutations(field => ({
  onboardingEnterCredentials: field
    .ofBool()
    .args(arg => ({
      credentials: arg.listOf(Json),
    }))
    .resolve(onboardingEnterCredentials),
}))
