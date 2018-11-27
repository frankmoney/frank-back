import updateOnboardingByPid from 'api/dal/Onboarding/updateOnboardingByPid'
import { CREDENTIALS_STEP, MFA_EXPIRED_STATUS } from '../constants'
import { StatusHandler } from './StatusHandler'

const handler: StatusHandler = async ({ onboarding, scope }) => {
  const log = scope.logFor('api:onboarding:syncMemberStatus:expiredHandler')

  log.debug('start')

  if (
    onboarding.step !== CREDENTIALS_STEP ||
    onboarding.credentials.status !== MFA_EXPIRED_STATUS ||
    onboarding.mfa
  ) {
    log.debug('updating data')

    onboarding = await updateOnboardingByPid(
      {
        pid: onboarding.pid,
        step: CREDENTIALS_STEP,
        clearMfa: true,
        credentials: {
          ...onboarding.credentials,
          status: MFA_EXPIRED_STATUS,
        },
      },
      scope
    )
  }

  return onboarding
}

export default handler
