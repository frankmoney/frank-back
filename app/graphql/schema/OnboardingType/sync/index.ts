import { Onboarding, Prisma } from 'app/graphql/generated/prisma'
import { MX_TEMP_USER } from 'app/graphql/schema/OnboardingType/index'
import {
  AtriumClient,
} from '../'
import debug from 'debug'
import credentialsStep from './credentialsStep'

export default async (onboarding: Onboarding, prisma: Prisma): Promise<Onboarding> => {

  debug('onboarding sync')

  const member = (await AtriumClient.readMember({
    params: {
      userGuid: MX_TEMP_USER,
      memberGuid: onboarding.memberGUID,
    },
  }))['member']

  if (member) {

    debug('onboarding have member')

    onboarding = await credentialsStep(onboarding, member, prisma)
  }

  return onboarding
}
