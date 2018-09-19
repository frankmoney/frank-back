import { Onboarding } from 'app/graphql/generated/prisma'
import AtriumClient from 'app/onboarding/atriumClient'
import {
  ACCOUNTS_STEP,
  SUCCESS_STATUS,
} from 'app/onboarding/constants'
import { StatusHandler } from 'app/onboarding/syncMemberStatus/StatusHandler'
import humps from 'humps'

const handler: StatusHandler = async ({
                                        onboarding,
                                        userGuid,
                                        memberGuid,
                                        prisma,
                                      }) => {

  console.log('connectedHandler')

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

    onboarding = await prisma.mutation.updateOnboarding<Onboarding>({
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

  }

  return onboarding
}

export default handler
