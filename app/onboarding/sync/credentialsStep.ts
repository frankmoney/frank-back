import { MxMember, Onboarding, Prisma } from 'app/graphql/generated/prisma'
import AtriumClient from 'app/onboarding/atriumClient'
import {
  ACCOUNTS_STEP,
  CONNECTED_MXSTATUS,
  CREDENTIALS_STEP,
  SUCCESS_STATUS,
} from 'app/onboarding/constants'
import humps from 'humps'

export default async (
  onboarding: Onboarding,
  mxMember: MxMember,
  prisma: Prisma,
): Promise<Onboarding> => {

  const mxUserGuid = mxMember.user.mxGuid

  const { member } = await AtriumClient.readMember({
    params: {
      userGuid: mxUserGuid,
      memberGuid: mxMember.mxGuid,
    },
  })

  if (
    onboarding.step === CREDENTIALS_STEP &&
    member.connection_status === CONNECTED_MXSTATUS
  ) {

    const { accounts } = await AtriumClient.listMemberAccounts({
      params: {
        userGuid: mxUserGuid,
        memberGuid: mxMember.mxGuid,
      },
    })

    const updatedOnboarding = await prisma.mutation.updateOnboarding<Onboarding>({
      where: { id: onboarding.id },
      data: {
        step: ACCOUNTS_STEP,
        credentials: {
          ...onboarding.credentials,
          status: SUCCESS_STATUS,
        },
        accounts: humps.camelizeKeys(accounts),
      },
    })

    return updatedOnboarding
  }

  return onboarding
}
