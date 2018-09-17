import { Onboarding, Prisma } from 'app/graphql/generated/prisma'
import AtriumClient from 'app/onboarding/atriumClient'
import credentialsStep from './credentialsStep'

export default async (
  onboarding: Onboarding,
  prisma: Prisma,
): Promise<Onboarding> => {

  const existingMember = (await prisma.query.mxMembers({
    where: {
      onboarding: { id: onboarding.id },
    },
  }, '{id, mxGuid, institutionCode, user {id, mxGuid}}'))[0]

  if (existingMember) {
    onboarding = await credentialsStep(onboarding, existingMember, prisma)
  }

  return onboarding
}
