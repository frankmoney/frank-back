import { Onboarding, Prisma } from 'app/graphql/generated/prisma'
import { DENIED_STATUS } from 'app/onboarding/constants'
import { StatusHandler } from 'app/onboarding/syncMemberStatus/StatusHandler'

const handler: StatusHandler = async ({ onboarding, prisma }) => {

  console.log('deniedHandler')

  if (onboarding.credentials.status !== DENIED_STATUS) {

    console.log('update onboarding for denied status')

    onboarding = await prisma.mutation.updateOnboarding<Onboarding>({
      where: { id: onboarding.id },
      data: {
        credentials: {
          ...onboarding.credentials,
          status: DENIED_STATUS,
        },
      },
    })

  }

  return onboarding
}

export default handler
