import updateOnboardingByPid from 'api/dal/Onboarding/updateOnboardingByPid'
import { FAILED_STATUS } from '../constants'
import { StatusHandler } from './StatusHandler'

const handler: StatusHandler = async ({ onboarding, scope }) => {
  const log = scope.logFor('api:onboarding:syncMemberStatus:failedHandler')

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
