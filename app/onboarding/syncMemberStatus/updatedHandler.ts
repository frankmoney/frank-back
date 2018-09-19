import { Onboarding, OnboardingUpdateInput } from 'app/graphql/generated/prisma'
import {
  CHECKING_STATUS,
  CREDENTIALS_STEP,
  DENIED_STATUS,
  MFA_STEP,
} from 'app/onboarding/constants'
import { StatusHandler } from 'app/onboarding/syncMemberStatus/StatusHandler'
import createLogger from 'utils/createLogger'

const log = createLogger('app:onboarding:syncMemberStatus:updatedHandler')

const handler: StatusHandler = async ({ onboarding, prisma }) => {
  log.debug('start')

  let data = null

  if (
    onboarding.step === CREDENTIALS_STEP &&
    onboarding.credentials.status !== CHECKING_STATUS
  ) {
    data = {
      credentials: {
        ...onboarding.credentials,
        status: CHECKING_STATUS,
      },
    }
  }

  if (
    onboarding.step === MFA_STEP &&
    onboarding.mfa.status !== CHECKING_STATUS
  ) {
    data = {
      mfa: {
        ...onboarding.mfa,
        status: CHECKING_STATUS,
      },
    }
  }

  if (data) {
    log.debug('updating data')

    onboarding = await prisma.mutation.updateOnboarding<Onboarding>({
      where: { id: onboarding.id },
      data,
    })
  }

  return onboarding
}

export default handler
