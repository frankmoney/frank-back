import { throwArgumentError } from 'app/errors/ArgumentError'
import { Mutation, Onboarding } from 'app/graphql/generated/prisma'
import OnboradingType, {
  findExistedOnboarding,
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

const updateStateByMember = (member: any, onboarding: Onboarding, mutation: Mutation) => {

  if (member.connection_status == CONNECTED_MXSTATUS
    && onboarding.credentials.status != SUCCESS_STATUS) {

    AtriumClient.listAccounts({
      params: {
        userGuid: member.user_guid,
        records_per_page: 1000, //max value
      },
    }).then(({ accounts }: any) => {

      accounts = R.filter((account: any) => account.member_guid == member.guid, accounts)

      const accountStatus = R.isNil(onboarding.accounts) ? AWAITING_INPUT_STATUS : onboarding.accounts.status
      const step = onboarding.step == CREDENTIALS_STEP ? ACCOUNTS_STEP : onboarding.step

      mutation.updateOnboarding({
        where: { id: onboarding.id },
        data: {
          step,
          credentials: {
            ...onboarding.credentials,
            status: SUCCESS_STATUS,
          },
          accounts: {
            status: accountStatus,
            items: accounts,
          },
        },
      })

    })
  }
}

const enterCredentials = createPrivateResolver(
  'Mutation:onboarding:enterCredentials',
  async ({
           user,
           args: { credentials },
           prisma: { query, mutation },
         }) => {

    let existedOnboarding = await findExistedOnboarding(user.id, query)

    if (!existedOnboarding) {
      throwArgumentError()
    }

    existedOnboarding = await mutation.updateOnboarding({
      where: { id: existedOnboarding.id },
      data: {
        credentials: {
          ...existedOnboarding.credentials,
          status: CHECKING_STATUS,
        },
      },
    })

    const institutionCode = existedOnboarding.institution.code

    AtriumClient.listMembers({
      params: {
        userGuid: MX_TEMP_USER,
        records_per_page: 1000, //max value
      },
    }).then(({ members }: any) => {

      const existMember = R.find(R.propEq('institution_code', institutionCode))(members)

      if (existMember) {

        updateStateByMember(existMember, existedOnboarding, mutation)

      } else {

        AtriumClient.createMember({
          params: { userGuid: MX_TEMP_USER },
          body: {
            'member': {
              'institution_code': existedOnboarding.institution.code,
              credentials,
            },
          },
        }).then(({ member }: any) => {

          updateStateByMember(member, existedOnboarding, mutation)
        })
      }
    })

    return existedOnboarding
  },
)

export default (field: any) => field
  .ofType(OnboradingType)
  .args((arg: any) => ({
    credentials: arg.listOf(Json),
  }))
  .resolve(enterCredentials)
