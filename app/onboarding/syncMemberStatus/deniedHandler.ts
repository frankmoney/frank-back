import { Onboarding, Prisma } from 'app/graphql/generated/prisma'
import { DENIED_STATUS } from 'app/onboarding/constants'
import { HandlerInterface } from 'app/onboarding/syncMemberStatus/HandlerInterface'

export default async (args: HandlerInterface): Promise<Onboarding> => {

  console.log('deniedHandler')

  const { onboarding, prisma } = args

  if (onboarding.credentials.status !== DENIED_STATUS) {

    console.log('update onboarding for denied status')

    return await prisma.mutation.updateOnboarding<Onboarding>({
      where: { id: onboarding.id },
      data: {
        credentials: {
          ...onboarding.credentials,
          status: DENIED_STATUS,
        },
      },
    })

  } else {

    return onboarding
  }
}
