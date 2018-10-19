import syncOnboardingState from 'api/onboarding/syncMemberStatus'
import createPrivateResolver from 'api/resolvers/utils/createPrivateResolver'
import getOnboardingByUserId from 'api/dal/Onboarding/getOnboardingByUserId'
import mapOnboarding from 'api/mappers/mapOnboarding'

export default createPrivateResolver('onboarding', async ({ scope }) => {

  const existingOnboarding = await getOnboardingByUserId({ userId: scope.user.id }, scope)

  if (existingOnboarding) {
    return mapOnboarding(await syncOnboardingState(existingOnboarding, scope))
  } else {
    return null
  }
})
