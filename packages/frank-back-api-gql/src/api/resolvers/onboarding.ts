import getOnboardingByUserId from 'api/dal/Onboarding/getOnboardingByUserId'
import mapOnboarding from 'api/mappers/mapOnboarding'
import syncOnboardingState from 'api/onboarding/syncMemberStatus'
import updateOnboardingByPid from 'api/dal/Onboarding/updateOnboardingByPid'
import { EXPIRED_STEP } from 'api/onboarding/constants'
import createPrivateResolver from './utils/createPrivateResolver'
import {isAfter, subHours} from 'date-fns'

export default createPrivateResolver('onboarding', async ({ scope }) => {
  const existingOnboarding = await getOnboardingByUserId(
    { userId: scope.user.id },
    scope,
  )

  if (existingOnboarding) {

    if (isAfter(subHours(new Date, 1), existingOnboarding.updatedAt)) {

      await updateOnboardingByPid({
        pid: existingOnboarding.pid,
        step: EXPIRED_STEP,
      }, scope)

      return null
    }
    else {
      return mapOnboarding(await syncOnboardingState(existingOnboarding, scope))
    }
  } else {
    return null
  }
})
