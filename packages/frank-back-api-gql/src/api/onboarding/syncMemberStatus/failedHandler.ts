import updateOnboardingByPid from 'api/dal/Onboarding/updateOnboardingByPid'
import { FAILED_STATUS } from '../constants'
import { StatusHandler } from './StatusHandler'
// import createLogger from 'utils/createLogger'

const createLogger = (s1: any) => ({
  debug: (s2: any) => console.log(s1 + ':' + s2),
})

const log = createLogger('app:onboarding:syncMemberStatus:failedHandler')

const handler: StatusHandler = async ({ onboarding, scope }) => {
  log.debug('start')

  if (onboarding.credentials.status !== FAILED_STATUS) {
    log.debug('updating data')

    onboarding = await updateOnboardingByPid(
      {
        pid: onboarding.pid,
        credentials: {
          ...onboarding.credentials,
          status: FAILED_STATUS,
        },
      },
      scope
    )
  }

  return onboarding
}

export default handler
