import { Onboarding } from 'app/graphql/generated/prisma'
import { CREDENTIALS_STEP, DENIED_STATUS, MFA_EXPIRED_STATUS } from 'app/onboarding/constants'
import { StatusHandler } from 'app/onboarding/syncMemberStatus/StatusHandler'
import createLogger from 'utils/createLogger'

const log = createLogger('app:onboarding:syncMemberStatus:expiredHandler')

const handler: StatusHandler = async ({ onboarding, prisma }) => {
  log.debug('start')

  if (
    onboarding.step !== CREDENTIALS_STEP ||
    onboarding.credentials.status !== MFA_EXPIRED_STATUS ||
    onboarding.mfa
  ) {
    log.debug('updating data')

    onboarding = await prisma.mutation.updateOnboarding<Onboarding>({
      where: { id: onboarding.id },
      data: {
        step: CREDENTIALS_STEP,
        credentials: {
          ...onboarding.credentials,
          status: MFA_EXPIRED_STATUS,
        },
        mfa: null,
      },
    })
  }

  return onboarding
}

export default handler
