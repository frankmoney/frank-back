import humps from 'humps'
import Atrium from 'mx-atrium'
import createMutations from 'utils/createMutations'
import createPrivateResolver from 'utils/createPrivateResolver'
import { throwArgumentError } from 'app/errors/ArgumentError'
import OnboardingType from 'app/graphql/schema/OnboardingType'

const AtriumClient = new Atrium.Client(
  process.env.MX_API_KEY,
  process.env.MX_CLIENT_ID,
  Atrium.environments.development
)
// const MX_TEMP_USER = 'USR-5a980496-bcec-5a05-436e-fb81ab7c8677'

const CREDENTIALS_STEP = 'credentials'
const COMPLETED_STEP = 'completed'
const AWAITING_INPUT_STATUS = 'awaiting_input'

const onboardingSelectInstitution = createPrivateResolver(
  'Mutation:onboardingSelectInstitution',
  async ({ user, args: { institutionCode }, prisma: { query, mutation } }) => {
    const { credentials } = await AtriumClient.listCredentials({
      params: {
        institutionCode,
      },
    })

    const { institution } = await AtriumClient.readInstitution({
      params: { institutionCode },
    })

    const existedOnboarding = (await query.onboardings({
      where: {
        AND: [{ step_not: COMPLETED_STEP }, { user: { id: user.id } }],
      },
    }))[0]

    if (existedOnboarding) {
      throwArgumentError()
    }

    const onboarding = await mutation.createOnboarding({
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