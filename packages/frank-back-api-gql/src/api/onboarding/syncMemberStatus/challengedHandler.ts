import humps from 'humps'
import R from 'ramda'
import updateOnboardingByPid from 'api/dal/Onboarding/updateOnboardingByPid'
import { AWAITING_INPUT_STATUS, MFA_STEP, SUCCESS_STATUS } from '../constants'
import { StatusHandler } from './StatusHandler'

const handler: StatusHandler = async ({
  onboarding,
  userGuid,
  memberGuid,
  scope,
}) => {
  const log = scope.logFor('api:onboarding:syncMemberStatus:challengedHandler')

  const res = await scope.mx.listMemberChallenges({
    userGuid,
    memberGuid,
  })

  const challenges = humps.camelizeKeys(res.challenges)

  if (
    onboarding.step !== MFA_STEP ||
    !onboarding.mfa ||
    !R.equals(challenges, onboarding.mfa.challenges) ||
    onboarding.credentials.status !== SUCCESS_STATUS
  ) {
    log.debug('updating data')

    onboarding = await updateOnboardingByPid(
      {
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
      },
      scope
    )
  }

  return onboarding
}

export default handler
