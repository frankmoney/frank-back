import { CREDENTIALS_STEP, MFA_REJECTED_STATUS } from 'api/onboarding/constants'
import { StatusHandler } from 'api/onboarding/syncMemberStatus/StatusHandler'
import updateOnboardingByPid from 'api/dal/Onboarding/updateOnboardingByPid'
// import createLogger from 'utils/createLogger'

const createLogger = (s1: any) => ({
  debug: (s2: any) => console.log(s1 + ':' + s2),
})

const log = createLogger('app:onboarding:syncMemberStatus:rejectedHandler')

const handler: StatusHandler = async ({ onboarding, scope }) => {
  log.debug('start')

  if (
    onboarding.step !== CREDENTIALS_STEP ||
    onboarding.credentials.status !== MFA_REJECTED_STATUS ||
    onboarding.mfa
  ) {
    log.debug('updating data')

    onboarding = await updateOnboardingByPid({
      pid: onboarding.pid,
      step: CREDENTIALS_STEP,
      clearMfa: true,
      credentials: {
        ...onboarding.credentials,
        status: MFA_REJECTED_STATUS,
      },
    }, scope)
  }

  return onboarding
}

export default handler
