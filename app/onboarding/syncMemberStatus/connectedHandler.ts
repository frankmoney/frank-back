import { Onboarding } from 'app/graphql/generated/prisma'
import AtriumClient from 'app/onboarding/atriumClient'
import {
  ACCOUNTS_STEP,
  SUCCESS_STATUS,
} from 'app/onboarding/constants'
import { HandlerInterface } from 'app/onboarding/syncMemberStatus/HandlerInterface'
import humps from 'humps'

export default async (args: HandlerInterface): Promise<Onboarding> => {

  console.log('connectedHandler')

  const { onboarding, userGuid, memberGuid, prisma } = args

  if (
    !onboarding.accounts
    || onboarding.step !== ACCOUNTS_STEP
    || onboarding.credentials.status !== SUCCESS_STATUS
  ) {

    console.log('update onboarding for accounts step')

    const { accounts } = await AtriumClient.listMemberAccounts({
      params: {
        userGuid,
        memberGuid,
      },
    })

    return await prisma.mutation.updateOnboarding<Onboarding>({
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

  } else {

    return onboarding
  }
}
