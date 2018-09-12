import { Onboarding, Prisma } from 'app/graphql/generated/prisma'
import AtriumClient from 'app/onboarding/atriumClient'
import { MX_TEMP_USER } from 'app/onboarding/constants'
import debug from 'debug'
import credentialsStep from './credentialsStep'

export default async (onboarding: Onboarding, prisma: Prisma): Promise<Onboarding> => {

  debug('onboarding sync')

  const { member } = await AtriumClient.readMember({
    params: {
      userGuid: MX_TEMP_USER,
      memberGuid: onboarding.memberGUID,
    },
  })

  if (member) {

    debug('onboarding have member')

    onboarding = await credentialsStep(onboarding, member, prisma)
  }

  return onboarding
}
