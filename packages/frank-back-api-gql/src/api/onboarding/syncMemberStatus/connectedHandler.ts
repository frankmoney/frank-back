import humps from 'humps'
import updateOnboardingByPid from 'api/dal/Onboarding/updateOnboardingByPid'
import { ACCOUNTS_STEP, SUCCESS_STATUS } from '../constants'
import { StatusHandler } from './StatusHandler'

const handler: StatusHandler = async ({
  onboarding,
  userGuid,
  memberGuid,
  scope,
}) => {
  const log = scope.logFor('api:onboarding:syncMemberStatus:connectedHandler')

  log.debug('start')

  if (
    !onboarding.accounts ||
    onboarding.step !== ACCOUNTS_STEP ||
    onboarding.credentials.status !== SUCCESS_STATUS ||
    (onboarding.mfa && onboarding.mfa.status !== SUCCESS_STATUS)
  ) {
    log.debug('updating data')

    const { accounts } = await scope.mx.listMemberAccounts({
      userGuid,
      memberGuid,
    })

    const data = {
      pid: onboarding.pid,
      step: ACCOUNTS_STEP,
      credentials: {
        ...onboarding.credentials,
        status: SUCCESS_STATUS,
      },
      accounts: humps.camelizeKeys(accounts),
      mfa: undefined,
    }

    if (onboarding.mfa) {
      data.mfa = {
        ...onboarding.mfa,
        status: SUCCESS_STATUS,
      }
    }

    onboarding = await updateOnboardingByPid(data, scope)
  }

  return onboarding
}

export default handler
