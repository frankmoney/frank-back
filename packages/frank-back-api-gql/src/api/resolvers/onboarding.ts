import getOnboardingByUserId from 'api/dal/Onboarding/getOnboardingByUserId'
import mapOnboarding from 'api/mappers/mapOnboarding'
import syncOnboardingState from 'api/onboarding/syncMemberStatus'
import createPrivateResolver from './utils/createPrivateResolver'

export default createPrivateResolver('onboarding', async ({ scope }) => {
  const existingOnboarding = await getOnboardingByUserId(
    { userId: scope.user.id },
    scope
  )

  if (existingOnboarding) {
    return mapOnboarding(await syncOnboardingState(existingOnboarding, scope))
  } else {
    return null
  }
})
