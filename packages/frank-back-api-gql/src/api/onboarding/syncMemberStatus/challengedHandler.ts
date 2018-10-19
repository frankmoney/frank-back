import AtriumClient from 'api/onboarding/atriumClient'
import {
  AWAITING_INPUT_STATUS,
  MFA_STEP,
  SUCCESS_STATUS,
} from 'api/onboarding/constants'
import humps from 'humps'
import R from 'ramda'
import { StatusHandler } from 'api/onboarding/syncMemberStatus/StatusHandler'
import updateOnboardingByPid from 'api/dal/Onboarding/updateOnboardingByPid'
// import createLogger from 'utils/createLogger'

const createLogger = (s1: any) => ({
  debug: (s2: any) => console.log(s1 + ':' + s2),
})

const log = createLogger('app:onboarding:syncMemberStatus:challengedHandler')

const handler: StatusHandler = async ({
                                        onboarding,
                                        userGuid,
                                        memberGuid,
                                        scope,
                                      }) => {
  log.debug('start')

  const atriumResponse = await AtriumClient.listMemberChallenges({
    params: {
      userGuid,
      memberGuid,
    },
  })

  log.debug('atriumResponse:' + atriumResponse.toString())

  const challenges = humps.camelizeKeys(atriumResponse.challenges)

  if (
    onboarding.step !== MFA_STEP ||
    !onboarding.mfa ||
    !R.equals(challenges, onboarding.mfa.challenges) ||
    onboarding.credentials.status !== SUCCESS_STATUS
  ) {
    log.debug('updating data')

    onboarding = await updateOnboardingByPid({
      pid: onboarding.pid,
      step: MFA_STEP,
      credentials: {
        ...onboarding.credentials,
        status: SUCCESS_STATUS,
      },
      mfa: {
        status: AWAITING_INPUT_STATUS,
        challenges,
      },
    }, scope)
  }

  return onboarding
}

export default handler
