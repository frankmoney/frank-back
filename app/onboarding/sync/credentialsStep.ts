import { Onboarding, Prisma } from 'app/graphql/generated/prisma'
import AtriumClient from 'app/onboarding/atriumClient'
import {
  ACCOUNTS_STEP,
  CONNECTED_MXSTATUS,
  CREDENTIALS_STEP,
  SUCCESS_STATUS,
} from 'app/onboarding/constants'
import R from 'ramda'

export default async (
  onboarding: Onboarding,
  member: any,
  prisma: Prisma
): Promise<Onboarding> => {
  if (
    onboarding.step === CREDENTIALS_STEP &&
    member.connection_status === CONNECTED_MXSTATUS
  ) {
    let { accounts } = await AtriumClient.listAccounts({
      params: {
        userGuid: member.user_guid,
        records_per_page: 1000, // max value
      },
    })

    accounts = R.filter(
      (account: any) => account.member_guid === member.guid,
      accounts
    )

    const updatedOnboarding = await prisma.mutation.updateOnboarding<
      Onboarding
    >({
      where: { id: onboarding.id },
      data: {
        step: ACCOUNTS_STEP,
        credentials: {
          ...onboarding.credentials,
          status: SUCCESS_STATUS,
        },
        accounts,
      },
    })

    return updatedOnboarding
  }

  return onboarding
}
