import { Bool } from 'gql'
import createPrivateResolver from 'utils/createPrivateResolver'
import { AtriumClient, findExistedOnboarding, MX_TEMP_USER } from 'app/graphql/schema/OnboardingType'

const onboardingCancel = createPrivateResolver(
  'Mutation:onboarding:cancel',
  async ({
           user,
           args: { institutionCode },
           prisma,
         }) => {

    const existedOnboarding = await findExistedOnboarding(user.id, prisma)

    if (existedOnboarding) {

      if (existedOnboarding.memberGUID) {

        await AtriumClient.deleteMember({
          params: {
            userGuid: MX_TEMP_USER,
            memberGuid: existedOnboarding.memberGUID,
          },
        })
      }

      await prisma.mutation.deleteOnboarding({ where: { id: existedOnboarding.id } })
    }

    return true
  },
)

export default (field: any) => field
  .ofType(Bool)
  .resolve(onboardingCancel)
