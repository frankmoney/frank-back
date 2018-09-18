import { Onboarding, Prisma } from 'app/graphql/generated/prisma'
import { DENIED_STATUS } from 'app/onboarding/constants'
import { HandlerInterface } from 'app/onboarding/syncMemberStatus/HandlerInterface'

export default async (args: HandlerInterface): Promise<Onboarding> => {

  const { onboarding, prisma } = args

  if (onboarding.credentials.status !== DENIED_STATUS) {

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
