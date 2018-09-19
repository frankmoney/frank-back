import { Onboarding, Prisma } from 'app/graphql/generated/prisma'
import AtriumClient from 'app/onboarding/atriumClient'
import { CHALLENGED_MXSTATUS, CONNECTED_MXSTATUS, CREDENTIALS_STEP, DENIED_MXSTATUS } from 'app/onboarding/constants'
import { StatusHandler, HandlerArg } from 'app/onboarding/syncMemberStatus/StatusHandler'
import deniedHandler from './deniedHandler'
import connectedHandler from './connectedHandler'

const handlers: { [status: string]: StatusHandler } = {
  [CONNECTED_MXSTATUS]: connectedHandler,
  [DENIED_MXSTATUS]: deniedHandler,
}

export default async (
  onboarding: Onboarding,
  prisma: Prisma,
): Promise<Onboarding> => {

  console.log('Sync member status')

  if (onboarding.step === CREDENTIALS_STEP) {

    console.log('Step == credentials')

    const mxMember = (await prisma.query.mxMembers({
      where: {
        onboarding: { id: onboarding.id },
      },
    }, '{id, mxGuid, institutionCode, user {id, mxGuid}}'))[0]

    if (mxMember) {

      console.log('Have mxMember')

      const mxUserGuid = mxMember.user.mxGuid

      const { member } = await AtriumClient.readMember({
        params: {
          userGuid: mxUserGuid,
          memberGuid: mxMember.mxGuid,
        },
      })

      const args: HandlerArg = {
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

        console.log('unhandled status ' + member.connection_status)
      }
    }

  }

  return onboarding
}
