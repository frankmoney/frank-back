import { CREDENTIALS_STEP, MFA_REJECTED_STATUS } from 'api/onboarding/constants'
import { StatusHandler } from 'api/onboarding/syncMemberStatus/StatusHandler'
import updateOnboardingByPid from 'api/dal/Onboarding/updateOnboardingByPid'

const handler: StatusHandler = async ({ onboarding, scope }) => {
  const log = scope.logFor('api:onboarding:syncMemberStatus:rejectedHandler')

  log.debug('start')

  if (
    onboarding.step !== CREDENTIALS_STEP ||
    onboarding.credentials.status !== MFA_REJECTED_STATUS ||
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
          status: MFA_REJECTED_STATUS,
        },
      },
      scope
    )
  }

  return onboarding
}

export default handler
