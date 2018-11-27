import updateOnboardingByPid from 'api/dal/Onboarding/updateOnboardingByPid'
import { DENIED_STATUS } from '../constants'
import { StatusHandler } from './StatusHandler'

const handler: StatusHandler = async ({ onboarding, scope }) => {
  const log = scope.logFor('api:onboarding:syncMemberStatus:deniedHandler')

  log.debug('start')

  if (onboarding.credentials.status !== DENIED_STATUS) {
    log.debug('updating data')

    onboarding = await updateOnboardingByPid(
      {
        pid: onboarding.pid,
        credentials: {
          ...onboarding.credentials,
          status: DENIED_STATUS,
        },
      },
      scope
    )
  }

  return onboarding
}

export default handler
