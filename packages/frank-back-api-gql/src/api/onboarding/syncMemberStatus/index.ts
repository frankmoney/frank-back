import { Onboarding, Prisma } from 'app/graphql/generated/prisma'
import AtriumClient from 'app/onboarding/atriumClient'
import {
  CHALLENGED_MXSTATUS,
  FAILED_MXSTATUS,
  CONNECTED_MXSTATUS,
  CREDENTIALS_STEP,
  DENIED_MXSTATUS,
  MFA_STEP,
  UPDATED_MXSTATUS,
  EXPIRED_MXSTATUS,
  RESUMED_MXSTATUS,
  CREATED_MXSTATUS,
  REJECTED_MXSTATUS,
  LOCKED_MXSTATUS,
} from 'app/onboarding/constants'
import {
  StatusHandler,
  StatusHandlerArg,
} from 'app/onboarding/syncMemberStatus/StatusHandler'
import createLogger from 'utils/createLogger'
import deniedHandler from './deniedHandler'
import connectedHandler from './connectedHandler'
import failedHandler from './failedHandler'
import challengedHandler from './challengedHandler'
import virtualCheckingHandler from './virtualCheckingHandler'
import expiredHandler from './expiredHandler'
import rejectedHandler from './rejectedHandler'
import lockedHandler from './lockedHandler'

const log = createLogger(`app:onboarding:syncMemberStatus`)

const handlers: { [status: string]: StatusHandler } = {
  [CONNECTED_MXSTATUS]: connectedHandler,
  [DENIED_MXSTATUS]: deniedHandler,
  [FAILED_MXSTATUS]: failedHandler,
  [CHALLENGED_MXSTATUS]: challengedHandler,
  [EXPIRED_MXSTATUS]: expiredHandler,
  [REJECTED_MXSTATUS]: rejectedHandler,
  [LOCKED_MXSTATUS]: lockedHandler,
  [CREATED_MXSTATUS]: virtualCheckingHandler,
  [UPDATED_MXSTATUS]: virtualCheckingHandler,
  [RESUMED_MXSTATUS]: virtualCheckingHandler,
}

export default async (
  onboarding: Onboarding,
  prisma: Prisma
): Promise<Onboarding> => {
  log.debug('start')

  if ([CREDENTIALS_STEP, MFA_STEP].includes(onboarding.step)) {
    log.debug(`step = ${onboarding.step}`)

    const mxMember = (await prisma.query.mxMembers(
      {
        where: {
          onboarding: { id: onboarding.id },
        },
      },
      '{id, mxGuid, institutionCode, user {id, mxGuid}}'
    ))[0]

    if (!mxMember) {
      log.debug("don't have mxMember")

      return onboarding
    }

    const mxUserGuid = mxMember.user.mxGuid

    const { member } = await AtriumClient.readMember({
      params: {
        userGuid: mxUserGuid,
        memberGuid: mxMember.mxGuid,
      },
    })

    const args: StatusHandlerArg = {
      onboarding,
      userGuid: mxUserGuid,
      memberGuid: mxMember.mxGuid,
      member,
      prisma,
    }

    const handler = handlers[member.connection_status]

    if (handler) {
      onboarding = await handler(args)
    } else {
      log.warn(`unhandled status = ${member.connection_status}`)
    }
  }

  log.debug('end')

  return onboarding
}
