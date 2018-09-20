import { Onboarding } from 'app/graphql/generated/prisma'
import AtriumClient from 'app/onboarding/atriumClient'
import {
  ACCOUNTS_STEP,
  AWAITING_INPUT_STATUS,
  EXPIRED_MXSTATUS,
  MFA_STEP,
  SUCCESS_STATUS,
} from 'app/onboarding/constants'
import { StatusHandler } from 'app/onboarding/syncMemberStatus/StatusHandler'
import humps from 'humps'
import createLogger from 'utils/createLogger'
import R from 'ramda'

const log = createLogger('app:onboarding:syncMemberStatus:challengedHandler')

const handler: StatusHandler = async ({
                                        onboarding,
                                        userGuid,
                                        memberGuid,
                                        prisma,
                                      }) => {
  log.debug('start')


  const atriumResponse = await AtriumClient.listMemberChallenges({
    params: {
      userGuid,
      memberGuid,
    },
  })

  log.debug('atriumResponse:', atriumResponse)

  const challenges = humps.camelizeKeys(atriumResponse.challenges)

  if (
    onboarding.step !== MFA_STEP ||
    !onboarding.mfa ||
    !R.equals(challenges, onboarding.mfa.challenges) ||
    onboarding.credentials.status !== SUCCESS_STATUS
  ) {

    log.debug('updating data')

    onboarding = await prisma.mutation.updateOnboarding<Onboarding>({
      where: { id: onboarding.id },
      data: {
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
    })
  }

  return onboarding
}

export default handler
