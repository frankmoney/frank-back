import AtriumClient from 'api/onboarding/atriumClient'
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
} from 'api/onboarding/constants'
import {
  StatusHandler,
  StatusHandlerArg,
} from 'api/onboarding/syncMemberStatus/StatusHandler'
// import createLogger from 'utils/createLogger'
import DefaultActionScope from 'api/dal/DefaultActionScope'
import getMemberById from 'api/dal/mx/getMemberById'
import deniedHandler from './deniedHandler'
import connectedHandler from './connectedHandler'
import failedHandler from './failedHandler'
import challengedHandler from './challengedHandler'
import virtualCheckingHandler from './virtualCheckingHandler'
import expiredHandler from './expiredHandler'
import rejectedHandler from './rejectedHandler'
import lockedHandler from './lockedHandler'
import Onboarding from 'store/types/Onboarding'

const createLogger = (s1: any) => ({
  debug: (s2: any) => console.log(s1 + ':' + s2),
  warn: (s2: any) => console.log(s1 + ':' + s2),
})

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
  scope: DefaultActionScope,
): Promise<Onboarding> => {
  log.debug('start')

  if ([CREDENTIALS_STEP, MFA_STEP].includes(onboarding.step)) {
    log.debug(`step = ${onboarding.step}`)

    const mxMember = await getMemberById({ id: onboarding.mxMemberId }, scope)

    if (!mxMember) {
      log.debug('don\'t have mxMember')

      return onboarding
    }

    const mxUserGuid = mxMember.mxUser.mxGuid

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
      scope,
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
