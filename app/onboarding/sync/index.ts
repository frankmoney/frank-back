import { Onboarding, Prisma } from 'app/graphql/generated/prisma'
import AtriumClient from 'app/onboarding/atriumClient'
import { MX_TEMP_USER } from 'app/onboarding/constants'
import credentialsStep from './credentialsStep'

export default async (onboarding: Onboarding, prisma: Prisma): Promise<Onboarding> => {

  const { member } = await AtriumClient.readMember({
    params: {
      userGuid: MX_TEMP_USER,
      memberGuid: onboarding.memberGuid,
    },
  })

  if (member) {

    onboarding = await credentialsStep(onboarding, member, prisma)
  }

  return onboarding
}
