// import syncOnboardingState from 'app/onboarding/syncMemberStatus'
// import findExistingOnboarding from 'app/onboarding/findExistingOnboarding'
import createPrivateResolver from 'api/resolvers/utils/createPrivateResolver'

export default createPrivateResolver('onboarding', async ({ scope }) => {
  // const existingOnboarding = await findExistingOnboarding(user.id, prisma)

  // if (existingOnboarding) {
  // return await syncOnboardingState(existingOnboarding, prisma)
  // } else {
  //   return null
  // }

  return null
})
