import { LOCKED_STATUS } from 'api/onboarding/constants'
import { StatusHandler } from 'api/onboarding/syncMemberStatus/StatusHandler'
import updateOnboardingByPid from '../../dal/Onboarding/updateOnboardingByPid'

const handler: StatusHandler = async ({ onboarding, scope }) => {
  const log = scope.logFor('api:onboarding:syncMemberStatus:lockedHandler')

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
