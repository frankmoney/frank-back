import { ID_Input, Onboarding, Prisma } from 'app/graphql/generated/prisma'
import { COMPLETED_STEP } from '.'

export default async (userId: ID_Input, prisma: Prisma): Promise<Onboarding | null> => {

  return (await prisma.query.onboardings({
    where: {
      AND: [
        { step_not: COMPLETED_STEP },
        { user: { id: userId } },
      ],
    },
  }))[0]
}
