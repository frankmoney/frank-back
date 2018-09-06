import { Bool } from 'gql'
import createPrivateResolver from 'utils/createPrivateResolver'
import Atrium from 'mx-atrium'

const AtriumClient = new Atrium.Client(process.env.MX_API_KEY, process.env.MX_CLIENT_ID, Atrium.environments.development)
// const MX_TEMP_USER = 'USR-5a980496-bcec-5a05-436e-fb81ab7c8677'

const COMPLETED_STEP = 'completed'

const onboardingCancel = createPrivateResolver(
  'Mutation:onboarding:cancel',
  async ({
           user,
           args: { institutionCode },
           prisma: { mutation },
         }) => {

    await mutation.deleteManyOnboardings({
      where: {
        AND: [
          { step_not: COMPLETED_STEP },
          { user: { id: user.id } },
        ],
      },
    })

    return true
  },
)

export default (field: any) => field
  .ofType(Bool)
  .resolve(onboardingCancel)
