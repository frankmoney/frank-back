import { throwArgumentError } from 'app/errors/ArgumentError'
import { Mutation, Onboarding } from 'app/graphql/generated/prisma'
import OnboradingType, {
  findExistedOnboarding,
  syncOnboardingState,
  MX_TEMP_USER,
  CREDENTIALS_STEP,
  ACCOUNTS_STEP,
  AWAITING_INPUT_STATUS,
  CHECKING_STATUS,
  SUCCESS_STATUS,
  CONNECTED_MXSTATUS,
} from 'app/graphql/schema/OnboardingType'
import { Bool, Json } from 'gql'
import createPrivateResolver from 'utils/createPrivateResolver'
import Atrium from 'mx-atrium'
import R from 'ramda'

const AtriumClient = new Atrium.Client(process.env.MX_API_KEY, process.env.MX_CLIENT_ID, Atrium.environments.development)

const enterCredentials = createPrivateResolver(
  'Mutation:onboarding:enterCredentials',
  async ({
           user,
           args: { credentials },
           prisma,
         }) => {

    const existedOnboarding = await findExistedOnboarding(user.id, prisma)

    if (!existedOnboarding) {
      throwArgumentError()
    }

    let updatedOnboarding = <Onboarding>existedOnboarding

    updatedOnboarding = await prisma.mutation.updateOnboarding<Onboarding>({
      where: { id: updatedOnboarding.id },
      data: {
        step: CREDENTIALS_STEP,
        credentials: {
          ...updatedOnboarding.credentials,
          status: CHECKING_STATUS,
        },
      },
    });

    // do async stuff, find and sync member or create new member
    (function() {

      const institutionCode = updatedOnboarding.institution.code

      AtriumClient.listMembers({
        params: {
          userGuid: MX_TEMP_USER,
          records_per_page: 1000, //max value
        },
      }).then(({ members }: any) => {

        const existMember = R.find(R.propEq('institution_code', institutionCode))(members)

        if (existMember) {

          syncOnboardingState(updatedOnboarding, prisma)

        } else {

          AtriumClient.createMember({
            params: { userGuid: MX_TEMP_USER },
            body: {
              'member': {
                'institution_code': institutionCode,
                credentials,
              },
            },
          }).then(({ member }: any) => {

            prisma.mutation.updateOnboarding({
              where: { id: updatedOnboarding.id },
              data: {
                memberGUID: member.guid,
              },
            })
          })
        }
      })
    })()

    return updatedOnboarding
  },
)

export default (field: any) => field
  .ofType(OnboradingType)
  .args((arg: any) => ({
    credentials: arg.listOf(Json),
  }))
  .resolve(enterCredentials)
