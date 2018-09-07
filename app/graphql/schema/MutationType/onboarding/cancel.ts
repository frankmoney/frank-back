import { Bool } from 'gql'
import createPrivateResolver from 'utils/createPrivateResolver'
import Atrium from 'mx-atrium'
import { COMPLETED_STEP } from 'app/graphql/schema/OnboardingType'

const AtriumClient = new Atrium.Client(process.env.MX_API_KEY, process.env.MX_CLIENT_ID, Atrium.environments.development)

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
