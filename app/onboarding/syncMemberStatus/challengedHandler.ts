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

const log = createLogger('app:onboarding:syncMemberStatus:challengedHandler')

const handler: StatusHandler = async ({
  onboarding,
  userGuid,
  memberGuid,
  prisma,
}) => {
  log.debug('start')

  if (
    !onboarding.mfa ||
    onboarding.step !== MFA_STEP ||
    onboarding.credentials.status !== SUCCESS_STATUS
  ) {
    log.debug('updating data')

    const { challenges } = await AtriumClient.listMemberChallenges({
      params: {
        userGuid,
        memberGuid,
      },
    })

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
          challenges: humps.camelizeKeys(challenges),
        },
      },
    })
  }

  return onboarding
}

export default handler
