import { Onboarding, Prisma } from 'app/graphql/generated/prisma'
import AtriumClient from 'app/onboarding/atriumClient'
import { CONNECTED_MXSTATUS, CREDENTIALS_STEP, DENIED_MXSTATUS } from 'app/onboarding/constants'
import { HandlerInterface } from 'app/onboarding/syncMemberStatus/HandlerInterface'
import deniedHandler from './deniedHandler'
import connectedHandler from './connectedHandler'


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

      const args: HandlerInterface = {
        onboarding,
        userGuid: mxUserGuid,
        memberGuid: mxMember.mxGuid,
        member,
        prisma,
      }

      if (member.connection_status === CONNECTED_MXSTATUS) {

        onboarding = await connectedHandler(args)

      } else if (member.connection_status === DENIED_MXSTATUS) {

        onboarding = await deniedHandler(args)

      } else {

        console.log('unhandled status ' + member.connection_status)
      }
    }

  }

  return onboarding
}
