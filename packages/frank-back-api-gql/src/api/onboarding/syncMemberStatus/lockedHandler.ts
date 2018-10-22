import { LOCKED_STATUS } from 'api/onboarding/constants'
import { StatusHandler } from 'api/onboarding/syncMemberStatus/StatusHandler'
import updateOnboardingByPid from '../../dal/Onboarding/updateOnboardingByPid'
import { DENIED_STATUS, FAILED_STATUS } from '../constants'
// import createLogger from 'utils/createLogger'

const createLogger = (s1: any) => ({
  debug: (s2: any) => console.log(s1 + ':' + s2),
})
const log = createLogger('app:onboarding:syncMemberStatus:lockedHandler')

const handler: StatusHandler = async ({ onboarding, scope }) => {
  log.debug('start')

  if (onboarding.credentials.status !== LOCKED_STATUS) {
    log.debug('updating data')

    onboarding = await updateOnboardingByPid(
      {
        pid: onboarding.pid,
        credentials: {
          ...onboarding.credentials,
          status: LOCKED_STATUS,
        },
      },
      scope
    )
  }

  return onboarding
}

export default handler
