// import syncOnboardingState from 'app/onboarding/syncMemberStatus'
// import findExistingOnboarding from 'app/onboarding/findExistingOnboarding'
import createPrivateResolver from 'api/resolvers/utils/createPrivateResolver'
import getOnboardingByUserId from '../dal/Onboarding/getOnboardingByUserId'
import mapOnboarding from 'api/mappers/mapOnboarding'

export default createPrivateResolver('onboarding', async ({ scope }) => {

  const existingOnboarding = mapOnboarding(await getOnboardingByUserId({ userId: scope.user.id }, scope))

  // if (existingOnboarding) {
  // return await syncOnboardingState(existingOnboarding, prisma)
  // } else {
  //   return null
  // }

  return existingOnboarding
})
