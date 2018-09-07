import { Onboarding, Prisma } from 'app/graphql/generated/prisma'
import { MX_TEMP_USER } from 'app/graphql/schema/OnboardingType/index'
import {
  ACCOUNTS_STEP,
  AWAITING_INPUT_STATUS,
  CONNECTED_MXSTATUS,
  CREDENTIALS_STEP,
  SUCCESS_STATUS,
  AtriumClient,
} from './'
import R from 'ramda'
import debug from 'debug'

export default async (onboarding: Onboarding, prisma: Prisma): Promise<Onboarding> => {

  debug('onboarding sync')

  const member = (await AtriumClient.readMember({
    params: {
      userGuid: MX_TEMP_USER,
      memberGuid: onboarding.memberGUID,
    },
  }))['member']

  if (!member) {
    return onboarding
  }

  if (onboarding.step === CREDENTIALS_STEP
    && member.connection_status === CONNECTED_MXSTATUS) {

    debug('step credentials -> accounts')

    let accounts = (await AtriumClient.listAccounts({
      params: {
        userGuid: member.user_guid,
        records_per_page: 1000, //max value
      },
    }))['accounts']

    accounts = R.filter((account: any) => account.member_guid === member.guid, accounts)

    const updatedOnboarding = <Onboarding>await prisma.mutation.updateOnboarding({
      where: { id: onboarding.id },
      data: {
        step: ACCOUNTS_STEP,
        credentials: {
          ...onboarding.credentials,
          status: SUCCESS_STATUS,
        },
        accounts: {
          status: AWAITING_INPUT_STATUS,
          items: accounts,
        },
      },
    })

    return updatedOnboarding
  }

  return onboarding
}
