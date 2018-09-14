import { Onboarding, Prisma } from 'app/graphql/generated/prisma'
import AtriumClient from 'app/onboarding/atriumClient'
import credentialsStep from './credentialsStep'

export default async (onboarding: Onboarding, prisma: Prisma): Promise<Onboarding> => {

  const { member } = await AtriumClient.readMember({
    params: {
      userGuid: onboarding.mxUserGuid,
      memberGuid: onboarding.mxMemberGuid,
    },
  })

  if (member) {

    onboarding = await credentialsStep(onboarding, member, prisma)
  }

  return onboarding
}
