import { Onboarding, OnboardingUpdateInput } from 'app/graphql/generated/prisma'
import AtriumClient from 'app/onboarding/atriumClient'
import { ACCOUNTS_STEP, SUCCESS_STATUS } from 'app/onboarding/constants'
import { StatusHandler } from 'app/onboarding/syncMemberStatus/StatusHandler'
import humps from 'humps'
import createLogger from 'utils/createLogger'

const log = createLogger('app:onboarding:syncMemberStatus:connectedHandler')

const handler: StatusHandler = async ({
  onboarding,
  userGuid,
  memberGuid,
  prisma,
}) => {
  log.debug('start')

  if (
    !onboarding.accounts ||
    onboarding.step !== ACCOUNTS_STEP ||
    onboarding.credentials.status !== SUCCESS_STATUS ||
    (onboarding.mfa && onboarding.mfa.status !== SUCCESS_STATUS)
  ) {
    log.debug('updating data')

    const { accounts } = await AtriumClient.listMemberAccounts({
      params: {
        userGuid,
        memberGuid,
      },
    })

    const data: OnboardingUpdateInput = {
      step: ACCOUNTS_STEP,
      credentials: {
        ...onboarding.credentials,
        status: SUCCESS_STATUS,
      },
      accounts: humps.camelizeKeys(accounts),
    }

    if (onboarding.mfa) {
      data.mfa = {
        ...onboarding.mfa,
        status: SUCCESS_STATUS,
      }
    }

    onboarding = await prisma.mutation.updateOnboarding<Onboarding>({
      where: { id: onboarding.id },
      data,
    })
  }

  return onboarding
}

export default handler
