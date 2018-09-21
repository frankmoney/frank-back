import { Onboarding } from 'app/graphql/generated/prisma'
import { FAILED_STATUS, LOCKED_STATUS } from 'app/onboarding/constants'
import { StatusHandler } from 'app/onboarding/syncMemberStatus/StatusHandler'
import createLogger from 'utils/createLogger'

const log = createLogger('app:onboarding:syncMemberStatus:lockedHandler')

const handler: StatusHandler = async ({ onboarding, prisma }) => {
  log.debug('start')

  if (onboarding.credentials.status !== LOCKED_STATUS) {
    log.debug('updating data')

    onboarding = await prisma.mutation.updateOnboarding<Onboarding>({
      where: { id: onboarding.id },
      data: {
        credentials: {
          ...onboarding.credentials,
          status: LOCKED_STATUS,
        },
      },
    })
  }

  return onboarding
}

export default handler
