import AtriumClient from 'api/onboarding/atriumClient'
import { ACCOUNTS_STEP, SUCCESS_STATUS } from 'api/onboarding/constants'
import { StatusHandler } from 'api/onboarding/syncMemberStatus/StatusHandler'
import humps from 'humps'
import updateOnboardingByPid from '../../dal/Onboarding/updateOnboardingByPid'
// import createLogger from 'utils/createLogger'

const createLogger = (s1: any) => ({
  debug: (s2: any) => console.log(s1 + ':' + s2),
  warn: (s2: any) => console.log(s1 + ':' + s2),
})

const log = createLogger('app:onboarding:syncMemberStatus:connectedHandler')

const handler: StatusHandler = async ({
                                        onboarding,
                                        userGuid,
                                        memberGuid,
                                        scope,
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
