import { ID_Input, Onboarding, Prisma } from 'app/graphql/generated/prisma'
import { CANCELED_STEP, COMPLETED_STEP } from 'app/onboarding/constants'

export default async (
  userId: ID_Input,
  prisma: Prisma
): Promise<Onboarding | null> => {
  return (await prisma.query.onboardings({
    where: {
      AND: [
        { step_not: COMPLETED_STEP },
        { step_not: CANCELED_STEP },
        { user: { id: userId } },
      ],
    },
  }))[0]
}
