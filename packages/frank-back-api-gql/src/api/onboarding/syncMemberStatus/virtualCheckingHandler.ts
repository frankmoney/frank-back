import updateOnboardingByPid from 'api/dal/Onboarding/updateOnboardingByPid'
import { CHECKING_STATUS, CREDENTIALS_STEP, MFA_STEP } from '../constants'
import { StatusHandler } from './StatusHandler'

const createLogger = (s1: any) => ({
  debug: (s2: any) => console.log(s1 + ':' + s2),
})

const log = createLogger(
  'app:onboarding:syncMemberStatus:virtualCheckingHandler'
)

const handler: StatusHandler = async ({ onboarding, scope }) => {
  log.debug('start')

  const data = {
    pid: onboarding.pid,
    credentials: undefined,
    mfa: undefined,
  }

  if (
    onboarding.step === CREDENTIALS_STEP &&
    onboarding.credentials.status !== CHECKING_STATUS
  ) {
    data.credentials = {
      ...onboarding.credentials,
      status: CHECKING_STATUS,
    }
  }

  if (
    onboarding.step === MFA_STEP &&
    onboarding.mfa.status !== CHECKING_STATUS
  ) {
    data.mfa = {
      ...onboarding.mfa,
      status: CHECKING_STATUS,
    }
  }

  if (data) {
    log.debug('updating data')

    onboarding = await updateOnboardingByPid(data, scope)
  }

  return onboarding
}

export default handler
